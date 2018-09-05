import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  articleKey: string;

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.articleKey =  this.route.snapshot.paramMap.get('articleKey');
  }

  cancel() {
    this.location.back();
  }

}
