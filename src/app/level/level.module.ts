import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DndModule } from 'ng2-dnd';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DndModule.forRoot(),
  ],
})
export class LevelModule { }
