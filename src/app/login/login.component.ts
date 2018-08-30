import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private messageService: MessageService, private router: Router) { }

  username: string;
  password: string;
  loginMessage = '';
  isSending: boolean;

  ngOnInit() {
    this.isSending = false;
  }


  sendLogin() {
    this.loginMessage = '';
    const loginMessage = new Message('com.blink.shared.admin.portal.LoginMessage');
    loginMessage.set('username', this.username);
    loginMessage.set('password', CryptoJS.SHA256(this.password).toString());
    this.messageService.setTargetUser(this.username);
    this.isSending = true;
    this.messageService.send(loginMessage).subscribe(result => {
      this.isSending = false;
      if (result.isOK()) {
        if (result.get('code') === 0) {
          this.messageService.setSessionID(result.get('sessionID'));
          this.router.navigate(['/stage']);
        } else {
          this.loginMessage = result.get('message');
        }
      } else {
        this.loginMessage = 'Connection Error';
      }
    });
  }

}
