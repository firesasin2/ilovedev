# Replica Set
<br/>

### 복제
  + 여러 서버가 서로의 데이터를 동기화 하는 것
  + MongoDB의 복제 목적
    + High Availability(고가용성) - Replica Set의 특정 멤버에서 데이터 손실이 발생하더라도 다른 멤버의 데이터로 대체 할 수 있도록 하기 위함
    + 데이터 조회 쿼리의 로드 분산
  + MongoDB는 논리 복제를 제공함
  + MongoDB는 MySQL 서버의 복제와 아주 비슷한 형태의 복제 기능을 제공함
  + MongoDB에는 Replica Set 복제 방식과 Master-Slave 복제 방식이 있지만 Master-Slave 복제 방식은 권장하지 않음
    + Master-Slave 복제 방식은 Fail-Over를 수동으로 처리해야 함
    + 최근 Master-Slave 복제 방식은 기능이 개선되거나 보완되지 않음
<br/>

### 멤버
  + 하나의 MongoDB Replica Set에는 최대 50개 까지의 멤버가 복제에 참여 할 수 있음
  + Primary 멤버 선출에 참여 할 수 있는 멤버는 7개 까지만 가능 (Primary Election 작업 또한 복잡한 과정을 거침)
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
<br/>

### Arbiter
  + Primary 선출에 관여
  + 데이터를 복제하지 않음
  + OpLog를 복제하지 않음
<br/>

### Replica Set
  + 반드시 과반수 이상의 멤버가 투표해서 승인을 얻어야 Primary를 Election 할 수 있음
  + 하나의 Replica Set에서 HA를 보장하기 위해서는 최소 3개 이상의 멤버가 필요
    + 3대의 서버가 부담이 되는 경우, Primary + Primary Stand-by Member(Secondary) + Arbiter(가상서버 or 공용 서버)로 구성 할수도 있음
<br/>

### Primary Election
  + Replica Set에 현재 Primary가 없으면 Primary를 선출함 (다른 경우는 없음)
    + Replica Set에 설정된 electionTimeoutMillis 내에 Primary가 응답이 없다면, Primary가 없어졌다고 판단
  + Replica Set 멤버들은 Primary가 없어진 것을 알아채면, 즉시 새로운 Primary를 선출한다.
  + Primary Term (또는 Vote Identifier) (Protocol Version 1)
    + 투표 식별자이며, Replica Set의 각 멤버들이 Primary 선출을 시도 할 때마다 1씩 증가하는 논리적인 시간 값
    + Replica Set의 멤버들은 그 투표의 식별자를 기준으로 자기가 이미 투표를 했는지 아니면 다시 투표에 참여해야 하는지 결정 할 수 있음
<br/>

### Primary Step Down
  + 명령을 이용해 관리자가 의도적으로 기존의 Primary를 Secondary로 내리는(Stop Down) 작업
    + rs.stepDown(stepDownSec, secondaryCatchUpPeriodSecs)
      + Primary에서만 실행가능
      + stepDownSec에 지정된 시간동안 다시 Primary가 될 수 없음
      + 최대 secondaryCatchUpPeriodSecs에 지정된 시간동안 새로운 Primary 선출을 하지 않고 기다림
        + 밀려있던 복제가 동기화되기를 기다리기 위함
        + secondaryCatchUpPeriodSecs에 지정된 시간동안 계속 기다리는 것은 아님(밀려있던 복제가 동기화되면 더 빨리 Primary Election)
    + rs.reconfig()
      + Replica Set 멤버들의 Priority 변경
    + MongoDB 서버 내부적으로 rs.stepDown()과 rs.reconfig()의 처리 로직은 거의 동일
      + 하나의 차이점은 rs.reconfig()시에는 rs.stepDown(60, 10, true)를 실행함 (마지막 true옵션은 강제옵션)
