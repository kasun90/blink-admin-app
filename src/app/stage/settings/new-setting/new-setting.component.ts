import { Message } from 'src/app/message';
import { MessageService } from './../../../message.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-setting',
  templateUrl: './new-setting.component.html',
  styleUrls: ['./new-setting.component.css']
})
export class NewSettingComponent implements OnInit, OnChanges {

  private _key: string;
  @Input() isOpen: boolean;
  @Input() key: string;
  @Input() value: string;
  @Output() close: EventEmitter<void> = new EventEmitter();
  error: string;
  title: string;
  infoGroup: FormGroup;

  constructor(private _messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.infoGroup = this.formBuilder.group({
      value : ['', Validators.required],
      key: ['', Validators.required]
    });
    this.setInterface();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isOpen.currentValue) {
      this.setInterface();
    }
  }

  setInterface() {
    if (this.key !== undefined) {
      this.title = 'Update';
      this.infoGroup.patchValue({'key': this.key});
      this.infoGroup.patchValue({'value': this.value});
      this.infoGroup.get('key').disable();
    } else {
      this.title = 'Insert';
      this.infoGroup.get('key').enable();
    }
  }

  closeModal() {
    this.infoGroup.reset();
    this.close.emit();
  }

  save() {
    let messageType: string;
    if (this.key === undefined) {
      messageType = 'com.blink.shared.admin.setting.NewSettingMessage';
    } else {
      messageType = 'com.blink.shared.admin.setting.UpdateSettingMessage';
    }

    const req = new Message(messageType);
    req.set('key', this.infoGroup.get('key').value);
    req.set('value', this.infoGroup.get('value').value);

    this._messageService.send(req).subscribe(result => {
      if (result.isOK()) {
        const status = result.get('status') as boolean;
        if (status) {
          this.closeModal();
        } else {
          this.error = result.get('description');
        }
      } else {
        this.error = 'Network Error';
      }
    });
  }

}
