import { map } from 'rxjs/operators';
import { Message } from './../../../message';
import { Component, OnInit, Input, OnDestroy} from '@angular/core';
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
  @Input() albumKey?: string;

  infoGroup: FormGroup;
  error: string;
  photosUploadComplete = false;
  coverUploadComplete = false;

  constructor(private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.error = undefined;
    this.infoGroup = this.formBuilder.group({
      title : ['', Validators.required],
      description : ['', Validators.required],
      key: ['', Validators.required, this.checkForKey.bind(this)]
    });
  }

  checkForKey(control: AbstractControl) {
    const keyMsg = new Message('com.blink.shared.admin.album.AlbumKeyCheckRequestMessage');
    keyMsg.set('key', control.value);
    return this.messageService.send(keyMsg).pipe(map(result => {
      return result.isOK() && result.get('available') ? null : {available: false};
    }));
  }

  closeModal() {
    this.infoGroup.reset();
    this.isOpen = false;
    this.coverUploadComplete = false;
    this.photosUploadComplete = false;
    this.onClose();
  }

  onCreateAlbumNext(stepper: MatStepper) {
    this.error = undefined;
    this.albumKey = this.infoGroup.get('key').value;
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

  onPhotosUploadComplete() {
    this.photosUploadComplete = true;
  }

  onCoverUploadComplete() {
    this.coverUploadComplete = true;
  }
}
