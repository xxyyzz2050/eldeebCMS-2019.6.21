/// <reference types="mongoose" />

import mongoose from "mongoose";

export namespace types {
  export interface Object {
    [key: string]: any;
  }
  export interface ConnectionOptions extends mongoose.ConnectionOptions {
    uri?: string;
    srv?: boolean;
    host?: string | [string]; //host1:port1,...
    auth?: [string, string];
    db?: string;
  }
  export interface model extends types.Object {
    fields?: types.Object;
    methods?: [];
    virtuals?: [];
    indexes?: []; //or:{indexName: value}
  }
}

Object.keys(mongoose).forEach(key => {
  exports[key] = mongoose[key]; //todo: ES export i.e export key = mongoose[key]
});

export function connect(options: types.ConnectionOptions | string) {
  console.log("*** mongoose.connect() ***");
  let uri: string,
    defaultOptions = {
      useCreateIndex: true,
      //useNewUrlParser: true, //https://mongoosejs.com/docs/deprecations.html; now it gives "MongoError: authentication fail"
      useFindAndModify: false,
      bufferCommands: false, //https://mongoosejs.com/docs/connections.html
      autoIndex: false,
      retryWrites: true
    };
  if (typeof options == "string") {
    uri = options;
    options = defaultOptions;
  } else {
    options = Object.assign(options, defaultOptions);

    if (!options.uri) {
      if (!options["host"]) options["host"] = "localhost:27017";
      else if (options["host"] instanceof Array)
        options["host"] = options["host"].join(",");
      uri =
        encode(options["auth"][0]) +
        ":" +
        encode(options["auth"][1]) +
        "@" +
        options["host"] +
        "/" +
        options["db"];
    }
  }

  if (options.uri.substr(0, 7) != "mongodb")
    uri = "mongodb" + (options.srv ? "+srv" : "") + "://" + uri;

  delete options["uri"];
  delete options["auth"];
  delete options["host"];
  delete options["db"];
  delete options["srv"];

  return mongoose.connect(
    uri,
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

function encode(str: string) {
  return encodeURIComponent(str).replace(/%/g, "%25");
}
