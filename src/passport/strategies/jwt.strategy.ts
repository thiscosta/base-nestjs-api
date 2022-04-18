import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticateSignedBody } from 'src/authentication/dto/authenticate-signed-body.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(
    accessTokenData: AuthenticateSignedBody,
  ): Promise<AuthenticateSignedBody> {
    const { id, email, firstName, lastName, role } = accessTokenData;
    return {
      id,
      email,
      firstName,
      lastName,
      role,
    };
  }
}
