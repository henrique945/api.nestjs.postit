import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { enviroment } from './environment/environment';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.db',
      autoLoadEntities: true,
      synchronize: true,
      logging: enviroment.DATABASE_LOGGING === 'true',
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
