import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GetArticlesService {
  constructor(private http: HttpClient) {}

  //todo: use edeeb/db-mongoDB
  getArticle(url): Observable<any> {
    console.log("** GetArticlesService **");
    return this.fetchData();
  }

  fetchData(): Observable<any> {
    //todo: setup express routing in server.ts
    return this.http.get("http://localhost:4200/articles/1");
    //return new Promise(r => r({ title: "Title", content: "Content" }));
  }
}
