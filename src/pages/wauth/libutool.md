
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