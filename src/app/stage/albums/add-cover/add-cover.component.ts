import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-cover',
  templateUrl: './add-cover.component.html',
  styleUrls: ['./add-cover.component.css']
})
export class AddCoverComponent implements OnInit {

  @Input() albumKey: string;
  @Output() complete: EventEmitter<void> = new EventEmitter();

  cover: File;

  constructor() { }

  ngOnInit() {
  }

  onCoverQueued(event) {
    const files = event.target.files as FileList;
    this.cover = files[0];
  }

  onCoverUploadComplete(file: File) {
    this.complete.emit();
  }
}
