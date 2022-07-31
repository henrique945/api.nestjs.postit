import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { enviroment } from './environment/environment';
import { AuthModule } from './modules/auth/auth.module';
import { NoteCommentModule } from './modules/note-comment/note-comment.module';
import { NoteLikeModule } from './modules/note-like/note-like.module';
import { NoteRoutingModule } from './modules/note/note-routing.module';
import { NoteModule } from './modules/note/note.module';
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
    NoteCommentModule,
    NoteLikeModule,
    NoteRoutingModule,
  ],
})
export class AppModule {}
