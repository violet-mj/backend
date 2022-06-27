# nest-jwt

> passport

- passport는 인가와 인증을 도와주는 라이브러리이다


passport는 express 기반의 미들웨어이다. passport는 다양한 인증 방법을 제공하는데. local 뿐만아니라 google, naver, facebook 등 다양한 제공자들을 통해 인증할 수 있도록 도와준다. 

> life cycle  
 
 
1. passport.use를 통해 passport 인스턴스에 strategy를 등록한다. 
2. passport.athenticate를 통하여 등록된 strategy를 실행시킨다. (strategy의 인자는 req.body나 req.query를 통하여 받는다). 또한 serialize를 통해 필요한 정보만 session에 담는다.
3. passport는 passport.session() 미들웨어를 통하여 세션에서 데이터를 가져와서 db에 필요한 정보를 다시 가져오면서 req.user에 데이터를 넣는다.


> nest-passport
 
- passportStrategy는 strategy를 유동적으로 사용할 수 있는 모듈입니다. passportStrategy는 abstract class로 구성되어 있는데 strategy를 import하고 validate에 strategy에 해당하는 인자를 넣어서 구현한다. 이 인자는 strategy 콜백함수의 인자가 된다.

- @UseGuard 데코레이터를 이용하여 passport에 저장되어있는 strategy를 사용한다.