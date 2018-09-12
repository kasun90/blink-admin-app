import { BFile } from './../../BFile';
import { MessageService } from './../../message.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../message';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input() file: File;
  @Input() message: Message;
  @Output() complete: EventEmitter<BFile> = new EventEmitter();

  isUploading: boolean;
  done: boolean;
  error: boolean;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.isUploading = true;
    this.done = false;
    this.error = false;
    const reader = new FileReader();
    reader.onloadend = (fileEvent) => {
      this.message.set('content', reader.result);
      this.message.set('fileName', this.file.name);
      this.messageService.send(this.message).subscribe(response => {
        this.isUploading = false;
        if (response.isOK()) {
          this.done = true;
          if (response.getType() === 'com.blink.shared.admin.FileUploadResponseMessage') {
            this.complete.emit(response.get('file') as BFile);
          } else {
            this.complete.emit(new BFile(this.file.name, this.file.name));
          }
        } else {
          this.error = true;
        }
      });
    };
    reader.readAsDataURL(this.file);
  }

}
