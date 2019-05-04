import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleComponent } from './article/article.component';
import { IndexComponent } from './index/index.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
  declarations: [ArticleComponent, IndexComponent, ManageComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
