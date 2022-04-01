import { IsNotEmpty } from 'class-validator';

export class AuthenticateUserWithEmailAndPasswordDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
