import { MessageService } from './../../../message.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Message } from '../../../message';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  articleKey: string;
  rawArticle: string;
  updating: boolean;
  message: string;

  constructor(private route: ActivatedRoute, private location: Location,
    private messageService: MessageService) { }

  ngOnInit() {
    this.articleKey =  this.route.snapshot.paramMap.get('articleKey');
    this.requestRawArticle(this.articleKey);
    this.message = 'No Messages';
  }

  private requestRawArticle(key: string) {
    const rawReq = new Message('com.blink.shared.admin.article.RawArticleRequestMessage');
    rawReq.set('key', key);

    this.messageService.send(rawReq).subscribe(result => {
      if (result.isOK()) {
        if (result.getType() !== 'com.blink.shared.system.InvalidRequest') {
          this.rawArticle = result.get('content');
        }
      }
    });
  }

  cancel() {
    this.location.back();
  }

  update() {
    this.message = 'Saving...';
    this.updating = true;
    const updateReq = new Message('com.blink.shared.admin.article.UpdateArticleRequestMessage');
    updateReq.set('key', this.articleKey);
    updateReq.set('content', this.rawArticle);

    this.messageService.send(updateReq).subscribe(result => {
      this.updating = false;
      if (result.isOK()) {
        if (result.get('success')) {
          this.message = 'Saved successfully';
        } else {
          this.message = result.get('description');
        }
      } else {
        this.message = 'Network error while saving';
      }
    });
  }
}
