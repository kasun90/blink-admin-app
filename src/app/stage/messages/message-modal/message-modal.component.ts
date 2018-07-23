import { Component, OnInit, Input } from '@angular/core';
import { UserMessage } from '../UserMessage';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {

  @Input() message: UserMessage;

  constructor() { }

  ngOnInit() {
  }

}
