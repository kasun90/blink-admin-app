import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../../message';

@Component({
  selector: 'app-article-image',
  templateUrl: './article-image.component.html',
  styleUrls: ['./article-image.component.css']
})
export class ArticleImageComponent implements OnInit {

  @Input() isOpen: boolean;
  @Input() key: string;
  @Output() close: EventEmitter<void> = new EventEmitter();

  imageUploadMessage = new Message('com.blink.shared.admin.article.ArticleImageUploadMessage');
  message: string;

  constructor() { }

  ngOnInit() {
    this.message = 'Please wait for upload to finish get the url';
  }

  closeModal() {
    this.close.emit();
  }

}
