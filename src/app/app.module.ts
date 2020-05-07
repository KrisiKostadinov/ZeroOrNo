import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayingComponent } from './level/playing/playing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LevelModule } from './level/level.module';

@NgModule({
  declarations: [
    AppComponent,
    PlayingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LevelModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
