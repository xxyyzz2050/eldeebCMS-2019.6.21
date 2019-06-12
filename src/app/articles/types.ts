export namespace types {
  export interface Object {
    [key: string]: any;
  }

  export interface Post extends Object {
    // and article snippet
    title: string;
    content: string; // sammary
    user: Author;
    time: number | { createdAt: number; modifiedAt: number }; // change to updatedAt to be compitable with mongoose.SchemaOptions.time
  }

  export interface Article extends Post {}

  export interface Author extends Object {
    name: string; // |[string,string]
    image: string;
    title: string; // job position or country/city
    subtitle: string;
    gender: string;
  }

  export interface Parts {
    type: 'article' | 'category' | 'index';
    id?: number;
  }
}
