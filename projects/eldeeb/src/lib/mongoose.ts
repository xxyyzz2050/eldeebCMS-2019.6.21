/// <reference types="mongoose" />
//todo: export default mongoose (instead of export every method separately)
import mongoose from "mongoose";

export namespace types {
  export interface Object {
    [key: string]: any;
  }
  export interface ConnectionOptions extends mongoose.ConnectionOptions {
    db?: string;
  }
  export interface model extends types.Object {
    fields?: types.Object;
    methods?: [];
    virtuals?: [];
    indexes?: []; //or:{indexName: value}
    //todo: add model properties
  }
  export type uri =
    | string
    | {
        auth: [string, string];
        host?: string | string[]; //host1:port1,...
        srv?: boolean;
      }
    | [string, string, string | string[], boolean]; //[user,pass,host,srv]
}

Object.keys(mongoose).forEach(key => {
  exports[key] = mongoose[key]; //todo: ES export i.e export key = mongoose[key]
});

export function connect(uri: types.uri, options: types.ConnectionOptions) {
  console.log("*** mongoose.connect() ***");
  let defaultOptions = {
    //todo: export static defaultConnectionOptions={..}
    useCreateIndex: true,
    useNewUrlParser: true, //https://mongoosejs.com/docs/deprecations.html; now it gives "MongoError: authentication fail"
    useFindAndModify: false,
    bufferCommands: false, //https://mongoosejs.com/docs/connections.html
    autoIndex: false,
    retryWrites: true
  };

  if (uri instanceof Object) {
    uri = [
      (uri as types.Object).auth[0], //todo: don't repeate (uri as types.Object)
      (uri as types.Object).auth[1],
      (uri as types.Object).host,
      (uri as types.Object).srv
    ];
  }

  let srv = false;
  if (uri instanceof Array) {
    if (!uri[2]) uri[2] = "localhost:27017";
    else if (uri[2] instanceof Array) uri[2] = uri[2].join(",");
    srv = uri[3];
    uri = `${encode(uri[0])}:${encode(uri[1])}@${uri[2]}/${options["db"]}`;
  }

  if ((<string>uri).substr(0, 7) != "mongodb")
    uri = "mongodb" + (srv ? "+srv" : "") + "://" + uri;
  console.log("uri: ", uri);

  delete options["db"];
  options = Object.assign(options, defaultOptions);

  //todo: return Promise<this mongoose, not Mongoose>
  return mongoose.connect(
    <string>uri,
    options
  );
}

export function model(
  collection: string,
  obj: types.model,
  options?: mongoose.SchemaOptions
) {
  //todo: merge schema's defaultOptions
  let schema: mongoose.Schema;
  options.collection = collection;
  if ("fields" in obj) {
    schema = new mongoose.Schema(obj.fields, options);
    //todo: add methods,virtuals,...
  } else {
    schema = new mongoose.Schema(obj, options);
  }

  let model = mongoose.model(collection, schema);
  return { schema, model };
}

export function encode(str: string) {
  return encodeURIComponent(str).replace(/%/g, "%25");
}
