
# libutool.go
libutool은 util함수. 모든 Repositories에서 사용함
<br/>

### enc.go
  + 모든 암호화 함수는 국가용 보안요구사항 3를 따름(CC인증)
  + salt 생성 함수
    + pbkdf2를 호출 할때 사용
    + Salt()
      ```go
      func Salt(size int) ([]byte, error) {

        seed := make([]byte, MaxEntropyBytes)
        _, err := rand.Read(seed)
        if err != nil {
            return []byte{}, ErrorStack(err)
        }

        rng, err := NewHmacDrbg(256, seed, nil)
        if err != nil {
            return []byte{}, ErrorStack(err)
        }

        gen := make([]byte, size)
        rd := NewHmacDrbgReader(rng)
        _, err = rd.Read(gen)
        if err != nil {
            return []byte{}, ErrorStack(err)
        }

        // 국가용 보안요구사항 V3 : 메모리 덮어쓰기
        for _, v := range []byte{0, 0, 0, 0, 0} {
            for i := 0; i < len(gen); i++ {
                gen[i] = v
            }
            for i := 0; i < len(seed); i++ {
                seed[i] = v
            }
        }

        return gen, nil
      }
      ```
  + AES256 CTR 복호화 함수
    + DecodeBase64AndAES256CTRDecrypt()
      ```go
      func DecodeBase64AndAES256CTRDecrypt(key string, data string) ([]byte, error) {

        ciphertext, err := base64.StdEncoding.DecodeString(data)
        if err != nil {
            return []byte{}, err
        }

        block, err := aes.NewCipher([]byte(key))
        if err != nil {
            return []byte{}, err
        }

        if len(ciphertext) < aes.BlockSize {
            return []byte{}, ErrorStack(fmt.Errorf("ciphertext too short"), "E_DEFT_0000")
        }

        // Extract the IV from the ciphertext
        iv := ciphertext[:aes.BlockSize]
        ciphertext = ciphertext[aes.BlockSize:]

        stream := cipher.NewCTR(block, iv)

        plaintext := make([]byte, len(ciphertext))
        stream.XORKeyStream(plaintext, ciphertext)

        // 국가용 보안요구사항 V3 : 메모리 덮어쓰기
        for _, v := range []byte{0, 0, 0, 0, 0} {
            for i := 0; i < len(iv); i++ {
                iv[i] = v
            }
            for i := 0; i < len(ciphertext); i++ {
                ciphertext[i] = v
            }
            key = strings.Repeat(fmt.Sprintf("%v", v), len(key))
        }

        return plaintext, nil
      }
      ```
  + 해시값 생성 함수
    + Pbkdf2Hash64()
        ```go
        func Pbkdf2Hash64(data []byte) (string, error) {
            salt, _ := Salt(SaltSize)
            key := pbkdf2.Key([]byte(data), salt, 1000, 32, sha256.New)

            hash := append(key, salt...)
            hash64 := base64.StdEncoding.EncodeToString(hash)

            // 국가용 보안요구사항 V3 : 메모리 덮어쓰기
            for _, v := range []byte{0, 0, 0, 0, 0} {
                for i := 0; i < len(key); i++ {
                    key[i] = v
                }
                for i := 0; i < len(salt); i++ {
                    salt[i] = v
                }
            }

            return hash64, nil
        }
        ```
  + 해시값 비교 함수
    + ComparePbkdf2Hash64()
        ```go
        func ComparePbkdf2Hash64(data []byte, hash64 string) error {
            hash, err := base64.StdEncoding.DecodeString(hash64)
            if err != nil {
                return err
            }

            if len(hash) != 32+SaltSize {
                return fmt.Errorf("the length of hash must be 48")
            }
            _ = hash[:len(hash)-SaltSize]
            salt := hash[len(hash)-SaltSize:]

            key := pbkdf2.Key([]byte(data), salt, 1000, 32, sha256.New)
            rehash := append(key, salt...)

            if !bytes.Equal(hash, rehash) {
                return fmt.Errorf("not equal")
            }

            // 국가용 보안요구사항 V3 : 메모리 덮어쓰기
            for _, v := range []byte{0, 0, 0, 0, 0} {
                for i := 0; i < len(key); i++ {
                    key[i] = v
                }
                for i := 0; i < len(salt); i++ {
                    salt[i] = v
                }
            }

            return nil
        }
        ```
