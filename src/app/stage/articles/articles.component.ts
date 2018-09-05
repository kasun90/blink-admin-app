import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolBarButton } from '../tool-bar-button';
import { MatPaginator } from '@angular/material';
import { Article } from './Article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articleToolButtons: ToolBarButton[] = [];
  displayedColumns: string[] = ['title', 'key', 'description', 'author', 'timestamp', 'actions'];
  dataSource: Article[] = [];
  total = 0;
  pageSizeOptions = [5, 10, 25, 100];
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
    this.onNewArticle = this.onNewArticle.bind(this);
  }

  ngOnInit() {
    this.articleToolButtons.push(new ToolBarButton('New Article', this.onNewArticle));
  }

  onNewArticle() {

  }

}
