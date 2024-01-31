# middleware.go

<br/>

### 미들웨어란?
  + HTTP 요청과 응답 처리 중에 실행되는 중간 소프트웨어 컴포넌트
  + 미들웨어는 주로 웹 애플리케이션에서 HTTP 핸들러의 앞이나 뒤에서 실행
  + 요청 또는 응답을 수정하거나 로깅, 인증, 인가, 캐싱, 에러 처리 등과 같은 추가 기능을 제공
<br/>

### wauth의 미들웨어
  + github.com/gorilla/mux를 사용
  + github.com/gorilla/mux는 미들웨어 기능을 제공함
    ```go
    // 라우터 및 핸들러 설정
	r := mux.NewRouter().PathPrefix(Config.ServiceBaseURI).Subrouter()
    // 미들웨어 설정
    r.Use(Middleware)
    ```
  + 미들웨어 함수
    + history 생성
    + 오류 코드를 해석해서 Front에게 전달 (Front에서 요청 할 경우만)
        ```go
        func Middleware(h http.Handler) http.Handler {

            return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

                var err error

                //////////////////////////
                // 로직: history_ID 발급 //
                //////////////////////////
                history_ID := libutool.NewUniqueID()
                ////////////////////////
                // 로직: 요청시간 생성 //
                ///////////////////////
                requestTimestamp := time.Now()

                url := r.URL.Path
                method := r.Method

                ///////////////////////
                // 로직: context 설정 //
                //    Timeout시간    //
                ///////////////////////
                // r로부터 context를 받아서 context 생성
                // context: Timeout시간 설정
                httpRequestTimeout := 90
                if Config.HttpRequestTimeout > 0 {
                    httpRequestTimeout = Config.HttpRequestTimeout
                }
                ctx, cancel := context.WithTimeout(r.Context(), time.Duration(httpRequestTimeout)*time.Second)
                defer cancel()
                // context: History_ID 설정
                ctx = context.WithValue(ctx, "History_ID", history_ID)
                // context: RequestTimestamp 설정
                ctx = context.WithValue(ctx, "RequestTimestamp", requestTimestamp)
                // r에 context 저장
                r = r.WithContext(ctx)

                //////////////////////////////////////////////////////
                // 로직: claims가 분석 되지 않을경우, 요청을 처리하지 않음 //
                //      세션키 없거나 변조 되었을 경우(로그인은 제외)     //
                //////////////////////////////////////////////////////
                claims := &info.Claims{}
                if !isFreeRequest(r) {
                    // claims가 분석 되지 않을경우, 요청을 처리하지 않음
                    claims, _, err = getClaims(r)
                    if err != nil {
                        logging.Errorln(err)
                        w.WriteHeader(http.StatusUnauthorized) // 권한 오류
                        w.Write([]byte(libutool.ErrorStack(err).Error()))
                        return
                    }
                    if claims == nil {
                        logging.Errorln(fmt.Errorf("claims is nil"))
                        w.WriteHeader(http.StatusUnauthorized)
                        w.Write([]byte(tool.ErrorStack("E_DEFT_0000").Error()))
                        return
                    }
                }

                /////////////////////////
                // historyType 가져오기 //
                /////////////////////////
                var historyType info.HistoryType
                historyType, err = historyMgr.GetType(method, url)
                if err != nil {
                    if err == historymanager.ErrNoDocuments {
                        w.WriteHeader(http.StatusForbidden)
                        w.Write([]byte(tool.ErrorStack(err, "E_DEFT_0001").Error()))
                    } else {
                        logging.Errorln(err, method, url)
                        w.WriteHeader(http.StatusInternalServerError)
                        w.Write([]byte(tool.ErrorStack(err, "E_DEFT_0000").Error()))
                    }
                    return
                }

                /////////////////////////////////////////////////////////
                // 로직: history에 기록 && WrtieHistory 요청만(GET은 제외) //
                /////////////////////////////////////////////////////////
                result := ""
                switch historyType.Type {
                case "Async":
                    result = string(info.HISTORY_RESULT_REQUESTED)
                case "Sync":
                    result = string(info.HISTORY_RESULT_PENDING)
                default:
                    logging.Errorln("unknown type")
                    w.WriteHeader(http.StatusInternalServerError)
                    w.Write([]byte(tool.ErrorStack("E_DEFT_0000").Error()))
                    return
                }

                if method == "GET" {

                    ///////////////////////////////////////////////////////////
                    // 로직: history type에 WrtieHistory가 있다면, history 기록 //
                    ///////////////////////////////////////////////////////////
                    if historyType.WrtieHistory {
                        // history Object 생성
                        history, err := MakeHistory(r.Context(), history_ID, r, requestTimestamp.Unix(), 0, "", 0, []info.Subject{}, result)
                        if err != nil {
                            logging.Errorln(err)
                            w.WriteHeader(http.StatusInternalServerError)
                            w.Write([]byte(libutool.ErrorStack(err, "E_DEFT_0000").Error()))
                            return
                        }

                        // history 생성
                        err = CreateHistory(ctx, history)
                        if err != nil {
                            logging.Errorln(err)
                            w.WriteHeader(http.StatusInternalServerError)
                            w.Write([]byte(tool.ErrorStack(err, "E_DEFT_0000").Error()))
                            return
                        }
                    }
                } else {

                    subjects := []info.Subject{}
                    // 로직: 로그인 로그아웃과 같은 Subjects가 없는 API가 아니라면,
                    if !isLoginOrLogoutRequest(r) {
                        /////////////////////////////////////////////////////////
                        // 로직: Subjects를 만듭니다. context를 통해 handler에 전달 //
                        /////////////////////////////////////////////////////////
                        subjects, httpStatus, err := makeSubjectFromMSG(r, historyType.SubjectType)
                        if err != nil {
                            logging.Errorln(err)
                            w.WriteHeader(httpStatus)
                            w.Write([]byte(err.Error()))
                            return
                        }

                        ctx = context.WithValue(ctx, "Subjects", subjects)
                        // r에 context 저장
                        r = r.WithContext(ctx)
                    }

                    ///////////////////////////////////////////////////////////
                    // 로직: history type에 WrtieHistory가 있다면, history 기록 //
                    ///////////////////////////////////////////////////////////
                    if historyType.WrtieHistory {
                        // history Object 생성
                        history, err := MakeHistory(r.Context(), history_ID, r, requestTimestamp.Unix(), 0, "", 0, subjects, result)
                        if err != nil {
                            logging.Errorln(err)
                            w.WriteHeader(http.StatusInternalServerError)
                            w.Write([]byte(tool.ErrorStack(err, "E_DEFT_0000").Error()))
                            return
                        }

                        // history 생성
                        err = CreateHistory(ctx, history)
                        if err != nil {
                            logging.Errorln(err)
                            w.WriteHeader(http.StatusInternalServerError)
                            w.Write([]byte(tool.ErrorStack(err, "E_DEFT_0000").Error()))
                            return
                        }
                    }
                }

                mResponseWriter := &MiddlewareResponseWriter{
                    ResponseWriter: w,
                    Status:         http.StatusOK, //default
                    Type:           claims.Person.Type,
                    URL:            url,
                    Method:         method,
                    History_ID:     history_ID,
                    HistoryType:    historyType,
                    Context:        ctx,
                    Request:        r,
                }

                ///////////////////////
                // 로직: 실제 API 요청 //
                ///////////////////////
                h.ServeHTTP(mResponseWriter, r)

            })
        }
        ```
<br/>

