import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    PrismaModule,
    UserModule,
  ],
})
export class AppModule {}
