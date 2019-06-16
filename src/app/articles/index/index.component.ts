import { Component, OnInit } from '@angular/core';
import { GetArticlesService } from '../get-articles.service';
import { MetaService } from '../../meta.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [GetArticlesService]
})
export class IndexComponent implements OnInit {
  articles; // todo: = new Observable<types.Articles>

  constructor(
    private getArticle: GetArticlesService,
    private meta: MetaService
  ) {}

  ngOnInit() {
    // or use this.article=..request(), and in template {{article | async | json}}
    this.getArticle.request('article/1').subscribe(data => {
      console.log('Data: ', data);
      this.articles = new Array(10).fill(data);
      this.meta.setTags(data); // todo:let tags={title:data.title,...} .setTags(tags)
      // todo: error: this.meta.setTags(data); changes `data` itself to _tags
    });
  }
}
