import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MessageService } from './../../../message.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../../message';
import { map } from 'rxjs/operators';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-new-preset',
  templateUrl: './new-preset.component.html',
  styleUrls: ['./new-preset.component.css']
})
export class NewPresetComponent implements OnInit {

  @Input() isOpen: boolean;
  @Input() presetKey?: string;
  @Output() close: EventEmitter<void> = new EventEmitter();

  error: string;
  infoGroup: FormGroup;
  templateMessage = new Message('com.blink.shared.admin.preset.PresetTemplateUploadMessage');
  beforePhotoMessage = new Message('com.blink.shared.admin.preset.PresetBeforePhotoUploadMessage');
  afterPhotoMessage = new Message('com.blink.shared.admin.preset.PresetAfterPhotoUploadMessage');

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
    const keyMsg = new Message('com.blink.shared.admin.preset.PresetKeyCheckRequestMessage');
    keyMsg.set('key', control.value);
    return this.messageService.send(keyMsg).pipe(map(result => {
      return result.isOK() && result.get('available') ? null : {available: false};
    }));
  }

  closeModal() {
    this.infoGroup.reset();
    this.isOpen = false;
    this.close.emit();
  }

  onCreatePresetNext(stepper: MatStepper) {
    this.error = undefined;
    this.presetKey = this.infoGroup.get('key').value;
    this.setMessages(this.presetKey);
    const req = new Message('com.blink.shared.admin.preset.CreatePresetRequestMessage');
    req.set('title', this.infoGroup.get('title').value);
    req.set('description', this.infoGroup.get('description').value);
    req.set('key', this.infoGroup.get('key').value);

    this.messageService.send(req).subscribe(result => {
      if (result.isOK()) {
        stepper.next();
      } else {
        this.error = 'Network Error';
      }
    });
  }

  private setMessages(key: string) {
    this.templateMessage.set('key', key);
    this.beforePhotoMessage.set('key', key);
    this.afterPhotoMessage.set('key', key);
  }

}
