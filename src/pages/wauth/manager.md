
# Manager
<br/>

### manager.Create()
  + Create 함수 호출
    ```go
    err := adminMgr.Create(r.Context(), req, "Base")
    if err != nil {
    	logging.Errorln(err)
    }
    ```
<br/>

  + Create 함수
    ```go
    func (m *AdminManager) Create(ctx context.Context, person info.Admin, Regulation string) (error) {
        var err error

        // 검사: 비밀번호가 없으면 오류
        if len(person.Password) <= 0 {
            err = fmt.Errorf("생성시 비밀번호 empty")
            return tool.ErrorStack(err, "E_ADMN_0020")
        }

        // 검사: 아이디는 필수
        if len(person.ID) <= 0 {
            err = fmt.Errorf("아이디는 필수")
            return tool.ErrorStack(err, "E_TPOL_0001")
        }

        // 검사: 아이디 한글사용 불가
        if tool.IsKoreanString(person.ID) {
            err = fmt.Errorf("아이디는 한글사용 불가")
            return tool.ErrorStack(err, "E_ADMN_0030")
        }

        // 검사: 아이디는 문자와 숫자만 가능
        for _, char := range person.ID {
            if !unicode.IsLetter(char) && !unicode.IsNumber(char) {
                err = fmt.Errorf("아이디는 문자와 숫자만 가능")
                return tool.ErrorStack(err, "E_VLPW_0027")
            }
        }

        // 검사: 아이디는 255자리 제한
        if len(person.ID) >= 255 {
            err = fmt.Errorf("아이디는 255자리 이상 금지")
            return tool.ErrorStack(err, "E_ADMN_0031")
        }

        // 검사: 해당 ID가 이미 있다면 오류
        existPerson, err := m.Get(ctx, person.ID)
        if err == nil {
            if existPerson.ID == person.ID {
                err = fmt.Errorf("해당 ID의 사용자가 이미 존재합니다.")
                return tool.ErrorStack("E_ADMN_0001")
            }
        }

        // 로직: 비밀번호 암호화
        if len(person.Password) > 0 {
            hash, err := tool.Pbkdf2Hash64([]byte(person.Password))
            if err != nil {
                m.Log.Errorln(err)
                return tool.ErrorStack(err, "E_DEFT_0000")
            }
            person.Password = hash
        }

        if len(person.OfflineSecret) > 0 {
            offsecret, err := tool.AES256CTREncryptAndEncodeBase64(libconfigkey.GetAESKeyOnce(ctx, m.Log, m.client), []byte(person.OfflineSecret))
            if err != nil {
                m.Log.Errorln(err)
                return tool.ErrorStack(err, "E_DEFT_0000")
            }
            person.OfflineSecret = offsecret
        }

        if len(person.OnlineSecret) > 0 {
            onsecret, err := tool.AES256CTREncryptAndEncodeBase64(libconfigkey.GetAESKeyOnce(ctx, m.Log, m.client), []byte(person.OnlineSecret))
            if err != nil {
                m.Log.Errorln(err)
                return tool.ErrorStack(err, "E_DEFT_0000")
            }
            person.OnlineSecret = onsecret
        }

        // 로직: 유효한 ip인지 검사
        err = CheckIPAddress(person.IPAddresses, Regulation)
        if err != nil {
            return err
        }

        // 초기값: 신규생성시 무조건 강제암호변경 설정을 ON 시킨다
        person.ForceChangePwd = bool(info.PERSON_NEED_CHANGE_PASSWORD)

        // 초기값: 생성 시간
        person.CreateTimestamp = time.Now().Unix()

        m.Mutex.Lock()
        defer m.Mutex.Unlock()

        _, err = m.Admin.InsertOne(ctx, person)
        if err != nil {
            m.Log.Errorln(err)
            return tool.ErrorStack(err, "E_DEFT_0000")
        }

        return nil
    }
    ```
<br/>

### manager.Update()
+ Update 함수 호출
  ```go
    err := adminMgr.Update(r.Context(), req, true)
    if err != nil {
    	logging.Errorln(err)
    }
  ```
<br/>

+ Update 함수
  ```go
    func (m *AdminManager) Update(ctx context.Context, admin info.Admin, onlyUpdateTag bool) (info.Admin, info.Admin, error) {

        m.Mutex.Lock()
        defer m.Mutex.Unlock()

        oldAdmin := info.Admin{}
        err := m.Admin.FindOne(ctx, bson.M{"ID": admin.ID}).Decode(&oldAdmin)
        if err != nil {
            m.Log.Errorln(err)
            return info.Admin{}, info.Admin{}, tool.ErrorStack(err, "E_DEFT_0000")
        }

        newAdmin := oldAdmin

        syncAttributes := []string{}
        if onlyUpdateTag {
            // 로직: update가 있는 속성들 이름을 가져옵니다.
            syncAttributes, err = tool.GetAttributesName(info.Admin{}, "update", true)
            if err != nil {
                return info.Admin{}, info.Admin{}, tool.ErrorStack(err, "E_DEFT_0000")
            }
        } else {
            // 로직: 모든 속성들 이름을 가져옵니다.
            t := reflect.TypeOf(info.Admin{})
            for i := 0; i < t.NumField(); i++ {
                syncAttributes = append(syncAttributes, t.Field(i).Name)
            }
        }

        // 로직: 동기화 할 속성들의 값을 newAdmin에 넣습니다.
        for _, syncAttribute := range syncAttributes {
            r := reflect.ValueOf(admin)
            f := reflect.Indirect(r).FieldByName(syncAttribute)

            tool.SetValueToStruct(&newAdmin, syncAttribute, f)
        }

        // newAdmin를 bson.M으로 변환
        newAdminBson := bson.M{}
        v := reflect.ValueOf(newAdmin)
        for i := 0; i < v.NumField(); i++ {
            newAdminBson[v.Type().Field(i).Name] = v.Field(i).Interface()
        }

        // 로직: 업데이트
        result, err := m.Admin.UpdateOne(ctx, bson.M{"ID": admin.ID}, bson.M{"$set": newAdminBson})
        if err != nil {
            m.Log.Errorln(err)
            return info.Admin{}, info.Admin{}, tool.ErrorStack(err, "E_DEFT_0000")
        }

        if result.MatchedCount == 0 {
            m.Log.Errorln("매치되는 사용자가 없음")
            return info.Admin{}, info.Admin{}, tool.ErrorStack(fmt.Errorf("ID=[%s]에 매치되는 사용자가 없음", admin.ID), "E_ADMN_0011")
        }

        return oldAdmin, newAdmin, nil
    }
  ```