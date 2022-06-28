import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { Request } from 'express'
import { Roles } from "../roles/roles.decorator";
import { Role } from "../roles/roles.enum";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { RolesGuard } from "src/roles/roles.guard";

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
    
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    @Get('/hello')
    authHello(
        @Req() req: Request
    ) {
        console.log(req.user)
        return 'hello'
    }
}