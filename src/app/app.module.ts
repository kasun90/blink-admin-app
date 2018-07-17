import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule,
   MatCheckboxModule,
   MatFormFieldModule,
   MatInputModule,
   MatSidenavModule,
   MatToolbarModule,
   MatDividerModule,
   MatListModule,
   MatIconModule,
   MatProgressSpinnerModule
  } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { StageComponent } from './stage/stage.component';
import { ProfileSideComponent } from './profile-side/profile-side.component';
import { SideRoutesComponent } from './side-routes/side-routes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumsComponent } from './albums/albums.component';
import { DiagnosticsComponent } from './diagnostics/diagnostics.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StageComponent,
    ProfileSideComponent,
    SideRoutesComponent,
    DashboardComponent,
    AlbumsComponent,
    DiagnosticsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
