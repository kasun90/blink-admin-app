import { ToolBarButton } from '../tool-bar-button';
import { ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Message } from '../../message';
import { MessageService } from '../../message.service';
import { Entity } from './Entity';

export class DataTable<T extends Entity> {
    toolBarButtons: ToolBarButton[] = [];
    displayedColumns: string[] = [];
    dataSource: T[] = [];
    total = 0;
    pageSizeOptions = [5, 10, 25, 100];
    pageSize = 5;
    requestMessageType: string;
    deleteMessageType: string;
    dataArrayName: string;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private messageService: MessageService) {

    }

    init() {
        this.requestData(0, true, this.pageSize);
    }

    set pageEvent(event: PageEvent) {
        if (this.pageSize !== event.pageSize) {
          this.pageSize = event.pageSize;
          this.resetTable();
        } else if (event.previousPageIndex < event.pageIndex) {
          this.requestData(this.dataSource[this.dataSource.length - 1].timestamp, true, this.pageSize);
        } else {
          this.requestData(this.dataSource[0].timestamp, false, this.pageSize);
        }
    }

    resetTable() {
        this.paginator.pageIndex = 0;
        this.requestData(0, true, this.pageSize);
    }

    requestData(timestamp: number, less: boolean, limit: number) {
        const req: Message = new Message(this.requestMessageType);
        req.set('timestamp', timestamp);
        req.set('less', less);
        req.set('limit', limit);

        this.messageService.send(req).subscribe(result => {
          if (result.isOK()) {
            this.dataSource = result.get(this.dataArrayName) as Array<T>;
            this.total = result.get('total');
          }
        });
    }

    deleteEntity(key: string) {
        const req: Message = new Message(this.deleteMessageType);
        req.set('key', key);

        this.messageService.send(req).subscribe(result => {
          if (result.isOK()) {
            this.resetTable();
          }
        });
    }
}
