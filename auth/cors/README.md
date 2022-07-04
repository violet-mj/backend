
# Cors

- 웹 애플리케이션은 리소스가 자신의 출처(domain, protocol, port)가 다를 때 교차 출처 HTTP 요청을 실행합니다.
- Cors는 Cross-origin resource sharing의 약자로 다른 도메인에 요청을 보내는 것을 가능하게 한다.

  ![img](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/cors_principle.png)

  - 예를 들어, https://domain-a.com의 프론트 코드가 https://domain-b.com/data.json에 요청하는 경우 보안 상의 이유로 브라우저는 스크립트에서 시작한 교차 출처 HTTP 요청을 제한합니다. 이 API를 사용하는 웹 애플리케이션은 자신의 출처와 동일한 리소스만 불러올 수 있으며, 다른 출처의 리소스를 불러오려면 그 출처에서 올바른 CORS 헤더를 포함한 응답을 반환해야 합니다. 
  - 요청을 보낼때 브라우저가 서버로 전송하는 내용을 살펴보고, 서버의 응답을 확인합니다. 아래 요청의 Origin을 보면 https://foo.example로 부터 요청이 왔다는 것을 알 수 있습니다. 서버는 이에 대한 응답으로 `Access-Control-Allow-Origin` 헤더를 자시 전송합니다. 이 경우 서버는 `Access-Control-Allow-Origin: *`을 응답해야하며, 이는 모든 도메인에서 접근할 수 있음을 의미합니다. https://bar.other의 리소스 소유자가 오직 https://foo.example의 요청만 리소스에 대한 접근을 허용하려는 경우 다음을 전송합니다. `Access-Control-Allow-Origin: https://foo.example`
  ``` http
  request
    Origin: https://foo.example

  response 
    Access-Control-Allow-Origin: https://foo.example
  ```

  - 기본적으로 브라우저는 api를 통해 요청을 보낼때 쿠키와 같은 인증정보를 보내지 않는다 여기서 withCredentials=true로 설정하면 브라우저는 쿠키와 함께 요청을 보냅니다. 그러나 쿠키가 존재하는 요청의 경우 `Access-Control-Allow-Credentials=true`가 응답의 헤더에 존재하지 않는다면 브라우저는 응답을 무시합니다. 즉 브라우저에서 쿠키를 포함한 요청을 보낼경우 응답에도 위 헤더를 같이 보내주어야 합니다. 만약 `Cookie`를 포함한 요청을 보낼 때 `Access-Control-Allow-Origin: *`헤더를 보낸다면 브라우저는 응답을 거부합니다. 쿠키를 보낼 경우에는 본래의 주소를 정확히 기재해 주어야합니다.

  1. Access-Control-Allow-Origin
    - 이 헤더는 단일 출처를 지정하여 브라우저가 해당 출처가 리소스에 접근하도록 허용합니다. 또는 자격 증명이 없는 요청의 경우 "*"와일드 카드는 브라우저의 origin에 상관없이 모든 리소스에 접근하도록 허용합니다.



  > nestjs
    
    ``` typescript
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    await app.listen(3000)
    ```
  