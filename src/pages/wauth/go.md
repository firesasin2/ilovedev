
# Go
<br/>

### 특성
  + 강타입언어 (다른 형끼리의 변환이 금지되어 있고, 만약 변환을 하고싶다면 명시적으로 타입을 선언해줘야 함)
    ```go
    var a int = 1
    var b float32 = 1.3
    var c float32 = a + b // 강타입 언어인 Go의 코드를 보면, int 형인 a가 float32 형으로 변환되지 않고 컴파일 에러가 발생
    ```
  + 약타입언어
    ```go
    int a = 1;
    float b = 1.3f;
    float c = a + b; // 약타입 언어인 C의 코드를 보면, int 형인 a가 float 형으로 변환됨
    ```
  + 정적 타입 언어
    - Go는 정적 타입 언어로, 컴파일 시간에 타입 오류를 찾을 수 있어 코드의 안정성을 높여줌. 또한 명시적인 타입 선언을 통해 코드의 가독성을 높임
  + 병렬 처리 및 동시성 지원 (고루틴, 채널)
    - 강력한 병렬 처리와 동시성을 지원. goroutine이라는 가벼운 스레드를 사용하여 동시성을 쉽게 구현할 수 있으며, channel을 통해 안전하게 데이터를 전달
  + 가비지 컬렉션
    - 자동으로 메모리를 관리하는 가비지 컬렉션을 지원하여 개발자가 명시적으로 메모리를 할당하고 해제할 필요가 없음. 이로써 메모리 누수에 대한 우려를 줄여줌
  + 컨텍스트가 있음
  + 포인터가 있지만, 포인터 연산은 안됨
  + 슬라이스가 있음(편의성)
  + 다른 언어와 패턴이 미묘하게 다름(적응기간 필요)
<br/>

### 장점
  + 가볍다
  + 테스트 코드 짜기 쉬움
  + 간결하고 가독성이 높은 문법
    - Go 언어는 C 스타일의 문법을 기반으로 하면서도 일부 기능을 제거하고 간결한 문법을 지향함. 이로 인해 코드 작성이 편리하며 가독성이 좋음
  + 빠르게 개발(불필요한 코드가 적음)
  + 빌드가 빠름
    - 컴파일러가 매우 효율적으로 설계되어 있음. 
    - Golang으로 작성된 코드의 빌드 속도는 Java, Python, JavaScript 등과 같은 인터프리터 언어에 비해 훨씬 빠름
  + 크로스 플랫폼 지원
    - Go 언어는 크로스 플랫폼을 목표로 하며, 여러 운영체제와 아키텍처에서 동작할 수 있도록 컴파일할 수 있음
<br/>

### 함수
  + 함수 리턴 값이 여러개 가능
  + 함수 선언부에 반환 타입을 적을때, 변수명까지 지정해서 사용 가능
  + 예제
    ```go
    package main

    func Divide(a, b int) (result int, success bool) {
        if b == 0 {
            result = 0
            success = false
            return
        }
        result = a / b
        success = true
        return
    }
	
	  a, b := Divide(10, 2)
	  fmt.Println(a, b) // 5 true
	  ```
<br/>

### 상수
  + 숫자형 상수
    ```go
    const x = 42
    const y = 3.14
    const z = 2 + 3i // 복소수 상수
    ```
  + 문자열 상수
    ```go
    const hello = "Hello, World!"
    ```
  + 불리언 상수
    ```go
    const isTrue = true
    const isFalse = false
    ```
  + 문자 상수
    ```go
    const charA = 'A'
    ```
  + 타입 없는 상수
    ```go
    const untypedInt = 42
    const untypedString = "hello"
    const untypedBool = true
    ```
  + 비트 연산을 위한 상수
    ```go
    const (
        FlagRead = 1 << iota // 2^0 = 1
        FlagWrite            // 2^1 = 2
        FlagExecute          // 2^2 = 4
    )
    ```
  + 열거형 상수 (Enum)
    ```go
    const (
        Monday = iota
        Tuesday
        Wednesday
        Thursday
        Friday
        Saturday
        Sunday
    )
    ```
  + const로 선언
<br/>

### 문자열
  + 문자열은 백쿼트로 묶으면 특수 문자가 동작하지 않음(백쿼트 안에서 엔터 입력)
    ```go
    str2 := `Go is "awesome"!\nGo is simple and\t'powerful'`
    ```
  + rune 타입과 int32는 이름만 다를 뿐 같은 타입
    ```go
    var char rune = '한'
    fmt.Printf("%T\n", char) // char 타입 출력
    fmt.Println(char)        // char값 출력
    fmt.Printf("%c\n", char) // 문자 출력

    // int32
    // 54620
    // 한

    str1 := "가나다라마" // 한글 문자열
    str2 := "abcde" // 영문 문자열

    fmt.Printf("len(str1) = %d\n", len(str1)) // 한글 문자열 크기
    fmt.Printf("len(str2) = %d\n", len(str2)) // 영문 문자열 크기
    한글은 한글자에 string에 3개에 저장됨
    len(str1) = 15
    len(str2) = 5
	  ```
<br/>

### 구조체
  + 선언
    ```go
    type 타입명 struct {
        필드명 타입
        …
        필드명 타입
    }
	  ```
  + 필드명이 대문자로 시작하는 경우 패키지 외부로 공개됨
  + 초기화
    ```go
    user := User{"김은국", "firesasin", 38}
	  ```
  + 구조체 크기
    ```go
	  package main

    import (
        "unsafe"
        "fmt"
    )
	
    type User struct {
        Age   int32   // 4바이트
        Score float64 // 8바이트
    }
    func main() {
        user := User{23, 77.2}
        fmt.Println(unsafe.Sizeof(user))
    }
    // 16   메모리 정렬 때문(12로 예상)
	  // 메모리 정렬: 데이터에 효과적으로 접근하고자 메모리를 일정 크기 간격으로 정렬하는 것(메모리 패딩)
	  ```
