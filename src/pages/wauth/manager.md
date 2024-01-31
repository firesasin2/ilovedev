
# Manager
<br/>

### AdminManager
  + AdminManager 구조체
    + package이름은 adminmanager
    ```go
    package adminmanager // package 이름 정의(main이 아님)

    type AdminManager struct {
        Log *tool.Logging

        Admins sync.Map
        AESKey string
        Mutex  sync.RWMutex

        client        *libmongo.MongoClient
        Admin         *mongo.Collection //admin  컬랙션
        TimeClass     *mongo.Collection //read-only
        adminrole     *mongo.Collection //read-only
        TokenPolicy   *mongo.Collection //read-only
        NodeClassTree *mongo.Collection //read-only
        NodeClass     *mongo.Collection //read-only
    }
    ```
  + 선언
    ```go
    import "github.com/acrav3/wauth/adminmanager"

    adminMgr, err = adminmanager.New(ctx, logging, client, AESKey)
	if err != nil {
		logging.Fatalln(err)
	}

    adminMgr2, err = NewAdminManager(ctx, logging, client, AESKey)
	if err != nil {
		logging.Fatalln(err)
	}
    
    func New(ctx context.Context, l *tool.Logging, client *libmongo.MongoClient, AESKey string) (*AdminManager, error) {

        manager, err := NewAdminManager(ctx, l, client, AESKey)
        if err != nil {
            l.Errorln(err)
            return nil, err
        }

        return manager, nil
    }

    func NewAdminManager(ctx context.Context, l *tool.Logging, client *libmongo.MongoClient, AESKey string) (*AdminManager, error) {
        m := AdminManager{
            Log:    l,
            AESKey: AESKey,
        }

        m.client = client
        m.Admin = client.Database.Collection("admin")
        m.TimeClass = client.Database.Collection("timeclass")         //read-only
        m.adminrole = client.Database.Collection("adminrole")         //read-only
        m.TokenPolicy = client.Database.Collection("tokenpolicy")     //read-only
        m.NodeClassTree = client.Database.Collection("nodeclasstree") //read-only
        m.NodeClass = client.Database.Collection("nodeclass")         //read-only

        return &m, nil
    }
    ```
<br/>

### manager.List()
  + List 함수 호출
    ```go
    people, err := adminMgr.List(r.Context(), query, fields, sort, max)
    if err != nil {
    	logging.Errorln(err)
    }
    ```
  + List 함수
    ```go
    func (m *AdminManager) List(ctx context.Context, query string, fields string, sort string, max int64) ([]info.Admin, error) {
        admins := []info.Admin{}

        // query: ID icontain "apadmin"
        f, err := filter.ConvertFilter(query)
        if err != nil {
            m.Log.Errorln(err)
            return []info.Admin{}, tool.ErrorStack("E_AGFT_0001")
        }
        // f: map[ID:map[$options:i $regex:apadmin]]

        projection, err := filter.ConvertFields(fields)
        if err != nil {
            m.Log.Errorln(err)
            return []info.Admin{}, tool.ErrorStack(err, "E_DEFT_0000")
        }

        order, err := filter.ConvertSort(sort)
        if err != nil {
            m.Log.Errorln(err)
            return []info.Admin{}, tool.ErrorStack(err, "E_AGFT_0001")
        }

        // max가 0이면, 모두 조회
        opt := options.Find().SetLimit(max)
        opt = opt.SetProjection(projection)
        if len(order) > 0 {
            opt = opt.SetSort(order)
        }

        cursor, err := m.Admin.Find(ctx, f, opt)
        if err != nil {
            m.Log.Errorln(err)
            return []info.Admin{}, tool.ErrorStack(err, "E_DEFT_0000")
        }
        defer cursor.Close(ctx)

        err = cursor.All(ctx, &admins)
        if err != nil {
            m.Log.Errorln(err)
            return []info.Admin{}, tool.ErrorStack(err, "E_DEFT_0000")
        }

        // 관리자 역할 이름과 결합(join)
        for i := 0; i < len(admins); i++ {
            if len(admins[i].AdminRole_ID) == 0 {
                continue
            }

            role, err := m.관리자역할구하기(admins[i].AdminRole_ID)
            if err != nil {
                m.Log.Errorln(err)
                continue
            }
            admins[i].AdminRole_Name = role.Name
        }

        return admins, nil
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

        return oldAdmin, newAdmin, nil
    }
  ```
<br/>

### manager.Delete()
  + Delete 함수 호출
    ```go
    err := adminMgr.Delete(r.Context(), req.ID)
    if err != nil {
    	logging.Errorln(err)
    }
    ```

  + Delete 함수
    ```go
    func (m *AdminManager) Delete(ctx context.Context, id string) (info.Admin, info.Admin, error) {

        m.Mutex.Lock()
        defer m.Mutex.Unlock()

        oldAdmin := info.Admin{}
        err := m.Admin.FindOne(ctx, bson.M{"ID": id}).Decode(&oldAdmin)
        if err != nil {
            m.Log.Errorln(err)
            return info.Admin{}, info.Admin{}, tool.ErrorStack(err, "E_DEFT_0000")
        }

        // 로직: 필수항목은 조작 제한
        if oldAdmin.Mandantory {
            return info.Admin{}, info.Admin{}, tool.ErrorStack(err, "E_DEFT_0003")
        }

        // DB에서 사용자 삭제
        r, err := m.Admin.DeleteOne(ctx, bson.M{"ID": id})
        if err != nil {
            m.Log.Errorln(err)
            return info.Admin{}, info.Admin{}, err
        }

        return oldAdmin, info.Admin{}, nil
    }
    ```