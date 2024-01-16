
# 빌드
<br/>

### make clean - high quality and fast image
<br/>

### make install
<br/>

### wauth (-B)
<br/>

### go run main.go
<br/>

### go build -o
  + go build -o wauth
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