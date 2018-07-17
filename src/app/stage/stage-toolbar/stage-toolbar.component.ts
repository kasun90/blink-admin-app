import { Component, OnInit, Input } from '@angular/core';
import { ToolBarButton } from '../tool-bar-button';

@Component({
  selector: 'app-stage-toolbar',
  templateUrl: './stage-toolbar.component.html',
  styleUrls: ['./stage-toolbar.component.css']
})
export class StageToolbarComponent implements OnInit {

  @Input() buttons: ToolBarButton[];

  constructor() { }

  ngOnInit() {
  }

  sample() {
    console.log('sample');
  }

}
