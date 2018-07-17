import { ToolBarButton } from './../tool-bar-button';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  private albumsToolButtons: ToolBarButton[] = [];

  constructor() {
    this.onNewAlbum = this.onNewAlbum.bind(this);
  }

  ngOnInit() {
    this.albumsToolButtons.push(new ToolBarButton('New Album', this.onNewAlbum));
  }

  onNewAlbum() {
    console.log('on new album');
  }

}
