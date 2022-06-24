# JWT life cycle



<img src="https://blog.larapulse.com/files/original/images/d5/ed/d5ed69580276e6813a99d18b87a1cc5796f37aae.png" />

1. Client가 인증정보를 보내 서버가 유효한 인증 정보인지 확인 후 JWT를 부여합니다.
   - 예를 들면 3000번 포트에 auth서버에 로그인 정보를 보내고 정보가 유효하다면 jwt(AccessToken, RefreshToken)를 보내줍니다

2. Client는 인가가 필요한 정보를 api에서 얻을 때 마다 JWT를 보냅니다. reSource서버는 이 토큰이 유효한지 판별한 후 보호되어있는 정보를 보내줍니다.
3. 하지만 AccessToken의 경우 탈취 될 수 있으므로 짧은 기간만 사용가능 하며 그 이후에는 파기됩니다. 그럴 경우 RefreshToken을 auth서버에 보내 새로운 AccessToken을 발급 받습니다.



> Doubt about JWT 

- ##### why jwt use refresh token?

  - 만약 A와 B가 있다고 생각해보자, A는 실제 토큰을 발급 받은 클라이언트이고, B는 토큰을 가지고 있지 않은 공격자이다. 여기서 B가 어떤 방법으로든 A의 토큰을 탈취하게 된다면, B는 A사용자로 위장하여 서버의 api에 접근할 수 있다. (B가 A의 토큰만을 이용하여 인가가 필요한 서버에 접근 할 수 있는 이유는 기본적으로 서버는 REST API구조이기 때문인데, 이 구조 특정상 상태를 저장하지 않기 때문에 그 사용자가 누구인지 알 수 없으며 토큰만을 확인하여 사용자를 확인하기 때문이다.) 
  - 여기서 Refresh 토큰이 도입되는데, 데이터 베이스는 access Token과 refreshToken을 동시에 저장한다. client A는 데이터 베이스에 저장되어 있는 accessToken을 가지고 있다. 만약 B가 refreshToken을 탈취하면 어떻게 될까? B는 refreshToken을 이용하여 AccessToken을 발급받는다. 그러나 B가 이 AccessToken으로 api 서버에 요청을 보낼때 서버는 데이터 베이스가 가지고 있는 AccessToken과 다르다는 것을 판단하고 두 토큰을 만료시킨다. 이런 방식으로 클라이언트를 보호한다.
  - 하지만 보안에 100%는 없다. AccessToken과 RefreshToken이 동시에 탈취되면 B는 진짜 사용자 인양 api 서버를 이용할 수 있다.







> 출처

- https://blog.larapulse.com/web/jwt