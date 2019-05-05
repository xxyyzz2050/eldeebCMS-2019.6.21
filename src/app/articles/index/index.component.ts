import { Component, OnInit } from "@angular/core";
import { GetArticlesService } from "../get-articles.service";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
  providers: [GetArticlesService]
})
export class IndexComponent implements OnInit {
  article;
  constructor(private getArticle: GetArticlesService) {}

  ngOnInit() {
    this.article = this.getArticle.getArticle("");
  }
}
