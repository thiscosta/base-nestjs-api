import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [ConfigModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
