import { BFile } from './../../../BFile';
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
  @Output() image: EventEmitter<string> = new EventEmitter();

  imageUploadMessage = new Message('com.blink.shared.admin.article.ArticleImageUploadMessage');
  message: string;
  _file: BFile;

  constructor() { }

  ngOnInit() {
    this.message = 'Please wait for upload to finish get the tag';
    this.imageUploadMessage.set('key', this.key);
  }

  copyTag() {
    if (this._file === undefined) {
      return;
    }
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.getTag(this._file);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.message = 'Copied to clipboard';
  }

  insertTag() {
    if (this._file === undefined) {
      return;
    }
    this.image.emit(this.getTag(this._file));
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }

  private getTag(file: BFile): string {
    return '!(' + file.resource + ')';
  }

  onUploadFinished(file: BFile) {
    this._file = file;
    this.message = 'File uploaded: ' + this._file.resource;
  }

}
