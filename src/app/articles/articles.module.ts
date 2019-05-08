import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { ArticlesRoutingModule } from "./articles-routing.module";
import { ArticleComponent } from "./article/article.component";
import { IndexComponent } from "./index/index.component";
import { ManageComponent } from "./manage/manage.component";

@NgModule({
  declarations: [ArticleComponent, IndexComponent, ManageComponent],
  imports: [CommonModule, ArticlesRoutingModule, HttpClientModule]
})
export class ArticlesModule {}
