import { Module } from "@nestjs/common";
import { NoteController } from "./controllers/note.controller";
import { NoteModule } from "./note.module";

@Module({
  controllers: [
    NoteController,
  ],
  imports: [
    NoteModule,
  ],
})
export class NoteRoutingModule {}