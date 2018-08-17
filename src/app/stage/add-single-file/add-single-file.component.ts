import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-add-single-file',
  templateUrl: './add-single-file.component.html',
  styleUrls: ['./add-single-file.component.css']
})
export class AddSingleFileComponent implements OnInit {

  @Input() taskName = 'Select File';
  @Input() message: Message;
  @Output() complete: EventEmitter<void> = new EventEmitter();

  private file: File;

  constructor() { }

  ngOnInit() {
  }

  onFileQueued(event) {
    const files = event.target.files as FileList;
    this.file = files[0];
  }

  onFileUploadComplete(file: File) {
    this.complete.emit();
  }

}
