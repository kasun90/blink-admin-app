import { MessageService } from './../../message.service';
import { Component, OnInit} from '@angular/core';
import { ToolBarButton } from '../tool-bar-button';
import { Article } from './Article';
import { DataTable } from '../common/DataTable';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css', './../common/DataTable.css']
})
export class ArticlesComponent extends DataTable<Article> implements OnInit {

  constructor(private _messageService: MessageService) {
    super(_messageService);
    this.onNewArticle = this.onNewArticle.bind(this);
  }

  ngOnInit() {
    this.toolBarButtons.push(new ToolBarButton('New Article', this.onNewArticle));
    this.displayedColumns = ['title', 'key', 'description', 'author', 'timestamp', 'actions'];
    this.requestMessageType = 'com.blink.shared.admin.article.ArticlesRequestMessage';
    this.dataArrayName = 'articles';
    this.deleteMessageType = 'com.blink.shared.admin.article.ArticleDeleteMessage';
    this.init();
  }

  onNewArticle() {

  }

}
