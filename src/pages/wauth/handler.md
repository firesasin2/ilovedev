# handler.go

<br/>

### 핸들러
  + wauth에서 각각의 http 요청을 담당하는 함수
  + wauth에서 모든 http 요청은 각각을 담당하는 핸들러 함수가 있음
  + 관리자 조회 핸들러
    ```go
    func HandlerListAdmins(w http.ResponseWriter, r *http.Request) {
      // 처음에는 Handler함수 이름
      logging.Debugln("HandlerListAdmins")

      // request를 분석해서, JWT토큰 정보를 가져옴
      claims, _, err := getClaims(r)
      if err != nil {
        logging.Errorln(err)
        w.WriteHeader(http.StatusUnauthorized)
        w.Write([]byte(tool.ErrorStack(err, "E_DEFT_0000").Error()))
        return
      }

      if claims == nil {
        logging.Errorln(fmt.Errorf("claims is nil"))
        w.WriteHeader(http.StatusUnauthorized)
        return
      }

      // 필터 구문 함수
      query, fields, sort, max, err := tool.ParseHttpQueryString(r, 0)
      if err != nil {
        logging.Errorln(err)
        if err == tool.ErrHttpQueryMaxValue {
          w.WriteHeader(http.StatusBadRequest)
          w.Write([]byte(tool.ErrorStack(err, "E_DEFT_0001").Error()))
          return
        } else {
          w.WriteHeader(http.StatusBadRequest)
          w.Write([]byte(tool.ErrorStack(err, "E_DEFT_0000").Error()))
          return
        }
      }

      // 관리자 조회
      admins, err := adminMgr.List(r.Context(), query, fields, sort, max)
      if err != nil {
        logging.Errorln(err)
        w.WriteHeader(http.StatusBadRequest)
        w.Write([]byte(tool.ErrorStack(err).Error()))
        return
      }

      // 로직: 비밀번호 가리기
      if claims.Person.Type == string(info.PERSON_TYPE_ADMIN) {
        newAdmins := []info.Admin{}
        for _, admin := range admins {
          admin.Password = ""
          newAdmins = append(newAdmins, admin)
        }

        admins = newAdmins
      }

      // http 결과 리턴(JSON)
      b, err := json.Marshal(admins) // {"Age":23,"Score":77.2}
      if err != nil {
        logging.Errorln(err)
        w.WriteHeader(http.StatusBadRequest)
        w.Write([]byte(tool.ErrorStack(err).Error()))
        return
      }
      w.Write(b)
    }
    ```
<br/>

  + ParseHttpQueryString 함수
    ```go
    func ParseHttpQueryString(r *http.Request, 기본값 int64) (string, string, string, int64, error) {

      max := int64(0)
      queryParams := r.URL.Query()

      query := queryParams.Get("filter")
      fields := queryParams.Get("fields")
      sort := queryParams.Get("sort")
      maxString := queryParams.Get("max")
      if len(maxString) > 0 {
        maxNum, err := strconv.ParseInt(maxString, 10, 64)
        if err != nil {
          err = fmt.Errorf("max값 [%s] 오류 : %s", maxString, err.Error())
          return "", "", "", -1, err
        }

        max = maxNum
      } else {
        max = 기본값 //기본값
      }

      return query, fields, sort, max, nil
    }
    ```
