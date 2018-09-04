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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { PhotoUploadComponent } from './albums/photo-upload/photo-upload.component';
import { AddPhotosComponent } from './albums/add-photos/add-photos.component';
import { AddCoverComponent } from './albums/add-cover/add-cover.component';
import { EditAlbumModalComponent } from './albums/edit-album-modal/edit-album-modal.component';
import { PresetsComponent } from './presets/presets.component';
import { NewPresetComponent } from './presets/new-preset/new-preset.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AddSingleFileComponent } from './add-single-file/add-single-file.component';
import { AccountComponent } from './account/account.component';
import { ArticlesComponent } from './articles/articles.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    NewAlbumComponent,
    PhotoUploadComponent,
    AddPhotosComponent,
    AddCoverComponent,
    EditAlbumModalComponent,
    PresetsComponent,
    NewPresetComponent,
    FileUploadComponent,
    AddSingleFileComponent,
    AccountComponent,
    ArticlesComponent
  ]
})
export class StageModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('blink-theme');
  }
}
