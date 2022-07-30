import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { enviroment } from './environment/environment';
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
  ],
})
export class AppModule {}