<br/>

  + 관리자 생성 핸들러
    ```go
    func HandlerCreateAdmin(w http.ResponseWriter, r *http.Request) {

      mw := w.(*MiddlewareResponseWriter)
      logging.Verboseln(libutool.GetCurrentFunctionName() + makeLog(mw))
      
      // 토큰 정책 조회
      tokenPolicy, err := tokenPolicyMgr.Get(r.Context(), "admin")
      if err != nil {
        logging.Errorln(err)
        w.WriteHeader(http.StatusBadRequest)
        w.Write([]byte(tool.ErrorStack(err, "E_DEFT_0000").Error()))
        return
      }

      // 현재시간
      now := time.Now()

      newSubjects := []info.Subject{}

      // subjects를 순회하여 요청을 처리함
      for _, subject := range *mw.subjects {

        switch subject.Result {
        case string(libinfo.SUBJECT_RESULT_FAIL):
          newSubjects = append(newSubjects, subject)
          continue
        default:
        }

        req, ok := subject.SubjectRequestMiddleware.(libinfo.Node)
        if !ok {
          err = fmt.Errorf("conversion failed")
          logging.Errorln(err)
          subject.Result = string(info.SUBJECT_RESULT_FAIL)
          subject.ResultDetail = tool.ErrorStack(err, "E_DEFT_0000").Error()
          newSubjects = append(newSubjects, subject)
          continue
        }
        
        subject.Subject_ID = req.ID
        subject.ID = tool.NewUniqueID()

        // 알림을 위한 msg
        inboxMsg := "ID: " + req.ID + "\n"

        // TagValidate
        err = tool.TagValidate("ko", req, "validate")
        if err != nil {
          logging.Errorln(tool.ErrorStack(err, "E_TAGV_0001"))
          subject.Result = string(info.SUBJECT_RESULT_FAIL)
          subject.ResultDetail = err.Error()
          newSubjects = append(newSubjects, subject)
          continue
        }

        // Role이 있는지 검사
        _, err = roleMgr.Get(r.Context(), req.AdminRole_ID)
        if err != nil {
          logging.Errorln(err)
          subject.Result = string(info.SUBJECT_RESULT_FAIL)
          subject.ResultDetail = "Role이 없습니다."
          newSubjects = append(newSubjects, subject)
          continue
        }

        // 로직: 토큰정책 확인이후, offline토큰 생성
        if tokenPolicy.GenOfflineTokenWhenPeopleAdd {
          req.OfflineSecret, err = tokenMgr.OfflineGenerateAdmin(&req, 600)
          if err != nil {
            logging.Errorln(err)
            subject.Result = string(info.SUBJECT_RESULT_FAIL)
            subject.ResultDetail = tool.ErrorStack(err, "E_DEFT_0000").Error()
            newSubjects = append(newSubjects, subject)
            continue
          }
          req.OfflineSecretLastChangedTimestamp = now.Unix()

          // 알림을 위한 메시지
          tagName, err := tool.GetTagName(req, "OfflineSecret", "ko")
          if err != nil {
            inboxMsg += tagName + ": " + req.OfflineSecret + "\n"
          }
        }

        // 로직: 토큰정책 확인이후, online토큰 생성
        if tokenPolicy.GenOnlineTokenWhenPeopleAdd {
          req.OnlineSecret, err = tokenMgr.AdminOnlineTokenGenerate(&req)
          if err != nil {
            logging.Errorln(err)
            subject.Result = string(info.SUBJECT_RESULT_FAIL)
            subject.ResultDetail = tool.ErrorStack(err, "E_DEFT_0000").Error()
            newSubjects = append(newSubjects, subject)
            continue
          }
          req.OnlineSecretLastChangedTimestamp = now.Unix()

          // 알림을 위한 메시지
          tagName, err := tool.GetTagName(req, "OnlineSecret", "ko")
          if err != nil {
            inboxMsg += tagName + ": " + req.OnlineSecret + "\n"
          }
        }

        if len(req.Password) <= 0 {
          err = fmt.Errorf("password is needed")
          subject.Result = string(info.SUBJECT_RESULT_FAIL)
          subject.ResultDetail = err.Error()
          newSubjects = append(newSubjects, subject)
        }

        // 로직: 비밀번호 복호화
        if mw.claims.Person.Type != string(info.PERSON_TYPE_SERVICE) && mw.claims.Person.Type != string(info.PERSON_TYPE_APITOKEN) {
          if len(req.Password) <= 32 {
            err = fmt.Errorf("front <-> go AES 암복호화 오류: 32자리보다 커야 함")
            logging.Errorln(err)
            subject.Result = string(info.SUBJECT_RESULT_FAIL)
            subject.ResultDetail = tool.ErrorStack(err, "E_DEFT_0000").Error()
            newSubjects = append(newSubjects, subject)
            continue
          }
          // 로직: Front에서 " "만큼 짤라서 복호화 합니다.(RSA 암복호화 데이터 최대 길이 한개)
          splited := strings.Split(req.Password[32:], " ")
          decodeSuccess := true
          // 로직: base64 decode
          for i := 0; i < len(splited); i++ {
            mwb, err := base64.StdEncoding.DecodeString(splited[i])
            if err != nil {
              err = fmt.Errorf("front <-> go AES Base64 decrypt 오류: " + err.Error())
              logging.Errorln(err)
              decodeSuccess = false
              break
            }
            splited[i] = string(mwb)
          }
          if !decodeSuccess {
            subject.Result = string(info.SUBJECT_RESULT_FAIL)
            subject.ResultDetail = tool.ErrorStack(err, "E_DEFT_0000").Error()
            newSubjects = append(newSubjects, subject)
            continue
          }
          // 로직: RSA key 가져오기
          rsaKey, err := rsaKeyMgr.Get(r.Context(), req.Password[0:32])
          if err != nil {
            err = fmt.Errorf("front <-> go RSA key 가져오기 오류: " + err.Error())
            logging.Errorln(err)
            subject.Result = string(info.SUBJECT_RESULT_FAIL)
            subject.ResultDetail = tool.ErrorStack(err, "E_DEFT_0000").Error()
            newSubjects = append(newSubjects, subject)
            continue
          }
          rsaPrivateKeyByte, err := tool.DecodeBase64AndAES256CTRDecrypt(libconfigkey.GetAESKeyOnce(r.Context(), logging, client), rsaKey.RSAPrivateKey)
          if err != nil {
            err = fmt.Errorf("front <-> go AES 복호화 오류: " + err.Error())
            logging.Errorln(err)
            subject.Result = string(info.SUBJECT_RESULT_FAIL)
            subject.ResultDetail = tool.ErrorStack(err, "E_DEFT_0000").Error()
            newSubjects = append(newSubjects, subject)
            continue
          }
          rsaPrivateKey, err := x509.ParsePKCS1PrivateKey(rsaPrivateKeyByte)
          if err != nil {
            err = fmt.Errorf("front <-> go AES 복호화 오류: " + err.Error())
            logging.Errorln(err)
            subject.Result = string(info.SUBJECT_RESULT_FAIL)
            subject.ResultDetail = tool.ErrorStack(err, "E_DEFT_0000").Error()
            newSubjects = append(newSubjects, subject)
            continue
          }
          s := ""
          decryptSuccess := true
          for i := 0; i < len(splited); i++ {
            // 로직: RSA 개인 키로 암호화된 데이터 복호화
            decrypted, err := rsa.DecryptOAEP(sha256.New(), rand.Reader, rsaPrivateKey, []byte(splited[i]), nil)
            if err != nil {
              err = fmt.Errorf("front <-> go AES 복호화 오류: " + err.Error())
              logging.Errorln(err)
              decryptSuccess = false
              break
            }
            s += string(decrypted)
          }
          if !decryptSuccess {
            subject.Result = string(info.SUBJECT_RESULT_FAIL)
            subject.ResultDetail = tool.ErrorStack(err, "E_DEFT_0000").Error()
            newSubjects = append(newSubjects, subject)
            continue
          }
          req.Password = string(s)
        }

        // 로직: password가 규칙에 맞는지 검사
        err = passwordRuleMgr.AdminValidaterule(r.Context(), "admin", &req, req.Password)
        if err != nil {
          logging.Errorln(err)
          subject.Result = string(info.SUBJECT_RESULT_FAIL)
          subject.ResultDetail = err.Error()
          newSubjects = append(newSubjects, subject)
          continue
        }

        old, new, err := adminMgr.Create(r.Context(), req, REGULATION)
        if err != nil {
          logging.Errorln(err)
          subject.Result = string(info.SUBJECT_RESULT_FAIL)
          subject.ResultDetail = err.Error()
          newSubjects = append(newSubjects, subject)
          continue
        }

        // 성공
        subject.Result = string(info.SUBJECT_RESULT_SUCCESS)
        subject.SubjectBefore = nil
        subject.SubjectAfter = new

        newSubjects = append(newSubjects, subject)
      }

      mw.NewSubjects = &newSubjects

      // 결과 전송
      b, err := json.Marshal(newSubjects)
      if err != nil {
        logging.Errorln(err)
        w.WriteHeader(http.StatusInternalServerError)
        w.Write([]byte(tool.ErrorStack(err, "E_DEFT_0000").Error()))
        return
      }

      w.WriteHeader(http.StatusOK)
      w.Write(b)
    }
    ```
