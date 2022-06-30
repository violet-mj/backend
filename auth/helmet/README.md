
# Helmet

- helmet 라이브러리는 express 웹서버에 다양한 http header를 설정해준다. 

- helmet 함수는 다음 15가지 미들웨어를 실행시킨다.

``` javascript
app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard()); // default: sameorigin
app.use(helmet.hidePoweredBy()); // X-Powered-By 헤더를 숨긴다.
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
```

> contentSecurityPolicy

 - CSP는 여러 공격에 대해서 탐지하고 완화시킨다.
    - 예를 들면, Cross-site Scripting(XSS), data injection attack 등이 있다.
    - 사이트가 CSP를 제공하지 않는다면 same-origin policy를 사용한다.

    - ##### 적용방법 
      - 웹서버의 응답에 Content-Security-Policy header를 추가한다.
      - `<meta>`tag에 Content-Security-Policy를 추가한다
      ``` html
        <meta http-equiv="Content-Security-Policy" 
            content="default-src 'self'; img-src https://*; child-src 'none';">
      ```  
      - 프론트 서버에서 CSP 헤더에 허가되는 domain에서만 자원을 가져올 수 있다.

> crossOriginEmbedderPolicy

  - unsafe-none: 교차 출처 리소스들을 들고 올 수 있다.
  - require-corp cors가 설정되지 않은 리소스를 들고 오지 못하도록 한다

> crossOriginOpenerPolicy
  
  - 교차 출처 문서는 현재 브라우저의 컨텍스트 그룹을 공유하지 않는다는 규칙이다.

    - unsafe-none: 팝업 창을 이용하더라도 현재 브라우저의 컨텍스트 그룹을 공유함
    - same-origin: 자신의 문서가 아닌 모든 사이트는 컨텍스트를 공유하지 않음

> dns-prefetching
  
  - 다른 도메인에 연결할 때 해당 dns에 대한 handshake를 미리 수행하여 리소스 요청에 있어서 수행 시간을 줄이는 방법이다.

> frameGuard
  
  - `<frame> <iframe>` 태그를 실행할 수 있는지에 대한 여부를 결정하는 헤더
    - deny: 모든 프레임 태그를 거부한다.
    - sameorigin: 같은 출처의 프레임 태그만 허가한다.

> HSTS(HTTP Strict Transport Security)
 
  - HTTPS protocol로만 접속하게 하는 기능

  - 해커와 같은 공격자가, 중간자 공격을 하여 중간에 Proxy Server를 두고 사용좌와는 HTTP 통신을 하고, 실제 Site와는 HTTPS 통신을 해도 사용자는 전혀 인식을 하지 못한다. 즉 사용자가 실제 Site와 주고 받는 모든 정보는 공격자에게 노출이 됨. 이러한 공격을 'SSL Stripping' 공격이라고 부름, 이러한 공격을 막기위해 HSTS를 이용한다.


> ienoopen
  - 오래된 버저의 internet explorer가 악성 html file의 js가 실행되는 것을 막아줍니다.

> noSniff
  - 브라우저가 보안에 영향을 미칠 수 있는 MIME 타입 유형을 추측하는 것을 막아줍니다.
 
    ``` http
      X-Content-Type-Options: nosniff
    ```

    > mime type

    - 클라이언트에게 전송된 문석의 다양성을 알려주기 위한 메커니즘입니다. : 웹에서 파일의 확장자는 별 의미가 없습니다. 그러므로 각 문서의 올바른 MIME 탕입을 전송하도록, 서버가 정확히 설정하는 것이 중요합니다. 브라우저들은 리소스를 내려 받았을 때 해야 할 기본 동작이 무엇인지를 결정하기 위해 대게 MIME 타입을 사용합니다.

    - 즉 일반 텍스트 파일의 javascript 코드를 실행할 경우 브라우저에서 차단한다. => js 코드를 실행할때 다른 확장자로 들어온 js 파일은 차단한다.

> Origin-Agent-Cluster

  - 같은 사이트지만 cross-origin간의 동기적 스크립트 접근을 방지한다. 예를 들어 mainsite.com 내부의 chat.mainsite.com간의 리소스 독립성을 두어 서로 간의 영향이 가지 않도록 하는 옵션이다. 


> Permit-cross-domain-policy
 
  - 웹 클라이언트가 도메인을 넘어 데이터를 다룰수 있는 지에 대한 정책 파일이 허용 되었는지에 대해 명시한다.

> Referrer Policy

  - Referer 헤더에 얼마나 많은 정보를 담을지 지정하는 정책
    - Referer: 현재 요청을 보낸 페이지의 절대 혹은 부분 주소를 포함합니다. 만약 링크를 타고 들어왔다면 해당 링크를 포함하고 있는 페이지의 주소가, 다른 도메인에 리소스 요청을 보내는 경우라면 해당 리소스를 사용하는 페이지의 주소가 이 헤더에 포함됩니다. `Referer` 헤더는 사람들이 어디로부터 와서 방문 중인지를 인식할 수 있도록 해주며 해당 데이터는 분석, 로깅, 캐싱 최적화에 사용됨
      - 즉 어떤 사이트에서 요청을 보냈는지 확인할 수 있다.

> X-Xss-Protection

  - xss 공격이 예상되는 코드를 제거한다.

    - 0: 이 헤더를 비활성화한다.
    - 1: 이 헤더를 활성화함.
    - 1;report=<Report-url>: 공격 감지시 report-url에 보고한다.
    - 1;mode=block: 공격 감지시 렌더링을 중단한다.
