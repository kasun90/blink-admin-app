import { AlbumEdit } from './album-edit.enum';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MessageService } from './../../message.service';
import { PageEvent, MatPaginator } from '@angular/material';
import { ToolBarButton } from '../tool-bar-button';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Album } from './album';
import { Message } from '../../message';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  private albumsToolButtons: ToolBarButton[] = [];
  private displayedColumns: string[] = ['title', 'key', 'description', 'photos', 'cover', 'timestamp', 'actions'];
  private dataSource: Album[] = [];
  private total = 0;
  private pageSizeOptions = [5, 10, 25, 100];
  private pageSize = 5;
  private openNewAlbum: boolean;
  private openEditAlbum: boolean;
  private editAlbumType: AlbumEdit;
  private editAlbumKey: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private messageService: MessageService,
  private overlayContainer: OverlayContainer) {
    this.overlayContainer.getContainerElement().classList.add('blink-theme');
    this.onNewAlbum = this.onNewAlbum.bind(this);
    this.onNewAlbumFinished = this.onNewAlbumFinished.bind(this);
  }

  ngOnInit() {
    this.albumsToolButtons.push(new ToolBarButton('New Album', this.onNewAlbum));
    this.requestData(0, true, this.pageSize);
  }

  set pageEvent(event: PageEvent) {
    if (this.pageSize !== event.pageSize) {
      this.pageSize = event.pageSize;
      this.resetTable();
    } else if (event.previousPageIndex < event.pageIndex) {
      this.requestData(this.dataSource[this.dataSource.length - 1].timestamp, true, this.pageSize);
    } else {
      this.requestData(this.dataSource[0].timestamp, false, this.pageSize);
    }
  }

  requestData(timestamp: number, less: boolean, limit: number) {
    const req: Message = new Message('com.blink.shared.admin.album.AlbumsRequestMessage');
    req.set('timestamp', timestamp);
    req.set('less', less);
    req.set('limit', limit);

    this.messageService.send(req).subscribe(result => {
      if (result.isOK()) {
        this.dataSource = result.get('albums') as Array<Album>;
        this.total = result.get('total');
      }
    });
  }

  onNewAlbum() {
    this.openNewAlbum = true;
  }

  onNewAlbumFinished() {
    this.openNewAlbum = false;
    this.resetTable();
  }

  private resetTable() {
    this.paginator.pageIndex = 0;
    this.requestData(0, true, this.pageSize);
  }

  deleteAlbum(key: string) {
    const req: Message = new Message('com.blink.shared.admin.album.AlbumDeleteMessage');
    req.set('key', key);

    this.messageService.send(req).subscribe(result => {
      if (result.isOK()) {
        this.resetTable();
      }
    });
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
