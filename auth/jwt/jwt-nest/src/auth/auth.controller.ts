import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { Request } from 'express'

@Controller("/auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(
        @Req() req: Request
    ) {
        return this.authService.login(req.user)
    }

    @Get('/hello')
    authHello() {
        return 'hello'
    }
}