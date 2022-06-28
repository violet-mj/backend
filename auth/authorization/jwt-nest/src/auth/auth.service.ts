import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username)
        if(user && user.password === pass) {
            const {password, ...result } = user
            return result  
        }

        return null
    }

    // jwt Access Token 생성함수
    async login(user: any) {
        const payload = {username: user.username, sub: user.userId, role: user.role}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }


}
