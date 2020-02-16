import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userReposity: Repository<User>
    ) {}

    createUser() {
        return this.userReposity.create({
            name: '123',
            password: '123'
        })
    }
}
