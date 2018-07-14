import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  private username: string;
  private password: string;

  ngOnInit() {
  }


  sendLogin() {
    const loginMessage = new Message('com.blink.shared.client.messaging.UserMessage');
    loginMessage.set('message', 'hello');
    this.messageService.send(loginMessage).subscribe(result => {
      console.log(result.isOK());
    });
  }

}
