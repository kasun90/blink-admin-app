import { BrowserModule } from '@angular/platform-browser';
import { StageModule } from './stage/stage.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MyMaterialModule } from './my-material.module';
import { OverlayContainer } from '@angular/cdk/overlay';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MyMaterialModule,
    StageModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('blink-theme');
  }
}
