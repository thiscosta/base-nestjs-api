import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserCredentialsModule } from 'src/user-credentials/user-credentials.module';
import { UserCredentialsService } from 'src/user-credentials/user-credentials.service';
import { UserModule } from 'src/users/user.module';
import { UserService } from 'src/users/users.service';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/passport/strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    UserCredentialsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expire'),
        },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    UserService,
    UserCredentialsService,
    ConfigService,
    JwtStrategy,
  ],
})
export class AuthenticationModule {}
