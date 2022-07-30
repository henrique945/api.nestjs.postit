import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserController } from './modules/user/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [AppService],
})
export class AppModule {}
