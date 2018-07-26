import { map } from 'rxjs/operators';
import { Message } from './../../../message';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MessageService } from '../../../message.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.scss']
})
export class NewAlbumComponent implements OnInit {

  @Input() isOpen: boolean;
  @Input() onClose?: Function;

  private infoGroup: FormGroup;
  private error: string;

  constructor(private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.error = undefined;
    this.infoGroup = this.formBuilder.group({
      title : ['', Validators.required],
      description : ['', Validators.required],
      key: ['', Validators.required, this.checkForKey.bind(this)]
    });
  }

  onFilesAdded(event) {
    const files = event.target.files as FileList;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (fileEvent) => {
      const readResult = reader.result as string;
      console.log(readResult.length);
      const uploadMsg = new Message('com.blink.shared.admin.album.AlbumPhotoUploadMessage');
      uploadMsg.set('key', 'test');
      uploadMsg.set('fileContent', readResult);
      this.messageService.send(uploadMsg).subscribe(response => {
        console.log(response.getType());
      });
    };
    reader.readAsDataURL(file);
  }

  checkForKey(control: AbstractControl) {
    const keyMsg = new Message('com.blink.shared.admin.album.AlbumKeyCheckRequestMessage');
    keyMsg.set('key', control.value);
    return this.messageService.send(keyMsg).pipe(map(result => {
      return result.isOK() && result.get('available') ? null : {available: false};
    }));
  }

  closeModal() {
    this.isOpen = false;
    this.onClose();
  }

  onCreateAlbumNext(stepper: MatStepper) {
    this.error = undefined;
    const createAlbumMsg = new Message('com.blink.shared.admin.album.CreateAlbumRequestMessage');
    createAlbumMsg.set('title', this.infoGroup.get('title').value);
    createAlbumMsg.set('description', this.infoGroup.get('description').value);
    createAlbumMsg.set('key', this.infoGroup.get('key').value);

    this.messageService.send(createAlbumMsg).subscribe(result => {
      if (result.isOK()) {
        stepper.next();
      } else {
        this.error = 'Network Error';
      }
    });
  }

}