<br/>

### file.go
  + 해당 경로에 파일이 있는지 확인하는 함수
    ```go
    func IsFile(path string) bool {
        if st, err := os.Stat(path); err == nil {
            return !st.IsDir()
        }
        return false
    }
    ```
  + 해시생성 함수
    ```go
    func (s *FileSum) Make(file string) error {
        body, err := os.ReadFile(file)
        if err != nil {
            return err
        }
        if len(body) == 0 {
            return fmt.Errorf("파일크기없음")
        }

        pbk, err := Pbkdf2Hash(body)
        if err != nil {
            return err
        }

        sum := file + ".sum"
        err = os.WriteFile(sum, pbk, 0600)
        if err != nil {
            return err
        }

        err = s.H.Make(sum)
        if err != nil {
            return err
        }
        return nil
    }
    ```
  + 해시검사 함수
    ```go
    func (s *FileSum) Has(file string) error {
        sum := file + ".sum"
        err := s.H.Has(sum)
        if err != nil {
            return err
        }

        b, err := os.ReadFile(sum)
        if err != nil {
            return err
        }
        if len(b) <= s.H.LenHash {
            return fmt.Errorf("해시길이짧음")
        }
        sumbody := b[:len(b)-s.H.LenHash]

        origin, err := os.ReadFile(file)
        if err != nil {
            return err
        }

        return ComparePbkdf2Hash(origin, sumbody)
    }
    ```
<br/>

### error.go
  + 아래와 같이 ErrorStack을 사용하여 기본 Error에 추가 정보를 더함
  + ErrorStack()
    ```go
    func ErrorStack(err interface{}, param ...interface{}) error {
        _, fn, line, _ := runtime.Caller(1)
        f := path.Base(fn)
        f = strings.TrimSuffix(f, ".go")

        le := LineError{Timestamp: time.Now().Unix(), File: f, Line: line}
        switch terr := err.(type) {
        case string:
            var note string
            if len(param) > 0 {
                note = fmt.Sprintf(terr, param...)
            } else {
                note = terr
            }
            note = strings.TrimSpace(note)

            le.Err = nil
            le.Note = note

        case error:
            var note string
            if len(param) > 0 {
                note = fmt.Sprintf(fmt.Sprintf("%v", param[0]), param[1:]...)
            }
            note = strings.TrimSpace(note)

            le.Err = terr
            le.Note = note

        case nil:
            var note string
            if len(param) > 0 {
                note = fmt.Sprintf(fmt.Sprintf("%v", param[0]), param[1:]...)
            }
            note = strings.TrimSpace(note)

            le.Err = nil
            le.Note = note
        }

        return &le
    }
    ```

### logging.go
  + Debugln 함수
    ```go
    // LogLevel : LogLevel 대한 고유이름
    type LogLevel int

    // Debugln : format된 debug 로깅
    func (l *Logging) Debugln(param ...interface{}) {
        if l == nil {
            return
        }
        if l.isDebug {
            l.writeln(Debug, param...)
        }
    }

    func (l *Logging) writeln(level LogLevel, param ...interface{}) {
        _, fn, line, _ := runtime.Caller(2)
        fn = strings.TrimSuffix(fn, ".go")
        f := strings.Split(fn, "/")
        s := fmt.Sprintln(param...)

        w := fmt.Sprintf("%s [%s:%d] %s", level.String(), f[len(f)-1], line, s)
        // 콘솔 출력이 설정되어 있다면, 콘솔에도 출력
        if l.hasConsole {
            log.Printf("%s", w)
        }

        l.send(level, w)
    }

    // send : 가장 낮은 수준의 쓰기함수이다.
    func (l *Logging) send(level LogLevel, text string) {
        // 락
        l.Mutex.Lock()
        defer func() {
            //Fatal 이면 프로세스를 강제 종료시킬 것이므로 Unlock해줄 필요없다.
            if level == Fatal {
                time.Sleep(100 * time.Millisecond)
                os.Exit(1)
            } else {
                l.Mutex.Unlock()
            }
        }()

        if len(l.file) > 0 {
            if l.maxSize > 0 && l.curSize > l.maxSize {
                l.backup()
                l.archive()
            }
            if l.dest != nil {
                l.curSize = l.curSize + 20 + int64(len(text)) + 1
                l.dest.Printf(text)
            }
        }
    }
    ```