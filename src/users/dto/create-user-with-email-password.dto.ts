import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserWithEmailPasswordDto {
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
