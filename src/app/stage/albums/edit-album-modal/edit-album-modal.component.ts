import { AlbumEdit } from './../album-edit.enum';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-edit-album-modal',
  templateUrl: './edit-album-modal.component.html',
  styleUrls: ['./edit-album-modal.component.css']
})
export class EditAlbumModalComponent implements OnChanges, OnInit {

  @Input() isOpen: boolean;
  @Input() albumKey: string;
  @Input() editType: AlbumEdit;
  @Output() close: EventEmitter<void> = new EventEmitter();

  private actionComplete: boolean;
  private types = AlbumEdit;
  private title: string;

  constructor() { }

  ngOnInit() {
    this.actionComplete = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    switch (changes.editType.currentValue) {
      case this.types.PHOTOS:
        this.title = 'Add Photos to ' + changes.albumKey.currentValue;
        break;
      case this.types.COVER:
        this.title = 'Add Cover to ' + changes.albumKey.currentValue;
        break;
      default:
        this.title = 'Add';
        break;
    }
  }

  onPhotosUploadComplete() {
    this.actionComplete = true;
  }

  onCoverUploadComplete() {
    this.actionComplete = true;
  }

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }

}
