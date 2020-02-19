import {
  Controller,
  Get,
  HttpService,
  HttpStatus,
  HttpCode,
  Post,
  Param,
  Body,
  Query,
  UseFilters,
  UnauthorizedException,
  Req,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UnauthorizedFilter } from '../filter/unauthorized.filter';
import { request } from 'express';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  @Get()
  getUser() {
    return [1, 2, 3];
  }

  @Post('/create')
  @HttpCode(HttpStatus.OK)
  createUser(@Body() body) {
    const { name, password } = body;
    const user = this.UserService.createUser({
      name,
      password,
    });
    return {
      success: true,
      data: user,
    };
  }

  @UseFilters(UnauthorizedFilter)
  @Post('/login')
  async login(@Body() body, @Session() session) {
    const { name, password } = body;
    const validateResult = await this.UserService.validateUser({ name, password });
    if (validateResult) {
        session.user = validateResult;
        return '登录成功';
    } else {
        throw new UnauthorizedException();
    }
  }

  @Get('/info')
  async getInfo(@Req() request) {
      return request.session;
  }
}
