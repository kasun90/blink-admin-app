import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../../../message.service';
import { Message } from '../../../message';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  @Input() file: File;
  @Input() key: string;
  @Input() type = 'photo';
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
      const msgType = this.type === 'photo' ? 'com.blink.shared.admin.album.AlbumPhotoUploadMessage' :
      'com.blink.shared.admin.album.AlbumCoverUploadMessage';
      const req = new Message(msgType);
      req.set('key', this.key);
      req.set('fileContent', reader.result);
      this.messageService.send(req).subscribe(response => {
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
