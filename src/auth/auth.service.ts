import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(params: LoginUserDto) {
    let user = await this.userService.findOne({ email: params.email }, [
      'id',
      'password',
    ]);
    if (!user)
      throw new HttpException(
        'Email or password is wrong',
        HttpStatus.BAD_REQUEST,
      );

    let checkPassword = await bcrypt.compare(params.password, user.password);
    if (!checkPassword) {
      throw new HttpException(
        'Email or password is wrong',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      status: true,
      user: await this.userService.findOne({ id: user.id }),
    };
  }

  async register(params: RegisterUserDto) {
    let user = await this.userService.create(params);
    return user;
  }

  validateUser() {}
}
