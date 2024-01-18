
# libinfo
libinfo는 모든 구조체를 정의한 함수. 모든 Repositories에서 사용함
<br/>

### wauth.go
  + 관리자 구조체
    ```go
    type Admin struct {
        Mandantory bool `json:"Mandantory" bson:"Mandantory" update:"false" history:"false" cchistory:"false" ko:"Mandantory"`

        ID   string `json:"ID" bson:"ID" validate:"string" update:"false" ko:"아이디"`
        Name string `json:"Name" bson:"Name" update:"true" ko:"이름"`

        OU               string `json:"OU,omitempty" bson:"OU,omitempty" update:"true" ko:"조직"`
        Title            string `json:"Title,omitempty" bson:"Title,omitempty" update:"true" ko:"직함"`
        DepartmentNumber string `json:"DepartmentNumber,omitempty" bson:"DepartmentNumber,omitempty" update:"true" ko:"내선번호"`
        AdminRole_ID     string `json:"AdminRole_ID,omitempty" bson:"AdminRole_ID,omitempty" update:"true" ko:"관리자역할 아이디"`
        AdminRole_Name   string `json:"AdminRole_Name,omitempty" bson:"AdminRole_Name,omitempty" ko:"관리자역할 이름"` // read-only
        Mobile           string `json:"Mobile,omitempty" bson:"Mobile,omitempty" validate:"string,regex='^(\\+|[0-9\\-])+$'" update:"true" ko:"휴대폰번호"`
        Mail             string `json:"Mail,omitempty" bson:"Mail,omitempty" validate:"string,regex='^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+$'" update:"true" ko:"이메일"`
        Description      string `json:"Description,omitempty" bson:"Description,omitempty" update:"true" ko:"설명"`

        IPAddresses []string `json:"IPAddresses,omitempty" bson:"IPAddresses,omitempty" update:"true" ko:"로그인 주소"`

        Status                         bool   `json:"Status" bson:"Status" validate:"required" update:"false" ko:"상태"` // true이면 정상, false이면 잠김
        LockReason                     string `json:"LockReason,omitempty" bson:"LockReason,omitempty" update:"false" ko:"잠금사유"`
        ForceChangePwd                 bool   `json:"ForceChangePwd,omitempty" bson:"ForceChangePwd,omitempty" update:"true" ko:"비밀번호 강제변경"`
        CreateTimestamp                int64  `json:"CreateTimestamp" bson:"CreateTimestamp" update:"false" ko:"생성 시간"`
        WebLastAccessTimestamp         int64  `json:"WebLastAccessTimestamp" bson:"WebLastAccessTimestamp" validate:"int" update:"false" ko:"웹 마지막 로그인 성공시간"`
        NumLogonAttempt                int    `json:"NumLogonAttempt,omitempty" bson:"NumLogonAttempt,omitempty" update:"false" ko:"잘못된 로그인 시도횟수"`
        NumLogonAttemptUpdateTimestamp int64  `json:"NumLogonAttemptUpdateTimestamp" bson:"NumLogonAttemptUpdateTimestamp" update:"false" ko:"잘못된 로그인 시도횟수 변경 시간"`
        PasswordLastChangedTimestamp   int64  `json:"PasswordLastChangedTimestamp" bson:"PasswordLastChangedTimestamp" validate:"int" update:"false" ko:"마지막 비밀번호변경 시간"`

        TimeClass_ID string     `json:"TimeClass_ID,omitempty" bson:"TimeClass_ID,omitempty" ko:"시간유형 아이디" update:"false"`
        TimeClass    *TimeClass `json:"TimeClass,omitempty" bson:"TimeClass,omitempty" ko:"시간유형" update:"false"`

        WebLoginSuspendUntilTimestamp int64 `json:"WebLoginSuspendUntilTimestamp,omitempty" bson:"WebLoginSuspendUntilTimestamp,omitempty" update:"false" ko:"웹 일시잠금 기한"`
        IsSuspended                   bool  `json:"IsSuspended" bson:"-" ko:"일시잠금"` // readonly

        //Privilege가 필요한 경우
        OfflineSecret                     string `json:"OfflineSecret,omitempty" bson:"OfflineSecret,omitempty" update:"false" ko:"고정토큰" cchistory:"false" ccko:"OTP"`                     //fix string
        OnlineSecret                      string `json:"OnlineSecret,omitempty" bson:"OnlineSecret,omitempty" update:"false" cchistory:"false" ko:"모바일토큰"`                                 //mobile
        OfflineSecretLastChangedTimestamp int64  `json:"OfflineSecretLastChangedTimestamp" bson:"OfflineSecretLastChangedTimestamp" update:"false" ko:"고정토큰 마지막 변경시간" ccko:"OTP 마지막 변경시간"` //fix string
        OnlineSecretLastChangedTimestamp  int64  `json:"OnlineSecretLastChangedTimestamp" bson:"OnlineSecretLastChangedTimestamp" update:"false" cchistory:"false" ko:"모바일토큰 마지막 변경시간"`    //mobile

        Password     string   `json:"Password" bson:"Password" update:"false" ko:"비밀번호" history:"false" cchistory:"false"`
        OldPasswords []string `json:"OldPasswords,omitempty" bson:"OldPasswords,omitempty" update:"false"  ko:"과거 비밀번호"  history:"false" cchistory:"false"`
    }
    ```
    + json: GO에서 사용되는 JSON과 매칭되는 필드명 이름
      + omitempty: 비어있다면, 해당 필드를 생략
    + bson: MongoDB와 매칭되는 필드명 이름
      + omitempty: 비어있다면, 해당 필드를 생략
    + update: 웹에서 요청시, 해당 필드 수정 가능한지 여부 (update가 "true이면" 웹에서 수정 가능)
    + history: 이력에 기록을 남길지 여부 (history가 "true이면" 이력에 남김)
      + cchistory: (CC에서만) 이력에 기록을 남길지 여부
    + ko: 한글화
      + ccko: (CC에서만) 한글화
    + validate: 해당 정규표현식으로 검사