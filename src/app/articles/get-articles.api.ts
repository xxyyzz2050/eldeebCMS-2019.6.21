export class GetArticlesAPI {
  //todo: use edeeb/mongoose; return schema.article | schema.post[]
  // todo: 1-parseURL into parts {type:article|category, id}, 2-cache()
  //link=/{{site=articles|jobs|.../}}($category/$link-title/)/{{type=category|article}}-{{ObjectId}}  or /shortId  --> {{type=article|category}}-{{id}}
  getArticle(url): any {
    console.log("** GetArticlesService **");
    return { title: "Title", content: "Content", url };
  }
}
