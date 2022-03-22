import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import configuration from 'config/configuration';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
