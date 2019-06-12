/*
///<reference types="node" />
///<reference types="../../node_modules/@types/node/fs" />
///<reference path="../../node_modules/@types/node/fs.d.ts" />
contains all types for all classes, organised in namespaces, each namespace contain types declarations for each corresponding class file
todo: namespace Vs module
  https://www.typescriptlang.org/docs/handbook/modules.html -> Working with Other JavaScript Libraries -> Ambient Modules
*/

export namespace types {
  export interface Object {
    [key: string]: any;
  }

  /*
  export namespace promise {
    export type FN = <T>(
      resolve?: RESOLVE<T>,
      reject?: (reason?: any) => void
    ) => Promise<T> | void | Array<T>;
    export type RESOLVE<T> = (value?: T | PromiseLike<T>) => void;
    export type NEXT = ((x?: any) => any);
  }

  export namespace error {
    export interface ErrObj {
      num?: number;
      type?: string;
      msg?: string;
      link?: string;
      details?: any;
    }
    export type Err = number | Array<any> | ErrObj | (() => Err);
  }

  export namespace dbMongoDB {
    //timestamp : true = Date.now | $timestamp | (()=>number) = Date.now | {type:Date, default: timeStamp}
    export type timeStamp =
      | boolean
      | number
      | (() => number)
      | { type: DateConstructor; default: number | (() => number) };

    export interface schemaObj {
      fields?: object;
      agjust?: object;
      times?: timeStamp | [timeStamp, timeStamp]; //or timestamp[] or Array<timeStamp>
      createdAt?: timeStamp;
      modifiedAt?: timeStamp; //todo: modifiedAt?:this.createdAt
      [key: string]: any;
    }

    //todo: specify keys for connectionOptions, modelOptions
    export interface connectionOptions extends general.obj {}
    export interface modelOptions extends general.obj {}
  }
  */
}
