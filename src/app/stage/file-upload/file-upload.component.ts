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
  @Output() complete: EventEmitter<File> = new EventEmitter();

  private isUploading: boolean;
  private done: boolean;
  private error: boolean;

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
          this.complete.emit(this.file);
        } else {
          this.error = true;
        }
      });
    };
    reader.readAsDataURL(this.file);
  }

}
