import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../message.service';
import { Message } from '../../message';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  oldPassword: string;
  newPassword: string;
  name: string;
  message: string;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.message = '';

    const request = new Message('com.blink.shared.admin.portal.UserDetailsRequestMessage');
    this.messageService.send(request).subscribe(result => {
      if (result.isOK()) {
        this.name = result.get('name');
      }
    });
  }

  onPasswordChange() {
    this.message = '';
    if (this.oldPassword === undefined || this.newPassword === undefined) {
      this.message = 'Passwords are empty';
      return;
    }

    const req = new Message('com.blink.shared.admin.portal.ChangePasswordMessage');
    req.set('oldPassword', CryptoJS.SHA256(this.oldPassword).toString());
    req.set('newPassword', CryptoJS.SHA256(this.newPassword).toString());

    this.messageService.send(req).subscribe(result => {
      if (result.isOK()) {
        this.message = result.get('description');
      } else {
        this.message = 'Connection error';
      }
    });
  }

  onNameChange() {
    if (this.name === undefined || this.name === '') {
      alert('Name cannot be empty');
      return;
    }

    const req = new Message('com.blink.shared.admin.portal.ChangeNameMessage');
    req.set('newName', this.name);

    this.messageService.send(req).subscribe(result => {
      if (result.isOK()) {
        alert('Name changed');
      }
    });

  }

}
