import { Component, OnInit } from '@angular/core';
import { GetArticlesService } from '../get-articles.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [GetArticlesService]
})
export class IndexComponent implements OnInit {
  articles;
  constructor(private getArticle: GetArticlesService) {}

  ngOnInit() {
    // or use this.article=..request(), and in template {{article | async | json}}
    this.getArticle.request('article/1').subscribe(data => {
      console.log('Data: ', data);
      this.articles = new Array(10).fill(data);
    });
  }
}
