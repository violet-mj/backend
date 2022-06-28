# authorization

- authorization(인가)는 누군가에게 무언가를 할 수 있는 권한을 주는 것이다. 
    - 예를 들면, linux의 권한 부여 또는 쇼핑몰의 관리자 권한 등, 특정 유저만 접근할 수 있도록 할 수 있다.

> implementation
 
- Role-based access control(RBAC)는 규약 중립적 접근제어 메커니즘이다.

``` javascript
export enum Role {
	User = 'user',
	Admin = 'admin',
}
```

> case nestjs

- controller의 모듈에 그 권한에 관련된 메타데이터를 주입한다.

``` javascript
export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => setMetadata(ROLES_KEY, roles)

-----------------------------------------------------------------------------

cats.controller.ts

// 특정 권한(Admin)만 접근할 수 있는 라우터
@Post()
@Roles(Role.Admin)
create(@Body() createCatDto: CreateCatDto) {
	this.catsService.create(createCatDto)
}

```

이제 create 라우터는 관리자만 접근할 수 있다.

<strong>이런 방식으로 라우터에 특별 권한을 가진 유저만 접근할 수 있는 라우터를 만들 수 있다.</strong>

> RBAC implement

-  passport-local을 이용하여 로그인 후 jwt 토큰을 얻어온다. => 여기서 password를 제외한 모든 정보를 필요한 부분만 추출해 jwt의 payload에 담는다
  -  LocalAuthguard를 통해 passport.authenticate('local', authenticateCallback)을 실행한다. 이 과정에서 자신이 정의했던 localStrategy callback 함수를 호출하고 그 결과를 authenticate의 authenticateCallback의 인자로 넣어준다 err가 발생하면 이 라이프사이클을 끝내고 err를 반환하며 데이터가 반환되면 req.user에 그 값을 넣어준다.

```
	@UseGuard(LocalAuthGuard)
	@Post('/login')
	login(
		@Req() req: Request
	) {
		return this.authService.login(req.user)
	}
```
   
-  우리가 필요한 부분은 username, role이다. username을 통해 어떤 유저가 로그인 중인지 판별하고 role을 통하여 user의 권한을 알 수 있다. jwtStrategy를 통해 인증된 정보를 req.user에 담는다. ( 이 작업은 nestjs/passport 라이브러리에서 수행한다.)

```
    @UseGuards(RolesGuard) // 4
    @UseGuards(JwtAuthGuard) // 3 
    @Roles(Role.Admin) // 2 
    @Get('/hello') // 1 
    authHello(
        @Req() req: Request
    ) {
        console.log(req.user)
        return 'hello'
    }
```
- decorator는 모듈의 위치에서 가까운 순서로 실행된다. 