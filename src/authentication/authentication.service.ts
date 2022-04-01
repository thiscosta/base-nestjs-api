import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { UserCredentialsService } from 'src/user-credentials/user-credentials.service';
import { User } from '@prisma/client';
import { AuthenticateResponse } from './dto/authenticate-response.dto';
import { AuthenticateUserWithEmailAndPasswordDto } from './dto/authenticate-user-with-email-password.dto';
import { AuthenticateSignedBody } from './dto/authenticate-signed-body.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UserService,
    private userCredentialsService: UserCredentialsService,
    private jwtTokenService: JwtService,
  ) {}

  async authenticate({
    email,
    password,
  }: AuthenticateUserWithEmailAndPasswordDto): Promise<AuthenticateResponse> {
    const user = await this.validateUserCredentials(email, password);
    return this.getAccessToken(user);
  }

  async validateUserCredentials(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException(
        'credentials',
        `User with email ${email} does not exists`,
      );
    }

    const userCredentials =
      await this.userCredentialsService.findUserCredentialsByUserId(user.id);

    if (!userCredentials) {
      throw new NotFoundException(
        'credentials',
        `User is not registed with password authentication`,
      );
    }

    const isValid = bcrypt.compare(password, userCredentials.password);

    if (!isValid) {
      throw new Error(`Invalid credentials`);
    }

    return user;
  }

  getAccessToken(user: User): AuthenticateResponse {
    const bodyToSign: AuthenticateSignedBody = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      access_token: this.jwtTokenService.sign(bodyToSign),
      expiresIn: 60 * 60,
    };
  }
}
