# NEST-GRAPHQL

graphql은 존재하는 데이터에 쿼리를 수행할 수 있는 강력한 쿼리 언어이다. REST API와 마찬가지로 API를 구현할 수 있다. 

graphql은 기본적으로 3가지 명령어들을 지원한다.

1. Query (it is similar to GET Method in REST API)
2. Mutation (it is similar to POST, PUT, PATCH in REST API)
3. Subscription ( it is useful for real-time service)



<br>

nestjs에서는 2가지 방식으로 쿼리를 다룰 수 있다. <br> 

- code first 
- schema first

다음 링크에 자세히 나와있다 => <strong>[graphql-query](https://docs.nestjs.com/graphql/resolvers#schema-first)</strong>

---

> graphql arguments

1. root: @Root()나 @Parent()를 통해 접근할 수 있으며 top-level인 Query필드를 가리킨다.
2. context: 특정 쿼리에 모든 resolvers가 공유되어 있는 객체를 말함, 보통 per-request 상태가 사용된다.
3. info: 쿼리의 실행 상태에 관한 정보들이 담겨있는 객체
4. args: query 필드의 인자를 가리킴

> Directive

우리가 쿼리를 통해 정보를 가져올때 똑같은 동작이라 하더라도 필요한 요청도 있지만 필요하지 않은 정보가 있을 수 도 있다. 이런 경우에 Directive를 이용하여 그 필드의 데이터를 가져올 것인지 아닌지 판단하도록 할 수 있다. 즉, 동적 쿼리를 수행하도록 도와주는 명령어. 예를 들어, UI Component에서 간단히 보기와 자세히 보기라는 기능이 나누어져 있을 수 있다. 이 경우에 한 쿼리문으로 이 두 동작을 나누기위해 <strong style="color:red">Directive</strong> 를 사용할 수 있다.