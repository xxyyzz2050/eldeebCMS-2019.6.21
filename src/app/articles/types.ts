export namespace types {
  export interface Object {
    [key: string]: any;
  }

  export interface author extends Object {
    name: string; // |[string,string]
    image: string;
    title: string; //job position or country/city
    subtitle: string;
    gender: string;
  }

  export interface post extends Object {
    title: string;
    content: string; //sammary
    user: author;
    time: number | { createdAt: number; modifiedAt: number }; //change to updatedAt to be compitable with mongoose.SchemaOptions.time
  }
}
