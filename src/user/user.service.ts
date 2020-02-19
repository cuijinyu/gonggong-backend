import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';

const hash = (text: string) => {
  const hashInstance = createHash('sha256');
  hashInstance.update(text);
  return hashInstance.digest('hex');
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userReposity: Repository<User>,
  ) {}

  createUser({ name, password }) {
    return this.userReposity.insert({
      name,
      password: hash(password),
    });
  }

  async validateUser(user: { name: string; password: string }) {
    const { name, password } = user;
    const userInDB = await this.findOne({ name });
    if (!userInDB) {
      return false;
    }
    if (userInDB.password === hash(password)) {
      return userInDB;
    }
    return false;
  }

  findOne(user: { name: string }) {
    return this.userReposity.findOne({
      where: {
        name: user.name,
      },
    });
  }

  deleteUser() {}
}
