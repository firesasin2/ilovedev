
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
        