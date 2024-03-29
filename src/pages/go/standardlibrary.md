# 내장 라이브러리
외장라이브러리는 https://github.com/gorilla/mux와 같이 외부 저장소에서 가져와야 하고, 내장 라이브러리는 GO에서 제공하므로 별도의 설치 없이 사용 할 수 있는 라이브러리
<br/>

### time
  + 시간과 관련된 작업을 수행하기 위한 다양한 함수와 구조체들을 제공
  + 시간을 나타내는 구조체, 시간 간의 비교, 시간 포맷팅 및 파싱, 시간 간격 등을 다루는 기능을 제공
    ```go
    package main

    import (
      "fmt"
      "time"
    )

    func main() {
      // 현재 시간
      now := time.Now()
      fmt.Println("Current time:", now)         // 2009-11-10 23:00:00 +0000 UTC m=+0.000000001

      // 시간 파싱
      layout := "2006-01-02 15:04:05"
      timeStr := "2022-01-01 12:30:00"
      parsedTime, _ := time.Parse(layout, timeStr)
      fmt.Println("Parsed time:", parsedTime)   // 2022-01-01 12:30:00 +0000 UTC

      // 포맷팅
      formattedTime := now.Format(layout)       // time.UnixDate
      fmt.Println("Formatted time:", formattedTime) // 2009-11-10 23:00:00
    }
    ```
  + 제공하는 레이아웃
    ```go
    const (
        ANSIC       = "Mon Jan _2 15:04:05 2006"
        UnixDate    = "Mon Jan _2 15:04:05 MST 2006"
        RubyDate    = "Mon Jan 02 15:04:05 -0700 2006"
        RFC822      = "02 Jan 06 15:04 MST"
        RFC822Z     = "02 Jan 06 15:04 -0700" // RFC822 with numeric zone
        RFC850      = "Monday, 02-Jan-06 15:04:05 MST"
        RFC1123     = "Mon, 02 Jan 2006 15:04:05 MST"
        RFC1123Z    = "Mon, 02 Jan 2006 15:04:05 -0700" // RFC1123 with numeric zone
        RFC3339     = "2006-01-02T15:04:05Z07:00"
        RFC3339Nano = "2006-01-02T15:04:05.999999999Z07:00"
        Kitchen     = "3:04PM"
        // Handy time stamps.
        Stamp      = "Jan _2 15:04:05"
        StampMilli = "Jan _2 15:04:05.000"
        StampMicro = "Jan _2 15:04:05.000000"
        StampNano  = "Jan _2 15:04:05.000000000"
    )
    ```
  + 레이아웃 2006-01-02 15:04:05 유래
    ```go
    Mon Jan 2 15:04:05 -0700 MST 2006
    0   1   2  3  4  5              6
    ```
<br/>

### flag
  + flag 패키지는 명령행 인자를 처리하는 데 사용되는 Go 언어의 표준 라이브러리. 이 패키지를 사용하여 프로그램을 실행할 때 명령행에서 전달된 인자들을 파싱하고 처리할 수 있음
    ```go
    package main

    import (
      "flag"
      "fmt"
    )

    func main() {
      var flagHelp bool
      var flagVersion bool

      flag.BoolVar(&flagHelp, "h", false, "도움말")
      flag.BoolVar(&flagVersion, "version", false, "버전")
      flag.StringVar(&flagConfigfile, "c", "config.json", "설정파일")
      flag.StringVar(&flagConfdir, "conf", "../etc/", "설정파일폴더명")
      flag.BoolVar(&flagLogConsole, "console", false, "로그 콘솔출력")
      flag.BoolVar(&flagLogDebug, "debug", false, "debug 로그")
      flag.BoolVar(&flagLogVerbose, "verbose", false, "verbose 로그")
      flag.Parse()

      help := func() {
        fmt.Printf("Usage of %s:\n", os.Args[0])
        fmt.Println(`  -h`)
        fmt.Println(`  도움말`)
        fmt.Println(`  -v`)
        fmt.Println(`  버전`)
        fmt.Println(`  `)
        fmt.Println(`  -c string`)
        fmt.Println(`  설정파일위치`)
      }

      if flagHelp {
        help()
        os.Exit(0)
      }

      if flagVersion {
        fmt.Printf("Component Name: ACRA Point V%s Server Package\n", Version)
        fmt.Printf("Component ReleaseVersion: V%s\n", Build)
        os.Exit(0)
      }
    }
    ```
<br/>

### fmt
  + 포맷된 입출력을 제공하는 표준 패키지 중 하나
  + 출력 함수 - fmt.Println, fmt.Printf (C 언어의 printf와 유사)
    ```go
    package main

    import "fmt"

    func main() {
        name := "Alice"
        age := 30
        fmt.Printf("Name: %s, Age: %d\n", name, age)
    }
    ```
  + 입력 함수 - fmt.Scanf, fmt.Scan, fmt.Scanln (C 언어의 scanf와 유사)
    ```go
    package main

    import "fmt"

    func main() {
        var name string
        var age int
        fmt.Print("Enter name and age: ")
        fmt.Scanf("%s %d", &name, &age)
        fmt.Printf("Name: %s, Age: %d\n", name, age)
    }
    ```
  + 문자열 포맷팅
    ```go
    package main

    import "fmt"

    func main() {
        name := "Bob"
        age := 25
        formattedString := fmt.Sprintf("Name: %s, Age: %d", name, age)
        fmt.Println(formattedString)
    }
    ```

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

### reflect
  + 변수의 타입 정보를 가져오고, 변수의 값에 동적으로 접근하고 수정할 수 있게 하기 위한 내장 라이브러리
    + 타입정보 확인 (reflect.TypeOf)
      ```go
      package main

      import (
        "fmt"
        "reflect"
      )

      func main() {
        var x int
        fmt.Println(reflect.TypeOf(x)) // 출력: int
      }
      ```
    + 값 수정 (reflect.Value)
      ```go
      package main

      import (
        "fmt"
        "reflect"
      )

      func main() {
        var x int = 42
        value := reflect.ValueOf(&x).Elem()

        // 변수의 값을 동적으로 변경
        value.SetInt(10)
        fmt.Println(x) // 출력: 10
      }
      ```
    + relfect로 구조체 필드 태그 읽기 (relfect로 구조체 필드에도 접근 할 수 있음)
      ```go
      package main

      import (
        "fmt"
        "reflect"
      )

      type Person struct {
        Name string `json:"name"`
        Age  int    `json:"age"`
      }

      func main() {
        p := Person{"Alice", 25}
        t := reflect.TypeOf(p)

        // 구조체 필드의 태그 읽기
        for i := 0; i < t.NumField(); i++ {
          field := t.Field(i)
          tag := field.Tag.Get("json")
          fmt.Printf("Field: %s, Tag: %s\n", field.Name, tag)
        }
      }
      ```