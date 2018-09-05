import { AlbumEdit } from './album-edit.enum';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MessageService } from './../../message.service';
import { ToolBarButton } from '../tool-bar-button';
import { Component, OnInit} from '@angular/core';
import { Album } from './album';
import { DataTable } from '../common/DataTable';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss', './../common/DataTable.css']
})
export class AlbumsComponent extends DataTable<Album> implements OnInit {
  openNewAlbum: boolean;
  openEditAlbum: boolean;
  editAlbumType: AlbumEdit;
  editAlbumKey: string;

  constructor(private _messageService: MessageService,
  private overlayContainer: OverlayContainer) {
    super(_messageService);
    this.overlayContainer.getContainerElement().classList.add('blink-theme');
    this.onNewAlbum = this.onNewAlbum.bind(this);
    this.onNewAlbumFinished = this.onNewAlbumFinished.bind(this);
  }

  ngOnInit() {
    this.toolBarButtons.push(new ToolBarButton('New Album', this.onNewAlbum));
    this.displayedColumns = ['title', 'key', 'description', 'photos', 'cover', 'timestamp', 'actions'];
    this.requestMessageType = 'com.blink.shared.admin.album.AlbumsRequestMessage';
    this.dataArrayName = 'albums';
    this.deleteMessageType = 'com.blink.shared.admin.album.AlbumDeleteMessage';
    this.init();
  }

  onNewAlbum() {
    this.openNewAlbum = true;
  }

  onNewAlbumFinished() {
    this.openNewAlbum = false;
    this.resetTable();
  }

  deleteAlbum(key: string) {
    this.deleteEntity(key);
  }

  addPhotos(key: string) {
    this.editAlbumKey = key;
    this.editAlbumType = AlbumEdit.PHOTOS;
    this.openEditAlbum = true;
  }

  addCover(key: string) {
    this.editAlbumKey = key;
    this.editAlbumType = AlbumEdit.COVER;
    this.openEditAlbum = true;
  }

  closeEditing() {
    this.openEditAlbum = false;
    this.editAlbumType = undefined;
    this.editAlbumKey = undefined;
    this.resetTable();
  }

}
