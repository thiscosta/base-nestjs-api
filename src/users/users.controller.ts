import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Roles } from 'src/passport/decorators/role.decorator';
import { JwtGuard } from 'src/passport/guards/jwt.guard';
import { RolesGuard } from 'src/passport/guards/roles.guard';
import { ROLES } from 'src/roles/roles.constants';
import { CreateUserWithEmailPasswordDto } from './dto/create-user-with-email-password.dto';
import { UserService } from './users.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(ROLES.ADMIN)
  listUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  createUserWithEmailPassword(
    @Body() createUserWithEmailPasswordDto: CreateUserWithEmailPasswordDto,
  ): Promise<User> {
    return this.userService.createUserWithEmailPassword(
      createUserWithEmailPasswordDto,
    );
  }
}
