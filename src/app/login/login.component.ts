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

  private username: string;
  private password: string;
  private loginMessage = '';
  private isSending: boolean;

  ngOnInit() {
    this.isSending = false;
  }


  sendLogin() {
    this.loginMessage = '';
    const loginMessage = new Message('com.blink.shared.admin.portal.LoginMessage');
    loginMessage.set('username', this.username);
    loginMessage.set('password', CryptoJS.SHA256(this.password).toString());
    this.isSending = true;
    this.messageService.send(loginMessage).subscribe(result => {
      this.isSending = false;
      this.loginMessage = result.get('message');
      this.router.navigate(['/stage']);
    });
  }

}
