# JWT

> JWT(JSON Web Token)

- JWT는 유저를 인증하고 식별하기 위한 토큰기반 인증이다.
- 토큰이 서버가 아닌 클라이언트에 저장된다.



> ㅇJWT structure

- header, payload, signature로 구성되어 있으며, "."으로 3개의 파트로 나누어 구성되어있다.

  + xxxxxx.yyyyyy.zzzzzz

  

  > Header

  - Base64Url로 인코딩된 부분으로, hash 알고리즘과 토큰의 타입이 명시되어 있다.

    ```javascript
    {
        "alg": "HS256",
        "type": "JWT"
    }
    ```

  > Payload

  - 토큰의 2번째 부분으로, claim (entity(ex. user) 와 추가적인 데이터)가 담겨있다.

  - claim에는 3가지 종류가 있다.

    > Registered claims

    - 미리 정의된 claim의 구성이다. 필수는 아니지만 추천되는 옵션이다.
    - issu(issuer), exp(expiration time), sub(subject), aud(audience) 등이 있다.

    > Public claims

    - JWT에 정해지는 claim, 충돌을 막기위해 충돌 방지 네임스페이스를 uri에 첨부해야한다.

    > Private claim

    - 두 매개체 사이에 동의하여 공유하는 정보를 사용하는 커스텀 claim이다.

    ```json
    {
        "sub": "1234566",
        "name": "John Doe",
        "admin": true
    }
    ```
  > Signature
  
  - 서명을 만들기 위해서는 인코딩된 헤더, 페이로드와 secret이 필요하다.
  - HMAC SHA256으로 서명을 한다고 한다면,
  
  ```javascript
  HMACSHA256(
  	base64UrlEncode(header) + "." +
      base64UrlEncode(payload),
      secret
  )
  ```
  
  - 이 서명는 HTML과 HTTP환경에서 쉽게 보낼 수 있는 "."으로 분리된 base64-URL이다.
  - 이 서명은 private key로 서명되어 있어 JWT를 보낸 송신자가 누구인지 검증할 수 있다.


> How do JWT work?

- 인증에서, 유저가 자격증명을 사용하여 성공적으로 로그가 되었을때, JWT가 반환될 것이다.

- 토큰은 자격 증명이므로 보안 문제를 방지하기 위해 세심한 주의를 기울여야한다. 토큰을 너무 오래 유지하면 안된다.

- 또한, 민감한 정보를 JWT에 담아서도 안된다. payload부분은 단순 base64로 인코딩되어 있으므로 누구나 정보를 들여다 볼 수 있다.

- 유저가 보호된 라우터나 자원에 접근하려고 할때 user는 Authorization의 Bearer Header를 사용하여 JWT를 보내야한다.

  ```
  Authorization: Bearer <token>
  ```

- 이것은 무상태 인가 메커니즘을 이용할 수 있다. 

- 서버의 보호된 라우터는 Authorization 헤더의 유효한 JWT를 확인할 것이다. 만약 전달되면, 유저는 보호된 라우터에 접근할 수 있다. 

- JWT가 필요한 정보를 담고 있다면, 데이터베이스가 해야할 쿼리 명령이 줄어들 것이다. (항상 그런 것은 아니다..)

- JWT가 HTTP를 통해 전달된다면, JWT 토큰이 너무 커지면 안된다. 어떠한 서버는 8KB가 넘는 헤더를 수용하지 않을 수도 있다.

- 많은 정보를 담아서 전달하고 싶다면, Auth0 Fine-Grained Authorization을 사용해라

- 만약 토큰을 Authorization 헤더로 보낼때, CORS는 쿠키를 사용하지 않는 것 때문에 문제가 되지 않을 것이다

> Why should we use JSON Web Tokens?

- JWT vs SWT(Simple Web Token) vs SAML(Security Assertion Markup Language Token)
  - JSON은 XML에 비해 간결하다. 인코딩할 크기가 더 작을때 JWT는 SAML보다 작다.
  - 보안 방면에서도, SWT는 오직 HMAC을 이용하여 공유되는 secret을 대칭 서명만이 가능하다
  - JWT와 SAML은 비대칭키를 갖지만 모호한 보안 구멍을 소개하지 않고 XML에 디지털 사인하는 것은 JSON의 단순성과 비교하기에는 어렵다.
  - XML은 JSON과는 다르게 대부분 프로그래밍 언어의 객체의 형식과는 매우 다르므로 JSON이 사용하기 용이하다.









