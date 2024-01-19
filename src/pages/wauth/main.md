
# main.go

wauth 프로그램의 진입점(entry point) 파일.
<br/>

### package와 import
  + main.go의 package 이름은 main
  + import 키워드는 외부 패키지를 현재 소스 코드에서 사용할 수 있도록 가져옴 
    + import 문은 Go 소스 코드 파일의 맨 위에 위치하며, 사용할 패키지를 지정
  + main.go 소스
    ```go
    package main

    import (
            "context"   // 내장 라이브러리
            "fmt"
            "math/rand"
            "net/http"
            "runtime"
            "time"

            "github.com/acrav3/libconfigkey"            // 분리된 패키지 libconfigkey
            "github.com/acrav3/liblicense"
            "github.com/acrav3/wauth/admininboxmanager" // wauth 내부에 존재하는 패키지 admininboxmanager
            "github.com/acrav3/wauth/adminmanager"
            // ...

            "github.com/gorilla/handlers"               // wauth에서 사용되는 http 관련 라이브러리
	        "github.com/gorilla/mux"
    )
    ```
<br/>

### 전역변수
  + main.go의 전역변수
  + 다른 파일(handler에서 사용)
    ```go
    var (
        keyMgr  *libconfigkey.KeyManager
        nodeMgr *nodemanager.NodeManager

        adminMgr                *adminmanager.AdminManager
        userMgr                 *usermanager.UserManager
        // ...
    )
    ```
<br/>

### main 함수
  + wauth의 main 함수
    ```go
    func main() {
        runtime.GOMAXPROCS(runtime.NumCPU()) // 현재 CPU 수만큼 고루틴의 동시 실행 수를 설정(Go 언어에서 병렬 프로그래밍을 위해 사용되는 코드)

        var err error
        ctx := context.Background()

        logging.Debugln("wresource start")

        defer client.Close()

        // manager 선언
        // {매니저 이름}, {오류객체} = {라이브러리이름}.New({context}, {로깅인스턴스}, ..., {mongodb client 포인터})
        keyMgr, err = libconfigkey.New(ctx, logging, flagConfdir, client)
        if err != nil {
            logging.Fatalln(err)
        }
        AESKey, err = keyMgr.GetAESKey(ctx)
        if err != nil {
            logging.Fatalln(err)
        }
        JWTKey, err = keyMgr.GetJWTKey(ctx)
        if err != nil {
            logging.Fatalln(err)
        }
        HashKey, err = keyMgr.GetHashKey(ctx)
        if err != nil {
            logging.Fatalln(err)
        }
        errorMgr, err = errormanager.New(ctx, logging, client)
        if err != nil {
            logging.Fatalln(err)
        }
        rsaKeyMgr, err = rsakeymanager.New(ctx, logging, client, AESKey)
        if err != nil {
            logging.Fatalln(err)
        }
        adminMgr, err = adminmanager.New(ctx, logging, client, AESKey)
        if err != nil {
            logging.Fatalln(err)
        }
        userMgr, err = usermanager.New(ctx, logging, client, AESKey)
        if err != nil {
            logging.Fatalln(err)
        }

        // ...

        licenseMgr, err = liblicense.NewLicenseManager(ctx, logging, client, AESKey)
        if err != nil {
            logging.Fatalln(err)
        }
    }
    ```
<br/>

### 라우터 및 핸들러
  + wauth의 라우터 및 핸들러
  + 기본적으로 gorilla를 사용
    + Gorilla is a web toolkit for the Go programming language that provides useful, composable packages for writing HTTP-based applications.
  + 소스
    ```go
    // 라우터 및 핸들러 설정
	r := mux.NewRouter().PathPrefix(Config.ServiceBaseURI).Subrouter()
    // mux.NewRouter().PathPrefix("/").Subrouter()

	// Login / Logout
	r.Path("/api/adminlogin").Methods("POST").HandlerFunc(HandlerAdminLogin)
    // r.Path({Handle할 url주소}).Methods("POST").HandlerFunc({Handle이름-함수이름})

	r.Path("/api/adminlogout").Methods("POST").HandlerFunc(HandlerAdminLogout)
	r.Path("/api/self/userlogin").Methods("POST").HandlerFunc(HandlerUserLogin)
	r.Path("/api/self/userlogout").Methods("POST").HandlerFunc(HandlerUserLogout)

	r.Path("/api/valid").Methods("GET").HandlerFunc(HandlerValid)

	// rsapublickey
	r.Path("/api/rsapublickey:create").Methods("POST").HandlerFunc(HandlerCreateRSAKey)
	r.Path("/api/free/rsapublickey:create").Methods("POST").HandlerFunc(HandlerCreateRSAKey)

    // ...

	// Admins
	r.Path("/api/admins").Methods("GET").HandlerFunc(HandlerListAdmins)
	r.Path("/api/admins/{id}").Methods("GET").HandlerFunc(HandlerGetAdmin)
	r.Path("/api/admins:create").Methods("POST").HandlerFunc(HandlerCreateAdmin)
	r.Path("/api/admins:update").Methods("POST").HandlerFunc(HandlerUpdateAdmin)
	r.Path("/api/admins:delete").Methods("POST").HandlerFunc(HandlerDeleteAdmin)
	r.Path("/api/admins:lock").Methods("POST").HandlerFunc(HandlerLockAdmin)
	r.Path("/api/admins:unlock").Methods("POST").HandlerFunc(HandlerUnlockAdmin)

    // ...

    r.Use(Middleware)   // 미들웨어 사용
	logging.Normalln("http.Listening ready")

	// CORS 처리
	header := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})    // 허용된 HTTP 헤더를 설정
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"})               // 허용된 HTTP 메서드를 설정
	origins := handlers.AllowedOrigins([]string{"http://localhost:3000"})                               // 허용된 출처(Origin)를 설정
	credentials := handlers.AllowCredentials()      // 자격 증명을 요청 및 응답에 포함할 수 있도록 허용

    //  HTTP 서버를 시작하는 함수 (위에서 설정된 라우터 r로 라우팅함)
	err = http.ListenAndServe(fmt.Sprintf("%s:%d", Config.ServiceIP, Config.ServicePort), handlers.CORS(header, methods, origins, credentials)(r))
	if err != nil {
		logging.Fatalln(err)
	}
    ```

### 기타
  + 배채(쓰레드) 관련 소스 (고루틴)
    ```go
	// 로직: 랜덤 시간에 라이선스 평가
	go Thread_LicenseCheck()

	// 주기적으로 만료된 사용자 오프라인토큰을 삭제합니다.
	go adminMgr.Thread_CheckOfflineToken()
	// 주기적으로 관리자 로그인 시도 횟수를 초기화 합니다.
	go adminMgr.Thread_CheckNumLogonAttempt()

	// 주기적으로 만료된 사용자 오프라인토큰을 삭제합니다.
	go userMgr.Thread_CheckOfflineToken()
	// 주기적으로 만료된 사용자 어플리케이션토큰을 삭제합니다.
	go userMgr.Thread_CheckApplicationToken()
	// 주기적으로 사용자 로그인 시도 횟수를 초기화 합니다.
	go userMgr.Thread_CheckNumLogonAttempt()

	// 로직: 관리자 세션 정리
	go adminWebSessionMgr.Thread_AdminWebSession()

	// 로직: 사용자 세션 정리
	go userWebSessionMgr.Thread_UserWebSession()
    ```