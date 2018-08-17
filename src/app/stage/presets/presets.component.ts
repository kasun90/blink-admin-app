import { MessageService } from './../../message.service';
import { Preset } from './Preset';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolBarButton } from '../tool-bar-button';
import { Message } from '../../message';
import { MatPaginator, PageEvent } from '@angular/material';

@Component({
  selector: 'app-presets',
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.css']
})
export class PresetsComponent implements OnInit {

  private presetsToolButtons: ToolBarButton[] = [];
  private displayedColumns: string[] = ['title', 'key', 'description', 'timestamp', 'actions'];
  private total = 0;
  private pageSizeOptions = [5, 10, 25, 100];
  private pageSize = 5;
  private dataSource: Preset[] = [];
  private openNewPreset: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private messageService: MessageService) {
    this.onNewPreset = this.onNewPreset.bind(this);
  }

  ngOnInit() {
    this.presetsToolButtons.push(new ToolBarButton('New Preset', this.onNewPreset));
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

  onNewPreset() {
    this.openNewPreset = true;
  }

  closeNewPreset() {
    this.openNewPreset = false;
    this.resetTable();
  }

  deletePreset(key: string) {
    const req: Message = new Message('com.blink.shared.admin.preset.PresetDeleteMessage');
    req.set('key', key);

    this.messageService.send(req).subscribe(result => {
      if (result.isOK()) {
        this.resetTable();
      }
    });
  }

  private resetTable() {
    this.paginator.pageIndex = 0;
    this.requestData(0, true, this.pageSize);
  }

  private requestData(timestamp: number, less: boolean, limit: number) {
    const req: Message = new Message('com.blink.shared.admin.preset.PresetsRequestMessage');
    req.set('timestamp', timestamp);
    req.set('less', less);
    req.set('limit', limit);

    this.messageService.send(req).subscribe(result => {
      if (result.isOK()) {
        this.dataSource = result.get('presets') as Array<Preset>;
        this.total = result.get('total');
      }
    });
  }

}
