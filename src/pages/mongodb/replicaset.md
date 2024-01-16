# Replica Set
<br/>

### 멤버
  + 하나의 MongoDB Replica Set에는 최대 50개 까지의 멤버가 복제에 참여 할 수 있음
  + Primary 멤버 선출에 참여 할 수 있는 멤버는 7개 까지만 가능 (Primary 선출 작업 또한 복잡한 과정을 거침)
  + 각 멤버는 하트비트로 서로의 상태를 수집,감시 함 (멤버가 많으면 많을수록 서로의 상태 모니터링에 더 큰 비용 소모)
<br/>

### Primary
  + 데이터 변경을 처리 할 수 있는 유일한 멤버
  + 변경된 데이터를 OpLog에 기록
  + Primary가 네트워크 단절이나 서버 과부하로 응답 불가능 상태가 되면, Secondary들이 Primary의 상태를 계속 체크하고 있기 때문에 Primary가 없어진 것을 즉기 알아차리고 새로운 Primary를 선출하기 위해 투표함 
<br/>

### Secondary
  + Secondary 멤버는 Primary 멤버가 처리한 변경 데이터를 실시간으로 가져와서 Primary와 동일한 데이터 셋을 유지
  + Primary가 응답 불가능 상태가 되면, 투표를 통해서 Secondary 중 하나가 Primary 됨 (Promotion or Step-up)
  + 쿼리의 분산 용도로 사용하기도 함
  + "hidden" Replica Set 옵션을 사용해서 Secondary로 접속하지 못하게 막을 수 있음

### Arbiter
  + Primary 선출에 관여
  + 데이터를 복제하지 않음
  + OpLog를 복제하지 않음

### Replica Set
  + 반드시 과반수 이상의 멤버가 투표해서 승인을 얻어야 Primary를 선출 할 수 있음