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
import { StageToolbarComponent } from './stage-toolbar/stage-toolbar.component';
import { MessagesComponent } from './messages/messages.component';
import { AdminUserTypePipe } from './tools/admin-user-type.pipe';
import { MessageModalComponent } from './messages/message-modal/message-modal.component';
import { NewAlbumComponent } from './albums/new-album/new-album.component';

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
    SideRoutesComponent,
    StageToolbarComponent,
    MessagesComponent,
    AdminUserTypePipe,
    MessageModalComponent,
    NewAlbumComponent
  ]
})
export class StageModule { }
