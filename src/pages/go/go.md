
# Go
Go는 범용 프로그래밍 언어로, 깔끔하고 간결하게 생산성 높은 프로그래밍을 만들 수 있음.
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
    - 타입의 결정 시점 을 기준으로 구분됨
      * 정적타입 언어는 컴파일 시 타입이 결정됨. 때문에 자료형을 명시적으로 지정해줘야 함. 만약 타입이 틀렸다면 컴파일 에러 발생
      * 동적타입 언어는 런타임 시 타입이 결정됨. 때문에 자료형을 명으로 지정해줄 필요가 없음
        | 정적 타입 장점 | 동적 타입 장점 |
        | ----------------------------------------------- | ---------------------------------------------- |
        | 컴파일 시 타입 에러를 처리하기 때문에 안정성이 높음 | 코드 작성 시 타입에 대한 제한이 없어 유연성이 높음 |
        | 컴파일 시 미리 타입을 결정해 실행속도가 빠름        | 코드 작성이 효율적                              |

        | 정적 타입 장점 | 동적 타입 장점 |
        | ---------------------------------------------------------- | ------------------------------------------------------------------ |
        | 컴파일 타임에 타입에 대한 제한으로 코드 작성 시 유연함이 떨어짐 | 타입에 대한 리스크를 런타임에 감당해야 함 (코드가 길고 복잡해질 경우 타입 에러를 찾기가 어려워짐) |
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
    ```go
    GOOS=windows GOARCH=amd64 go build -o output.exe  // Linux에서 Windows에서 동작하는 .exe 빌드
    ```
<br/>

### 예약어
  + 예약어들은 식별자(변수명, 함수명 등)로 사용될 수 없음
  + 주요 예약어 목록
    + 기본 자료형과 상수
      + true, false: 불리언 상수.
      + int, int8, int16, int32, int64: 정수 자료형.
      + uint, uint8, uint16, uint32, uint64: 부호 없는 정수 자료형.
      + float32, float64: 부동소수점 자료형.
      + complex64, complex128: 복소수 자료형.
      + string: 문자열 자료형.
      + nil: 포인터, 함수, 인터페이스, 슬라이스, 채널, 맵의 zero value.

    + 제어 구조
      + if, else: 조건문.
      + switch, case, default: 스위치문.
      + select, case: 채널 통신과 타임아웃을 다루는데 사용되는 키워드.

    + 반복문
      + for, range: 반복문.
      
    + 함수와 메서드
      + func: 함수와 메서드를 정의하는 키워드.
      + return: 함수나 메서드에서 값을 반환하는 키워드.
      + defer: 지연된 함수 호출을 정의하는데 사용되는 키워드.
        + Go 언어에서 제공하는 특별한 키워드로, 함수나 메서드가 종료되기 직전에 실행되도록 하는 기능을 제공
        + 함수의 마지막 부분에서 어떤 작업을 처리하거나 리소스를 해제하는 등의 작업을 효과적으로 수행
          ```go
          package main

          import "fmt"

          func main() {
            fmt.Println("Start")

            // 함수가 종료되기 직전에 defer로 지정한 문장이 실행됨
            defer fmt.Println("Deferred statement")

            // 다른 코드들
            fmt.Println("End")
          }
          ```

    + 타입과 구조체
      + type: 새로운 타입을 정의하는 키워드.
      + struct: 구조체를 정의하는 키워드.
      + interface: 인터페이스를 정의하는 키워드.

    + 메모리 관리
      + new: 새로운 인스턴스를 할당하고 초기화하는 키워드.
      + make: 참조 타입(맵, 슬라이스, 채널)을 생성하는 키워드.

    + 기타
      + package, import: 패키지와 임포트를 정의하는 키워드.
      + const, var: 상수와 변수를 정의하는 키워드.

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

### 메서드
  + 함수에 리시버가 있다면 메서드
    + 리시버는 함수 이름 앞에 옴
  + 메서드는 특정 타입과 연결되어 해당 타입의 인스턴스에서만 호출됨
  + 구조체, 인터페이스, 기본 타입에 연결 할 수 있음 (이름을 붙인 자료형이면 모두)
    ```go
    // Rectangle 구조체 정의
    type Rectangle struct {
        Width  float64
        Height float64
    }

    // Rectangle에 Area 메서드 추가
    func (r Rectangle) Area() float64 {
        return r.Width * r.Height
    }
    ```

