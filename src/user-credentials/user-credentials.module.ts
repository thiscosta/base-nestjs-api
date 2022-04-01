import { Module } from '@nestjs/common';
import { UserCredentialsService } from './user-credentials.service';
@Module({
  providers: [UserCredentialsService],
})
export class UserCredentialsModule {}
