import { PageEvent, MatPaginator } from '@angular/material';
import { ToolBarButton } from '../tool-bar-button';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Album } from './album';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  private albumsToolButtons: ToolBarButton[] = [];
  private displayedColumns: string[] = ['title', 'key', 'photos', 'cover', 'timestamp'];
  private dataSource: Album[] = [];
  private total = 0;
  private pageSizeOptions = [5, 10, 25, 100];
  private pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
    this.onNewAlbum = this.onNewAlbum.bind(this);
  }

  ngOnInit() {
    this.albumsToolButtons.push(new ToolBarButton('New Album', this.onNewAlbum));
  }

  set pageEvent(event: PageEvent) {

  }

  onNewAlbum() {
    console.log('on new album');
  }

}
