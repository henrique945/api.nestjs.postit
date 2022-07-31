import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthTokenModule } from "../auth/auth-token.module";
import { NoteModule } from "../note/note.module";
import { NoteCommentController } from "./controllers/note-comment.controller";
import { NoteCommentEntity } from "./entities/note-comment.entity";
import { NoteCommentService } from "./services/note-comment.service";

@Module({
  controllers: [
    NoteCommentController,
  ],
  imports: [
    TypeOrmModule.forFeature([
      NoteCommentEntity,
    ]),
    AuthTokenModule,
    NoteModule,
  ],
  providers: [
    NoteCommentService,
  ],
  exports: [
    NoteCommentService,
  ],
})
export class NoteCommentModule {}