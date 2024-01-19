
# init.go

init 함수는 자동으로 호출되는 특별한 함수로, 패키지 수준에서 사용됨. init 함수는 패키지가 초기화될 때 한 번만 호출되며, 패키지 내에서 여러 개의 init 함수를 가질 수 있음
<br/>

### 해시 검사
  ```go
  h := libutool.NewAppendHash() 
  has := h.Has(self)
  ```
<br/>

### 설정 파일
  ```go
  libconfigdb - LoadMgoConfig() // 설정값 처리
  GetConfig()
  libconfigdb - GetKEK()
  libconfigdb - NewFileKey()
  ```
  
### mongodb 접속
  + Go 언어용 공식 드라이버 패키지 go.mongodb.org/mongo-driver/mongo
  + 사용예
    ```go title="init.go"
    func() {
      option := libmongo.MongoConnectOption{
          Server:             dbcfg.MgoHost,
          Port:               int(dbcfg.MgoPort),
          UserId:             dbcfg.MgoUserID,
          UserPassword:       dbcfg.MgoUserPassword,
          DatabaseName:       dbcfg.MgoDatabase,
          Direct:             !dbcfg.MgoInDirect,
          Timeout:            int64(dbcfg.MgoTimeout),
          Ssl:                dbcfg.MgoSSL,
          TlsCertificateFile: dbcfg.MgoTLSCert,
          Tlsprivatekeyfile:  dbcfg.MgoTLSPriv,
          Tlscafile:          dbcfg.MgoTLSCA,
      }

      client = libmongo.NewMongoClient(option)
      err := client.Connect()
      if err != nil {
          logging.Fatalln(err)
      }
      logging.Debugln("Mongodb Connect success")
    }()
  ```
  + libmongo - NewMongoClient