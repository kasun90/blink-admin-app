import { Component, OnInit } from '@angular/core';
import { DataTable } from '../common/DataTable';
import { Subscription } from './Subscription';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css', './../common/DataTable.css']
})
export class SubscriptionsComponent extends DataTable<Subscription> implements OnInit {

  constructor(private _messageService: MessageService) {
    super(_messageService);
   }

  ngOnInit() {
    this.displayedColumns = ['firstName', 'lastName', 'email', 'timestamp', 'actions'];
    this.requestMessageType = 'com.blink.shared.admin.subcription.SubscriptionsRequestMessage';
    this.dataArrayName = 'subscriptions';
    this.deleteMessageType = 'com.blink.shared.admin.subcription.SubscriptionDeleteMessage';
    this.init();
  }

  deleteSubscription(key: string) {
    this.deleteEntity(key);
  }

}
