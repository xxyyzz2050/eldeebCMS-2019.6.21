import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { types } from "./types";

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
    //todo: Observable<...>
    return this.http.get<types.article | types.post[]>(
      `http://localhost:4200/articles/api/${url}`
    );
  }
}
