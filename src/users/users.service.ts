import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserWithEmailPasswordDto } from './dto/create-user-with-email-password.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { ROLES } from '../roles/roles.constants';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  findUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async createUserWithEmailPassword({
    email,
    password,
    firstName,
    lastName,
  }: CreateUserWithEmailPasswordDto): Promise<User> {
    const user = await this.prismaService.$transaction(async (prisma: any) => {
      const userData = { email, firstName, lastName, role: ROLES.USER };
      const user: User = await prisma.user.create({
        data: userData,
      });
      const hashedPassword = await bcrypt.hash(
        password,
        parseInt(this.configService.get('jwt.rounds'), 10),
      );

      const resetPasswordHash = await bcrypt.hash(
        randomBytes(32).toString('hex'),
        parseInt(this.configService.get('jwt.rounds'), 10),
      );

      await prisma.userCredential.create({
        data: {
          userId: user.id,
          password: hashedPassword,
          resetPasswordHash,
        },
      });
      return user;
    });
    return user;
  }
}
