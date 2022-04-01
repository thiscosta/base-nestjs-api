import { Injectable } from '@nestjs/common';
import { UserCredential } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserCredentialsService {
  constructor(private prismaService: PrismaService) {}

  findUserCredentialsByUserId(id: number): Promise<UserCredential> {
    return this.prismaService.userCredential.findUnique({
      where: { userId: id },
    });
  }
}