### interface
  + 추상화: 인터페이스는 객체의 공통 동작을 정의하기 때문에, 구체적인 구현에 대한 정보를 제공하지 않음. 따라서 인터페이스는 객체의 구현을 캡슐화하는 데 사용
  + 다형성: 인터페이스는 객체의 구현을 캡슐화하기 때문에, 서로 다른 구현을 가진 객체를 동일한 방식으로 처리할 수 있음
  + 유연성: 인터페이스는 구현이 없는 메서드의 집합이기 때문에, 다양한 방식으로 구현할 수 있음
  + 메서드의 집합을 정의하는 추상 타입
  + 구체적인 타입을 나타내지 않고, 단지 특정 메서드 집합을 구현한 타입
  + 이를 통해 다형성을 구현하고 코드 재사용을 촉진하는 등의 이점을 얻을 수 있음
  + 예제
    ```go
    type MyInterface interface {
      Method1() string
      Method2(int) error
      // ... 다양한 메서드들
    }

    // MyType은 MyInterface를 구현하는 구체적인 타입입니다.
    type MyType struct {
        Data string
    }

    // Method1은 MyType이 MyInterface의 메서드를 구현하도록 합니다.
    func (mt MyType) Method1() string {
        return "Data: " + mt.Data
    }

    // Method2도 구현합니다.
    func (mt MyType) Method2(value int) error {
        fmt.Println("Received value:", value)
        return nil
    }

    func main() {
        // MyType을 MyInterface로 선언
        var myInterfaceInstance MyInterface
        myInterfaceInstance = MyType{Data: "Hello, World!"}

        // MyInterface의 메서드 호출
        result := myInterfaceInstance.Method1()
        fmt.Println(result)

        // MyInterface의 또 다른 메서드 호출
        err := myInterfaceInstance.Method2(42)
        if err != nil {
            fmt.Println("Error:", err)
        }
    }
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
  + Embedding
    - 구조체를 다른 구조체에 포함하는 것
    - 포함된 구조체의 모든 필드와 메서드는 포함하는 구조체에서 사용할 수 있음(구조체 코드 재사용)
    - 명시적인 상속의 복잡성을 피하면서도 코드 재사용과 확장성을 유지 할 수 있음
    - 예제
      ```go
      package main

      import "fmt"

      // 부모 구조체
      type Animal struct {
        Name string
      }

      // 자식 구조체
      type Dog struct {
        Animal      // Animal 구조체 내장
        Breed string // 자식 구조체에 추가된 필드
      }

      func main() {
        // 자식 구조체의 인스턴스 생성
        myDog := Dog{
          Animal: Animal{Name: "Buddy"},
          Breed:  "Labrador",
        }

        // 부모 구조체의 필드에 접근
        fmt.Println("Name:", myDog.Name)

        // 자식 구조체의 필드에 접근
        fmt.Println("Breed:", myDog.Breed)
      }
      ```
<br/>

### 배열
  + 배열은 값을 여러개 저장하는 연속된 메모리 공간
  + 내장함수 len()으로 배열 길이 확인 가능
  + 쓸모가 있지만 자주 쓰이지는 않음. 슬라이스를 더 자주 씀
  + 선언
    ```go
    var 변수명 [요소 개수]타입

    var t [5]float64

    // 선언하지 않은 변수는 0으로 초기화
    var s = [5]int{1:10, 3:30}

    x := [...]int{10, 20, 30}

    a := [4]int{1, 2, 3, 4}
    ```
  + 배열 복사
    ```go
    // 배열 복사
    a := [5]int{1, 2, 3, 4, 5}
    b := [5]int{500, 400, 300, 200, 100}
    b = a
    // 값 복사 : 형이 정확히 같아야 함
    ```
<br/>

### 슬라이스
  + 배열과의 공통점은 연속된 메모리 공간을 순차적으로 이용하는 자료구조
  + 배열과 마찬가지로 같은 타입의 요소들을 가짐
  + 슬라이스는 배열과 달리 크기를 미리 정하지 않으며, 동적으로 크기가 조절될 수 있음
  + 선언
    ```go
    // 슬라이스 생성
    slice := []int{1, 2, 3, 4, 5}

    // 빈 슬라이스 생성
    var emptySlice []int

    newSlice := make([]int, 3, 5) // 길이: 3, 용량: 5

    // nil 슬라이스 (초기화되지 않은 슬라이스)
    var nilSlice []int
    ```
  + 인덱싱 및 슬라이싱
    ```go
    // 인덱싱
    fmt.Println(slice[0]) // 출력: 1

    // 슬라이싱 (하위 슬라이스 생성)
    subSlice := slice[1:4] // 1번 인덱스부터 4번 인덱스 전까지 (2, 3, 4)
    ```
  + 길이와 용량
    ```go
    // 길이 (슬라이스에 포함된 요소의 수)
    length := len(slice)

    // 용량 (배열의 길이에서 슬라이스의 시작 인덱스를 뺀 값)
    capacity := cap(slice)
    ```
    + 동적 크기 조절
    ```go
    // append 함수를 사용하여 슬라이스에 요소 추가
    slice = append(slice, 6, 7)

    // 슬라이스 길이와 용량 출력
    fmt.Println(len(slice), cap(slice))
    ```
  + 슬라이스 복사
    ```go
    // copy 함수를 사용하여 슬라이스 복사
    copySlice := make([]int, len(slice))
    copy(copySlice, slice)
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

### 채널
  + 채널은 고루틴 간의 안전한 데이터 통신을 위한 메커니즘으로, 고루틴 간에 데이터를 주고받을 때 사용
  + 채널은 일종의 파이프로서, 한 고루틴에서 데이터를 보내면 다른 고루틴에서 받을 수 있음
  + 채널을 너무 많이 열면 성능 이슈, 데드락 가능성이 발생 할 수 있음
    + 예제
      ```go
      package main

      import "fmt"

      func main() {
          // 정수를 주고받을 수 있는 채널 생성
          ch := make(chan int)

          // 고루틴을 이용하여 데이터를 보내는 함수
          go func() {
              time.Sleep(2 * time.Second)
              ch <- 42 // 42를 채널에 보냄
          }()

          // 메인 고루틴에서 채널에서 데이터를 받음
          value := <-ch
          fmt.Println(value) // 출력: 42
      }
      ```
    + 예제2
      ```go
      package main

      import "fmt"

      func sendData(ch chan<- int) {
          ch <- 1
          ch <- 2
          ch <- 3
          close(ch)
      }

      func main() {
          ch := make(chan int)

          // sendData 함수에 채널을 보냄
          go sendData(ch)

          // 채널에서 값을 읽음
          for {
              value, ok := <-ch
              if !ok {
                  break // 채널이 닫힌 경우 루프 종료
              }
              fmt.Println(value)
          }
      }
      ```
<br/>

### nil
 + 선언과 nil
  ```go
  a := []byte{}
  if a == nil {
    fmt.Println("a == nil")
  }

  var b []byte
  if b == nil {
    fmt.Println("b == nil")
  }
  ```
<br/>
