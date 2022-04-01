import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticateUserWithEmailAndPasswordDto } from './dto/authenticate-user-with-email-password.dto';

@Controller('/authenticate')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/password')
  authenticate(
    @Body()
    authenticateUserWithEmailAndPasswordDto: AuthenticateUserWithEmailAndPasswordDto,
  ): Promise<any> {
    return this.authenticationService.authenticate(
      authenticateUserWithEmailAndPasswordDto,
    );
  }
}
