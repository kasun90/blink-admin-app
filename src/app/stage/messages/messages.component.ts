import { Message } from './../../message';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserMessage } from './UserMessage';
import { MessageService } from '../../message.service';
import { PageEvent, MatPaginator, MatRow } from '@angular/material';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  private dataSource: UserMessage[] = [];
  private columns: string[] = ['name', 'message', 'email', 'phone', 'timestamp'];
  private total = 0;
  private pageSizeOptions = [5, 10, 25, 100];
  private pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private messageService: MessageService) { }

  set pageEvent(event: PageEvent) {
    if (this.pageSize !== event.pageSize) {
      this.pageSize = event.pageSize;
      this.paginator.pageIndex = 0;
      this.requestData(0, true, this.pageSize);
    } else if (event.previousPageIndex < event.pageIndex) {
      this.requestData(this.dataSource[this.dataSource.length - 1].timestamp, true, this.pageSize);
    } else {
      this.requestData(this.dataSource[0].timestamp, false, this.pageSize);
    }
  }

  ngOnInit() {
    this.requestData(0, true, this.pageSize);
  }

  private requestData(timestamp: number, less: boolean, limit) {
    const req: Message = new Message('com.blink.shared.admin.portal.UserMessagesRequestMessage');
    req.set('timestamp', timestamp);
    req.set('less', less);
    req.set('limit', limit);

    this.messageService.send(req).subscribe(result => {
      if (result.isOK()) {
        const messages = result.get('messages') as Array<UserMessage>;
        this.dataSource = messages;
        this.total = result.get('total');
      }
    });
  }

  selectRow(row: MatRow) {
    console.log(row);
  }

}
