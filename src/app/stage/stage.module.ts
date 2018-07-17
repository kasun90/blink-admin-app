import { SideRoutesComponent } from './side-routes/side-routes.component';
import { DiagnosticsComponent } from './diagnostics/diagnostics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlbumsComponent } from './albums/albums.component';
import { StageComponent } from './stage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSideComponent } from './profile-side/profile-side.component';
import { MyMaterialModule } from '../my-material.module';
import { StageRoutingModule } from './stage-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    StageRoutingModule
  ],
  declarations: [
    StageComponent,
    AlbumsComponent,
    DashboardComponent,
    DiagnosticsComponent,
    ProfileSideComponent,
    SideRoutesComponent
  ]
})
export class StageModule { }