<br/>

### 배열
  + 배열은 값을 여러개 저장하는 연속된 메모리 공간
  + 내장함수 len()으로 배열 길이 확인 가능
  + 선언
    ```go
    var 변수명 [요소 개수]타입

    var t [5]float64

    // 선언하지 않은 변수는 0으로 초기화
    var s = [5]int{1:10, 3:30}

    x := [...]int{10, 20, 30}

    // 배열 복사
    a := [5]int{1, 2, 3, 4, 5}
    b := [5]int{500, 400, 300, 200, 100}
    b = a
    // 값 복사 : 형이 정확히 같아야 함
    ```
<br/>

### 포인터
  + 주소 하나를 여러 포인터가 가리킬 수 있음
  + 예제
    ```go
    var a int = 500
	  var p *int // int 포인터 변수 p 선언

    p = &a   // a의 메모리 주소를 변수 p의 값으로 대입(복사)
    *p = 100 // p가 가리키는 메모리 공간의 값을 변경함.
    ```
<br/>

### context
  + 여러 고루틴 간에 값 및 취소 신호를 전달하기 위한 표준화된 방법을 제공(타임아웃, 취소, 값 전달 등)
  + 사용예
    ```go title=""
    package main

    import (
        "context"
        "fmt"
        "time"
    )

    func main() {
        // Background 컨텍스트는 종료 시그널이 없음.
        ctx := context.Background()

        // WithCancel을 사용하여 취소 가능한 컨텍스트를 생성함.
        ctx, cancel := context.WithCancel(ctx)

        // WithTimeout을 사용하여 타임아웃이 있는 컨텍스트를 생성함.
        ctxWithTimeout, timeoutCancel := context.WithTimeout(ctx, 3*time.Second)

        // 값을 저장하고 전달하기 위한 컨텍스트 생성
        ctxWithValue := context.WithValue(ctx, "key", "value")

        // 고루틴에서 비동기적으로 작업 수행
        go func() {
            // 컨텍스트 취소 시그널이 오면 작업 중단
            <-ctx.Done()
            fmt.Println("Task canceled.")
        }()

        // 타임아웃 시간 동안 대기
        select {
        case <-time.After(2 * time.Second):
            fmt.Println("Timeout passed.")
        case <-ctxWithTimeout.Done():
            fmt.Println("Context with timeout canceled.")
        }

        // 컨텍스트에 저장된 값 읽기
        if value, ok := ctxWithValue.Value("key").(string); ok {
            fmt.Println("Value from context:", value)
        }

        // 취소 함수 호출하여 컨텍스트 종료
        cancel()
        timeoutCancel()
    }
    ```
<br/>
	
### init.go
  + 패키지 초기화: 패키지의 초기화 로직을 담당하며, 프로그램이 실행될 때 자동으로 호출됨(프로젝트의 루트 디렉토리나 패키지 디렉토리 내에 위치할 수 있음)
  + 전역 변수 초기화: var 키워드를 사용하여 전역 변수를 선언하고 기본값을 설정 할 수 있음.
  + 함수 초기화: 팩토리 메서드 또는 기타 초기화 코드를 포함하는 함수를 정의할 수 있음.
  + 여러파일 가능함
<br/>

### main.go
  + 실행 가능한 프로그램의 진입점(entry point)을 정의하는 파일
  + C의 main함수와 같음
<br/>

### go.mod
  + go의 모듈관리
  + mod 초기화 및 go.mod 파일 생성
    ```go
    go mod init {package name}
	  ```
  + go.sum 파일 생성
    ```go
    go build 
	  ```
  + 소스내 의존성을 go.mod 파일에 정리
    ```go
    go tidy
	  ```
  + go.sum 파일 유효성 검사
    ```go
    go mod verify
	  ```
<br/>

### cgo
  + cgo는 Go 코드에서 C 코드를 호출할 수 있게 해주는 Go 언어 기능
  + 장점
	- C 라이브러리 및 시스템 호출에 액세스할 수 있음.
	- 유연성과 확장성: Go의 간결함을 유지하면서 필요한 부분에 C 코드를 사용할 수 있음.
	- 성능: C 코드는 일반적으로 Go 코드보다 빠르므로 성능이 중요한 부분에 사용할 수 있음.
	- 하드웨어 및 시스템 액세스: C 라이브러리를 통해 하드웨어 장치 및 운영 체제 기능에 액세스할 수 있음.
<br/>

### Go 프레임워크
  + gin 가장 오랫동안 개발되어 왔으며 현재 Star 1위. 무거움
  + fiber fasthttp 기반, Express의 용이성과 Go의 원시 성능을 결합
  + echo
  + fasthttp
    - 높은 성능: 뛰어난 성능을 자랑하며, net/http보다 최대 10배 빠르다고 알려져 있음.
	- 낮은 메모리 사용량: 메모리 할당을 최소화하여 메모리 효율성이 뛰어남.
	- 간결한 인터페이스: 쉽고 명확한 API를 제공하여 코드 작성이 간단함.
	- 다양한 기능: 라우팅, 미들웨어, 쿠키, 세션, 바디 파서 등 웹 개발에 필요한 기능을 모두 제공함.
	- 커뮤니티 지원: 활발한 커뮤니티가 지원하여 문제 해결 및 정보 요청이 쉽음.
<br/>