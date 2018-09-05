import { MessageService } from './../../message.service';
import { Preset } from './Preset';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolBarButton } from '../tool-bar-button';
import { Message } from '../../message';
import { MatPaginator, PageEvent } from '@angular/material';
import { DataTable } from '../common/DataTable';

@Component({
  selector: 'app-presets',
  templateUrl: './presets.component.html',
  styleUrls: ['./presets.component.css', './../common/DataTable.css']
})
export class PresetsComponent extends DataTable<Preset> implements OnInit {
  displayedColumns: string[] = ['title', 'key', 'description', 'timestamp', 'actions'];
  total = 0;
  pageSizeOptions = [5, 10, 25, 100];
  pageSize = 5;
  dataSource: Preset[] = [];
  openNewPreset: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _messageService: MessageService) {
    super(_messageService);
    this.onNewPreset = this.onNewPreset.bind(this);
  }

  ngOnInit() {
    this.toolBarButtons.push(new ToolBarButton('New Preset', this.onNewPreset));
    this.requestMessageType = 'com.blink.shared.admin.preset.PresetsRequestMessage';
    this.dataArrayName = 'presets';
    this.deleteMessageType = 'com.blink.shared.admin.preset.PresetDeleteMessage';
    this.init();
  }

  onNewPreset() {
    this.openNewPreset = true;
  }

  closeNewPreset() {
    this.openNewPreset = false;
    this.resetTable();
  }

  deletePreset(key: string) {
    this.deleteEntity(key);
  }
}
