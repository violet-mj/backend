import { Injectable } from '@nestjs/common';

export type User = any

@Injectable()
export class UsersService {
    // Mocking db
    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: '1234',
            role: ['admin', 'user']
        },
        {
            userId: 2,
            username: 'maria',
            password: '2345',
            role: ['user']
        }
    ]

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username)
    }
}
