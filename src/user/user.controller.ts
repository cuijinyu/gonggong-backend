import { Controller, Get, HttpService, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private UserService: UserService
    ) {}
    @Get()
    getUser() {
        return [1, 2, 3]
    }

    @Get('/create')
    @HttpCode(HttpStatus.OK)
    createUser() {
        return this.UserService.createUser();
    }
}
