import { BFile } from './../../../BFile';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../../message';

@Component({
  selector: 'app-article-cover',
  templateUrl: './article-cover.component.html',
  styleUrls: ['./article-cover.component.css']
})
export class ArticleCoverComponent implements OnInit {

  @Input() isOpen: boolean;
  @Input() key: string;
  @Output() close: EventEmitter<void> = new EventEmitter();

  coverUploadMessage: Message = new Message('com.blink.shared.admin.article.ArticleCoverUploadMessage');

  constructor() { }

  ngOnInit() {
    this.coverUploadMessage.set('key', this.key);
  }

  closeModal() {
    this.close.emit();
  }

  onUploadFinished(file: BFile) {
  }

}
