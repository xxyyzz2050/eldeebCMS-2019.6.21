import { types } from "./types"; //to use /// <reference path="./types.ts"/> remove export from ./types-> export namespace types{}
import * as mongoose from "../../../projects/eldeeb/src/lib/mongoose"; //todo: from "eldeeb/mongoose"

export class GetArticlesAPI {
  //link=/{{site=articles|jobs|.../}}($category/$link-title/)/{{type=category|article}}-{{ObjectId}}  or /shortId  --> {{type=article|category}}-{{id}}
  get(url: string): Promise<any> {
    //todo: Observable<types.article | types.post[]>
    return this.fetchData(this.getParts(url)); //.then(x => console.log("get:", x));
  }

  private getParts(url: string): types.parts {
    //url= {type}-{id}
    return { type: "article", id: 1 };
  }

  //todo: cache(type/id, ()=>db.get()); edeeb/db-mongoDB, eldeeb/files->cache()
  //todo: return schema.article | schema.article[]
  private fetchData(parts: types.parts) {
    return mongoose
      .connect({
        auth: ["xxyyzz2050", "Xx159753@@"],
        host: "cluster-test-kuwit.gcp.mongodb.net",
        //srv: true, //todo: enabling srv mode causes that neither .then() or .catche() runs
        db: "test"
      })
      .then(db => {
        console.log("===db===", db);
        //let myModel = mongoose.model("articles", { title: "string" }).model;
        //console.log("model: ", myModel);
        //todo: create models

        return { title: "Title", content: "Content" };
      })
      .catch(err => console.log(err));
  }
}
