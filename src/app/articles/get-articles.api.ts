import { types } from './types'; // to use /// <reference path="./types.ts"/> remove export from ./types-> export namespace types{}
import * as mongoose from 'eldeeb/mongoose';
import * as fs from 'eldeeb/fs';
import config from 'config';
import path from 'path';

export class GetArticlesAPI {
  /* link=/{{site=articles|jobs|.../}}($category/$link-title/)/{{type=category|article}}-{{ObjectId}}
   or /shortId  --> {{type=article|category}}-{{id}}
*/
  get(url: string): Promise<any> {
    // todo: Observable<types.article | types.post[]>

    config.root = '../'; // todo: temp, untill cinfig.root fixed
    // tmp:
    console.log(
      'cache file: ',
      path.resolve(`${config.root}src/app/temp/test.json`)
    );
    return fs.cache(`${config.root}src/app/temp/test.json`, () =>
      this.fetchData(this.getParts(url))
    );
  }

  private getParts(url: string): types.Parts {
    // url= {type}-{id}
    return { type: 'article', id: 1 };
  }

  // todo: cache(type/id, ()=>db.get()); edeeb/db-mongoDB, eldeeb/files->cache()
  // todo: return schema.article | schema.article[]
  private fetchData(parts: types.Parts) {
    console.log('== fetchdata #1 ==');
    const data = {
      test: 1,
      title: 'article title',
      subtitle: 'article sub-title',
      content: '=========== content ============',
      author: { name: ['first', 'last'], img: 'assets/test/avatar.jpg' },
      img: 'assets/test/post-image.jpg'
    };
    return data; // todo: return real data from database
    return mongoose
      .connect(config.db)
      .then(db => {
        console.log('===db===', db);
        // let myModel = mongoose.model("articles", { title: "string" }).model;
        // console.log("model: ", myModel);
        // todo: create models
        return data;
      })
      .catch(err => console.log(err));
  }
}
