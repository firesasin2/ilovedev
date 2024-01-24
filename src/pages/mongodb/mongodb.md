# MongoDB
NoSQL(Not Only SQL) 데이터베이스로 분류되는 문서 지향(Document-Oriented) 데이터베이스(오픈 소스)
<br/>

### MongoDB란?
  + MongoDB is a document database designed for ease of application development and scaling.
<br/>

### 유래
  + 약 10년전까지만 해도 데이터베이스는 관계형 데이터베이스(RDBMS)를 많이 사용
  + 방대한 양의 데이터를 충분히 빠른 속도로 처리 할 수 있는 데이터베이스에 대한 필요성이 대두되기 시작
    + 데이터의 양이 기존의 RDBMS에서 하나의 테이블에 저장되던 데이터를 수십에서 수백 대의 서버로 쪼개야만 처리 할 수 있을 정도로 커짐
    + MySQL은 이때부터 페이스북과 구글, 트위터와 같은 글로벌 기업들에 의해서 엄청난 발전을 거듭하기 시작(오픈소스)
      + 하지만 MySQL로는 부족
    + 구글은 BigTable이라는 NoSQL DBMS가 있었지만 트랜잭션의 처리가 만족스럽지 못했음
<br/>

### 라이선스
  + MongoDB, Inc.에 의해서 개발 및 유지보수되는 오픈 소스 데이터베이스
  + 오픈 코어 라이선스 모델을 채택하고 있음
    + 기본 기능을 모두 오픈 소스로 제공
  + 무료라이선스
    + 직접 소스 코드를 수정하여 MongoDB를 커스터마이징해서 사용 할 수 있음
    + 커뮤니티 버전이 있음
  + 유료 라이선스
    + MongoDB 프로페셔널과 MongoDB 엔터프라이즈가 있음
<br/>

### 버전 업그레이드
  + MongoDB 서버의 버전 업그레이드는 서비를 중지하지 않고, Replica Set 멤버들을 순차적으로 업그레이드 하는 "Rolling Upgrade" 방식을 사용
    1. 모든 Secondary 멤버의 버전 업그레이드
    2. 업그레이드 된 Secondary 멤버와 이전 버전의 Primary 스위칭(Primary Step Down)
    3. 세컨더리가 된 기존 Primary 버전 업그레이드
    + "Rolling Upgrade" 방식을 사용하여 업그레이드 중에는 업그레이드 하려는 상위버전의 기능이 동작하지 않음 (setFeatureCompatibilityVersion 기능)
      + 하나의 Replica Set에 MongoDB 상위 버전과 하위 버전이 공존 할 경우, 상위 버전에서만 지원하는 명령이 수행 될 경우, 하위버전들의 복제가 영구적으로 깨져서 동기화 하지 못 할 수 있음
<br/>

### 특성
  + NoSQL 데이터베이스? (Not Only SQL)
    + MongoDB Connector for BI나 Simba에서 개발한 MongoDB 커넥터를 보면, 여타 RDBMS와 비슷한 SQL을 사용 할 수 있음
    + MongoDB에서는 외래키를 명시적으로 지원하지는 않지만, 논리적으로 문서 간의 관계를 만들어서 사용 할 수 있음
    + MongoDB에서는 $lookup이라는 Aggregation 기능을 제공하여 RDBMS와 비슷한 형태의 조인 쿼리를 수행 할 수 있음
  + 스키마 프리(Schema-Free)
  + 비 관계형 데이터베이스