<br/>

### getClaims 함수
  + request를 분석해서, JWT토큰 정보를 가져오는 함수
    ```go
    func getClaims(r *http.Request) (*libinfo.Claims, string, error) {
      // 쿠키로부터 sessionID 값을 가져옵니다.
      c, err := r.Cookie("sessionID")
      switch {
      case err == http.ErrNoCookie:
        return nil, "", nil
      case err != nil:
        logging.Errorln(err)
        return nil, "", fmt.Errorf("could not get waxcookie. cause %w", err)
      }

      waxcookieString := c.Value
      claims := &libinfo.Claims{}

      // JWT 파싱
      tkn, err := jwt.ParseWithClaims(waxcookieString, claims, func(token *jwt.Token) (interface{}, error) {
        return JWTKey, nil
      })

      switch {
      case err == jwt.ErrSignatureInvalid:
        return &libinfo.Claims{}, waxcookieString, nil
      case err != nil:
        return &libinfo.Claims{}, waxcookieString, fmt.Errorf("could not parse jwt, cause %w", err)
      case !tkn.Valid:
        return &libinfo.Claims{}, waxcookieString, nil
      }

      logging.Verboseln(claims)

      return claims, waxcookieString, nil
    }
    ```
  + Claims 구조체
    ```go
    type Claims struct {
      Person      Person `json:"person"`
      ConsoleType string `json:"ConsoleType"`
      IP          string `json:"IP"`
      jwt.StandardClaims
    }
    ```
  + jwt.StandardClaims 구조체
    ```go
    type StandardClaims struct {
      Audience  string `json:"aud,omitempty"`
      ExpiresAt int64  `json:"exp,omitempty"`
      Id        string `json:"jti,omitempty"`
      IssuedAt  int64  `json:"iat,omitempty"`
      Issuer    string `json:"iss,omitempty"`
      NotBefore int64  `json:"nbf,omitempty"`
      Subject   string `json:"sub,omitempty"`
    }
    ```

###
  
