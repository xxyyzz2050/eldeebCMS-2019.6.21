import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleComponent } from './article/article.component';
import { IndexComponent } from './index/index.component';
import { ManageComponent } from './manage/manage.component';
import { MetaService } from '../meta.service'; // todo: already added to app.module/providers

@NgModule({
  declarations: [ArticleComponent, IndexComponent, ManageComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [MetaService]
})
export class ArticlesModule {}
