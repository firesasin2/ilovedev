
# 빌드
<br/>

### 빌드하기
  + Go 언어에서의 빌드 프로세스는 간단하고 효율적
  + Go는 정적 바이너리를 생성하므로 외부 종속성이 없는 실행 가능한 파일을 만들 수 있음
  + 기본 빌드
    + main.go 파일이 있는 곳에서 아래의 명령어를 타이핑
      ```bash
      go build // 바이너리 파일의 이름은 현재 디렉토리의 이름과 동일하게 설정됨
      ```
    + 실행 파일 이름주기
      ```bash
      go build -o wauth
      ```
    + 즉시 실행하기 (실행 후 임시 파일은 삭제됨)
      ```bash
      go run main.go
      ```
    + 크로스 플랫폼 컴파일 (리눅스에서 Windows 바이너리를 만들 수 있음, 반대도 가능)
      ```go
      GOOS=windows GOARCH=amd64 go build -o output.exe
      ```
  + Go는 의존성을 자동으로 처리하므로 모든 필요한 패키지 및 파일을 찾아 컴파일함
<br/>

### wauth의 make
  + makefile
    ```makefile
    export WAX_RELEASE  // 배포 버전
    export WAX_DATETIME // 배포 날짜
    export WAX_MODE     // BASE인지 CC인지

    LDFLAGS="-X main.Version=${WAX_VERSION} -X main.Build=${WAX_RELEASE}${WAX_DATETIME} -X main.MODE=${WAX_MODE} -w -s"
    export LDFLAGS

    all : wauth

    clean :
            @rm -f ./wauth
            @rm -f ./bin/*
            $(MAKE) -C liboffline clean
            $(MAKE) -C libonline clean
            $(MAKE) -C libapplication clean
            $(MAKE) -C libpki clean

    install :
            @if [ ! -d ./bin ];then mkdir ./bin;fi
            @mv ./wauth ./bin/wauth
            @mv ./libonline/libonline.so ./bin/libonline.so
            @mv ./liboffline/liboffline.so ./bin/liboffline.so
            @mv ./libapplication/libapplication.so ./bin/libapplication.so
            @mv ./libpki/libpki.so ./bin/libpki.so
            @mv ./libpki/dspki.tar ./bin/dspki.tar
            @../xgencrc32/bin/xgencrc32 ./bin/wauth
            @../xgencrc32/bin/xgencrc32 ./bin/libonline.so
            @../xgencrc32/bin/xgencrc32 ./bin/liboffline.so
            @../xgencrc32/bin/xgencrc32 ./bin/libapplication.so
            @../xgencrc32/bin/xgencrc32 ./bin/libpki.so

    wauth : ./*.go ./*/*.go
            go vet
            go build -ldflags ${LDFLAGS} -o wauth
            strip ./wauth
            $(MAKE) -C liboffline all
            $(MAKE) -C libonline all
            $(MAKE) -C libapplication all
            $(MAKE) -C libpki all

    swagger : ./*.go ./*/*.go
            swag init --parseVendor --parseDependency
            go build -ldflags ${LDFLAGS} -o wauth
            strip ./wauth
            $(MAKE) -C liboffline all
            $(MAKE) -C libonline all
            $(MAKE) -C libapplication all
            $(MAKE) -C libpki all

    push :
            @git push origin --all
    ```
  + make all
    make wauth를 실행시킴
  + make wauth
    + make시 또는 make -B시 또는 make all시 또는 make auth시 동작
    + wauth 빌드 명령어
  + make install
    + 빌드된 wauth 파일들을 이동시키고, xgencrc32 명령어로 해당 파일에 해시값을 더함
  + make clean
    + 빌드된 wauth 파일들 삭제
  + LDFLAGS
    + Go 언어의 빌드 프로세스에서 사용되는 링커 플래그
    + 빌드된 프로그램에 대한 링커 동작을 제어하는 데 사용 (LDFLAGS를 사용하여 여러 설정이나 라이브러리 경로 등을 링커에게 전달할 수 있음)
      + 링커 플래그로 사용
        ```makefile
        go build -ldflags="-s -w"
        ```
        + -s는 심볼 정보를 삭제함
        + -w는 디버그 정보를 삭제함
      + 라이브러리의 경로를 지정 (외부 라이브러리를 사용)
        ```makefile
        go build -ldflags="-L /path/to/library"
        ```
      + 특정 변수 값을 전달
        ```
        go build -ldflags="-X main.version=1.0.0"
        ```
        + main 패키지의 version 변수의 값을 "1.0.0"으로 설정할 수 있음
<br/>

### strip
  + 오브젝트 파일에 있는 심볼을 삭제
  + strip -s 파일이름: 모든 심볼을 제거
  + strip -g 파일이름: 디버그 심볼을 제거
  + strip -x 파일이름: 실행 파일에서 모든 심볼과 기호 테이블을 제거
  + strip -R 파일이름: libfoo.so 실행 파일에서 libfoo.so에서 참조하는 심볼만 제거
  + strip -d 파일이름: 디버그용 정보(파일명 또는 행 번호 등)만을 제거하고 함수명 등의 일반 심볼은 남음
  + 다음 명령어와 같음: objcopy --strip-all 파일이름 저장할이름
<br/>

### go vet
  + 소스 코드를 검사하고 일부 일반적인 실수나 잠재적인 문제를 찾기 위한 도구
    * 잘못된 포맷 문자열 사용
	  * 불필요한 코드
	  * 잘못된 타입 변환
	  * 기타 코드에서 발생할 수 있는 잠재적인 문제
<br/>

### go test
  + go test -v: 자세한 출력으로 테스트를 실행합니다.
  + go test -run TestName: TestName과 일치하는 테스트를 실행합니다.