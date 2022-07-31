import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthTokenModule } from "../auth/auth-token.module";
import { NoteController } from "./controllers/note.controller";
import { NoteEntity } from "./entities/note.entity";
import { NoteService } from "./services/note.service";

@Module({
  controllers: [
    NoteController,
  ],
  imports: [
    TypeOrmModule.forFeature([
      NoteEntity,
    ]),
    AuthTokenModule,
  ],
  providers: [
    NoteService,
  ],
  exports: [
    NoteService,
  ],
})
export class NoteModule {}