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
   * sends a request to /server.ts (express) witch will trigger GetArticlesAPI.getArticle()
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
}
