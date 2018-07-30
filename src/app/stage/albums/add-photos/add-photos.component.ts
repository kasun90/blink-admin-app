import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-photos',
  templateUrl: './add-photos.component.html',
  styleUrls: ['./add-photos.component.css']
})
export class AddPhotosComponent implements OnInit {

  @Input() albumKey: string;
  @Output() complete: EventEmitter<void> = new EventEmitter();

  private photos: FileList;
  private uploaded: number;

  constructor() { }

  ngOnInit() {
  }

  onPhotosQueued(event) {
    this.uploaded = 0;
    this.photos = event.target.files as FileList;
  }

  onPhotoUploadComplete(file: File) {
    this.uploaded++;
    if (this.photos.length === this.uploaded) {
      this.complete.emit();
    }
  }

}
