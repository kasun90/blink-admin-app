import { Message } from 'src/app/message';
import { Setting } from './Setting';
import { MessageService } from './../../message.service';
import { ToolBarButton } from './../tool-bar-button';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  toolBarButtons: ToolBarButton[] = [];
  displayedColumns: string[] = [];
  dataSource: Setting[] = [];
  openSetting = false;
  currentKey: string;
  currentValue: string;

  constructor(private _messageService: MessageService) {
    this.onNewSetting = this.onNewSetting.bind(this);
  }

  ngOnInit() {
    this.toolBarButtons.push(new ToolBarButton('New Setting', this.onNewSetting));
    this.displayedColumns = ['key', 'value', 'actions'];
    this.requestSettings();
  }

  requestSettings() {
    const req: Message = new Message('com.blink.shared.admin.setting.SettingRequestMessage');

    this._messageService.send(req).subscribe(result => {
      if (result.isOK()) {
        this.dataSource = result.get('settings') as Array<Setting>;
      }
    });
  }

  onNewSetting() {
    this.currentKey = undefined;
    this.openSetting = true;
  }

  closeSetting() {
    this.openSetting = false;
    this.requestSettings();
  }

  editSetting(key: string, value: string) {
    this.currentKey = key;
    this.currentValue = value;
    this.openSetting = true;
  }

  deleteSetting(key: string) {
    const req = new Message('com.blink.shared.admin.setting.DeleteSettingMessage');
    req.set('key', key);

    this._messageService.send(req).subscribe(result => {
      if (result.isOK()) {
        this.requestSettings();
      }
    });
  }

}
