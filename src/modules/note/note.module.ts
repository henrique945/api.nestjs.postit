import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NoteEntity } from "./entities/note.entity";
import { NoteService } from "./services/note.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NoteEntity,
    ]),
  ],
  providers: [
    NoteService,
  ],
  exports: [
    NoteService,
  ],
})
export class NoteModule {}