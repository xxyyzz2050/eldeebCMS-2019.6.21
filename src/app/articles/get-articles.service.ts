import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface ARTICLE {
  title: string;
  content: string;
}

@Injectable({
  providedIn: "root"
})
export class GetArticlesService {
  constructor(private http: HttpClient) {}

  /**
   * sends a request to express with will trigger this.getArticle
   * @method request
   * @param  url     [description]
   * @return [description]
   */
  request(url): any {
    //todo: Observable<schema.article>
    return this.http.get<ARTICLE | ARTICLE[]>(
      `http://localhost:4200/articles/api/${url}`
    );
  }

  //todo: use edeeb/db-mongoDB; return schema.article | schema.article[]
  // todo: 1-parseURL into parts {type:article|category, id}, 2-cache()
  getArticle(url): any {
    console.log("** GetArticlesService **");
    return { title: "Title", content: "Content" };
  }
}
