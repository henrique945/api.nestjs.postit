import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthTokenModule } from "../auth/auth-token.module";
import { NoteModule } from "../note/note.module";
import { NoteLikeController } from "./controllers/note-like.controller";
import { NoteLikeEntity } from "./entities/note-like.entity";
import { NoteLikeService } from "./services/note-like.service";

@Module({
  controllers: [
    NoteLikeController,
  ],
  imports: [
    TypeOrmModule.forFeature([
      NoteLikeEntity,
    ]),
    AuthTokenModule,
    NoteModule,
  ],
  providers: [
    NoteLikeService,
  ],
  exports: [
    NoteLikeService,
  ],
})
export class NoteLikeModule {}