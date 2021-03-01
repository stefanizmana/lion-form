import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ComponentsModule} from "./component/component.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ComponentsModule
  ],
  providers: [],
  exports: [
    ComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
