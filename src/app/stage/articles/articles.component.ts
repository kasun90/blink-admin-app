import { MessageService } from './../../message.service';
import { Component, OnInit} from '@angular/core';
import { ToolBarButton } from '../tool-bar-button';
import { Article } from './Article';
import { DataTable } from '../common/DataTable';
import { Router} from '@angular/router';
import { Message } from 'src/app/message';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css', './../common/DataTable.css']
})
export class ArticlesComponent extends DataTable<Article> implements OnInit {

  openNewArticle: boolean;

  constructor(private _messageService: MessageService, private router: Router) {
    super(_messageService);
    this.onNewArticle = this.onNewArticle.bind(this);
  }

  ngOnInit() {
    this.toolBarButtons.push(new ToolBarButton('New Article', this.onNewArticle));
    this.displayedColumns = ['title', 'key', 'description', 'author', 'active', 'timestamp', 'actions'];
    this.requestMessageType = 'com.blink.shared.admin.article.ArticlesRequestMessage';
    this.dataArrayName = 'articles';
    this.deleteMessageType = 'com.blink.shared.admin.article.ArticleDeleteMessage';
    this.init();
  }

  onNewArticle() {
    this.openNewArticle = true;
  }

  closeNewArticle() {
    this.openNewArticle = false;
    this.resetTable();
  }

  deleteArticle(key: string) {
    this.deleteEntity(key);
  }

  editArticle(key: string) {
    this.router.navigate([this.router.url + '/edit', key]);
  }

  activate(key: string) {
    const req = new Message('com.blink.shared.admin.article.ArticleActivateMessage');
    req.set('key', key);

    this._messageService.send(req).subscribe(result => {
      if (result.isOK()) {
        this.resetTable();
      }
    });
  }

  deactivate(key: string) {
    const req = new Message('com.blink.shared.admin.article.ArticleDeactivateMessage');
    req.set('key', key);

    this._messageService.send(req).subscribe(result => {
      if (result.isOK()) {
        this.resetTable();
      }
    });
  }

}
