import { Component, OnInit, Input } from '@angular/core';
import { UserMessage } from '../UserMessage';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(100%)'}),
        animate('100ms ease-in')
      ]),
      transition('* => void', [
        style({transform: 'translateY(100%)'}),
        animate('100ms ease-out')
      ])
    ]),
    trigger('fadeIn', [
      state('active', style({opacity: '1'})),
      transition('void => *', [
        style({opacity: '0'}),
        animate('100ms ease-in')
      ]),
      transition('* => void', [
        style({transform: 'translateY(-100%)'}),
        animate('100ms ease-in')
      ])
    ])
  ]
})
export class MessageModalComponent implements OnInit {

  @Input() message: UserMessage;

  @Input() isOpen: boolean;

  @Input() onClose?: Function;

  constructor() { }

  ngOnInit() {

  }

  close() {
    this.isOpen = false;
    this.onClose();
  }

}
