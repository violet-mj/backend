
# GraphQL

  > REST API

  - 소프트웨어간 정보를 주고받는 방식
  - URI(어떤 정보를) x 요청 방식(어떻게 할 것인가)

  - ### 단점
    - 특정 정보만 필요할 때, 부분적으로 데이터를 가져올 수 없다. 즉, 요청을 보낼 때 REST API에서 정의된 모든 정보를 가져온다. 네트워크 비용이 증가한다.
    - 만약 가져올 데이터가 계층적일때, 즉 필요한 정보를 가져오기 위해 필요한 데이터가 존재할 때 요청을 2번 이상 보내야할 경우가 생긴다. (overfetching)

  > GraphQL 
  
  - graphql은 RESTAPI를 대체할 수 있는 데이터 질의어이다.
  - 클라이언트가 필요한 데이터의 구조를 지정할 수 있으며, 서버는 정확히 동일한 구조로 데이터를 반환한다. 즉, 사용자가 어떤 데이터가 필요한 지 명시할 수 있게 해주는 강타입 언어이다. 불필요한 데이터를 받게 되거나 필요한 데이터를 받지 못하는 문제를 피할 수 있다.

  > Apollo

  - graphql로 데이터를 주고 받을 수 있게끔 만드는 플랫폼 
  - typeDefs, resolvers를 정의함으로써 데이터에 접근할 수 있다.

  ``` javascript
    const { ApolloServer, gpl } = require('apollo-server')
    const database = require(~~~) // mocking database => just array

    const typeDefs = gpl`
      type Query {
        supplies: [Supply]
      }
      type Mutation {
        deleteSupply(id: String): Boolean
      }
      type Supply {
        id: String
        team: Int
      }
    `

    const resolvers = {
      deleteSupply: (parent, args) => {
        const deleted = database.supplies.filter((Supply) => {
          return Supply.id === args.id
        })
        if(deleted.length !== 0) {
          database.supplies.filter((Supply) => {
            return Supply.id !== args.id
          })
          return true
        } else {
          return false
        }
      }
    }


    const server = new ApolloServer({ typeDefs, resolvers})

    server.listen().then(({url}) => {
      console.log(`🔥 server is opened at ${url}`)
    })
  ```
  - typeDef에는 기본적으로 데이터를 조회할 수 있는 Query, 데이터를 수정, 삭제가 가능한 Mutation과 custom type으로 구성되어 있다. 
  - resolvers에는 typeDefs의 Mutation action의 구현부이다.

  - typeDefs, resolvers 모두 배열도 가능하므로, 여러 파일에 모듈화시켜 구현한 후 메인 파일에서 합칠 수 있다.

  > GraphQL의 Type
    
  | type    | description                               |
  | -----   | -----------                               |
  | ID      | 기본적으로는 String이나, 고유 식별자 역할임을 나타냄 |
  | String  | UTF-8 문자열                                |
  | Int     | 부호가 있는 32bit 정수                        |
  | Float   | 부호가 잇는 부동소수점 값                       |
  | Boolean | 참/거짓                                    |

  ### !: NOT NULL
  



