//todo: create fileSync

import fs from "fs";
import Path from "path";
import { objectType, isEmpty, now, exportAll } from "./general";

export namespace types {
  export enum moveOptionsExisting {
    "replace",
    "rename", //todo: rename pattern ex: {{filename}}({{count++}}).{{ext}}
    "continue", //ignore
    "stop"
  }
  export interface moveOptions {
    existing: moveOptionsExisting;
  }
  export interface deleteOptions {
    files?: boolean; //delete files only, dont delete folders
    keepDir?: boolean; //if false, delete the folder content, but not the folder itself, default=false
    //[name: string]: any;
  }
  export type PathLike = import("fs").PathLike; //or use ///<referce ...>  'fs' is a Node module, so it cannot be used if this module run in the browser, we will get error: cannot resolve 'fs'
  //= string | Buffer | URL, but URL here refers to typescript/URL not node/URL
}

exportAll(fs);
export function cache() {}

export class Files {
  /*
  todo:
  - extend the native "fs": add methods to it (i.e: fs.newMethod=fn(){..}) then re export it
  - add this.root to paths in all methods
  - provide file path to all methods, to avoid creating a new instance for every file
    i.e new file(path).size() -> new file().size(path)
    if path didn't provided, this.filePath will be used
  */

  /**
   * accepts the root path as the root base for all paths in this class
   * @method constructor
   * @param  root        [description]
   */
  constructor(public root: types.PathLike) {
    console.log("===Files()==="); //todo: remove all logs, use unit test
    this.root = this.path(root);
    return this;
  }

  //resolve the path to be absolute and normalize it to guarantee that the path seperator type of the operating system will be used consistently (e.g. this will turn C:\directory/test into C:\directory\test (when being on Windows)
  path(...paths: types.PathLike[]): string {
    let stringPaths = paths.map(el => el.toString());
    return Path.resolve(Path.normalize(Path.join(...stringPaths))); //if it null it will be the current working dir (of the working script)
  }

  /**
   * get file extension
   * @method ext
   * @param  file [file path]
   * @return [description]
   */
  ext(file: types.PathLike): string {
    if (typeof file != "string") return null;
    //TODO: if(file[0]=='.' && no other ".")return file ex: .gitignore
    return Path.extname(file);

    //old: return file.split(".").pop()
  }

  /**
   * file size
   * @method size
   * @param  file [description]
   * @param  unit [description]
   * @return [description]
   */
  size(file?: types.PathLike, unit?: "kb" | "mb" | "gb"): number {
    let size = 123456; //todo: get file size
    if (unit == "kb") return size / 1024;
    else if (unit == "mb") return size / (1024 * 1024);
    else if (unit == "gb") return size / (1024 * 1024 * 1024);
    else return size;
  }

  /**
   * check if the given path is a directory
   * @method isDir
   * @param  path  [description]
   * @return [description]
   */
  isDir(path: types.PathLike): boolean {
    return true; //todo:
  }

  //todo: overload: move([ ...[from,to,options] ], globalOptions)
  /**
   * moves a file or a directory to a new path
   * @method move
   * @param  path    [path of the file you want to move]
   * @param  newPath [description]
   * @param  options [description]
   * @return [description]
   */
  move(
    path: types.PathLike,
    newPath: types.PathLike,
    options?: types.moveOptions
  ): {} {
    //let destination = this.isDir(path) ? newPath : Path.dirname(newPath); //todo: ??
    fs.renameSync(path, newPath); //todo: when removing URL from path types, error solved i.e: move(path:string|Buffer,..), why?
    /*TODO:
       - if faild, try copy & unlink
       - options.existing:replace|rename_pattern|continue
       - accept multiple files: move([file1,file2],newPath), move({file1:newPath1,...})
     */
    return {}; //todo: return a result
  }

  /**
   * last modified time of a file in MS
   * @method mtime
   * @param  file  [description]
   * @return [description]
   */
  mtime(file: types.PathLike): number | bigint {
    return fs.statSync(file).mtimeMs;
  }

  /**
   * create a new directory
   * @method mkdir
   * @param  path  [description]
   * @param  mode  permissions ex: 0777
   * @param  index the content of index.html that will be created inside the newly created dir, pass `false` to disable it
   * @return [description]
   */
  mkdir(
    path: types.PathLike | types.PathLike[],
    mode?: number | string, //ex: 0777
    index?: string | boolean
  ): boolean | { [key: string]: boolean } {
    //todo: if(path:array)return {file:true}
    if (path instanceof Array) {
      let result = {};
      path.forEach(el => (result[el.toString()] = this.mkdir(el, mode, index)));
      return result;
    }

    let fullPath = this.path(path);
    // mode=mode||"0777"
    /*
       //recursive https://stackoverflow.com/a/24311711
       let parts = path.split(Path.sep)
       //eldeeb.log(parts, 'mkdir/parts')
       let n = parts[0].indexOf(':') ? 2 : 1 //on windows the absoulute path starts with a drive letter (ex: C:), path.join('C:')=>'C:.' witch gives an error when we try to create it and we don't need to create a drive
       for (let i = n; i <= parts.length; i++) {
         let partPath = Path.join.apply(null, parts.slice(0, i))
         //eldeeb.log({ partPath: partPath, slice: parts.slice(0, i) },'mkdir/partPath')
         try {
           fs.existsSync(partPath) || fs.mkdirSync(partPath, {mode:mode}) //needs review -> use try&catch ?
           if (index !== false) {
             if (!index) index = '<meta http-equiv="REFRESH" content="0;url=/">'
             fs.writeFileSync(Path.join(partPath, 'index.htm'), index)
             //don't return true here, because it will exit the loop
           }
         } catch (e) {
           eldeeb.log(e, 'mkdir/error', 'error')
           return false
         }
       }*/

    try {
      //path = <data.PathLike>path;
      fs.existsSync(fullPath) || fs.mkdirSync(fullPath, { recursive: true });
      if (index !== false) {
        if (!index) index = '<meta http-equiv="REFRESH" content="0;url=/">'; //null or undefined
        fs.writeFileSync(Path.join(path.toString(), "index.html"), index);
        return true;
      }
    } catch (e) {
      console.log("mkdir/error: ", e);
      return false;
    }
  }

  //
  //nx:
  /*
    options:
    outer: if false, only remove folder contains but don't remove the folder itself (affects folders only)
    files: if true, only remove files (nx: dirs:false|empty false:don't remove dirs, empty=only remove empty dirs)

   options?: { [name: string]: any } https://stackoverflow.com/questions/42027864/is-there-any-way-to-target-the-plain-javascript-object-type-in-typescript
   */

  /**
   * delete files or folders recursively  https://stackoverflow.com/a/32197381
   * @method delete
   * @param  path    [description]
   * @param  options [description]
   */

  delete(path: types.PathLike, options?: types.deleteOptions): void {
    /*
     todo:
      - return boolean
      - check path type (file/folder)
   */
    if (!path) return;
    path = this.path(path);
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(file => {
        let curPath = `${path}/${file}`;
        if (fs.lstatSync(curPath).isDirectory()) {
          if (!options.files) this.delete(curPath);
        } else fs.unlinkSync(curPath);
      });
      if (!options.keepDir) fs.rmdirSync(path);
    }
  }

  /**
   * cache data into a file, or read the cache file if the data is fresh
   * @method cache
   * @param  file       [description]
   * @param  data       [description]
   * @param  expire     [description]
   * @param  type       [description]
   * @param  allowEmpty [description]
   * @return [description]
   */
  async cache(
    file: types.PathLike,
    data?: any,
    expire?: number, //in hours
    type?: string,
    allowEmpty?: boolean
  ) {
    /*  returns a promise (because some operations executed in async mode) , use await or .then()
         allowEmpty: allow creating an empty cache file
         expire (hours)
     */

    file = this.path(file);
    this.mkdir(Path.dirname(file));
    expire *= 60 * 60 * 1000; //ms

    if (
      !fs.existsSync(file) ||
      (!isNaN(expire) &&
        (expire < 0 || <number>this.mtime(file) + expire < now())) //todo: convert this.mimetime() to number or convert expire to bigInt??
    ) {
      //save data to file, and return the original data
      //console.log(`cache: ${file} updated`);
      if (typeof data == "function") data = await data(); //data() may be async or a Promise
      let dataType = objectType(data);
      if (dataType == "array" || dataType == "object")
        fs.writeFileSync(file, JSON.stringify(data));
      else if (allowEmpty || !isEmpty(data)) fs.writeFileSync(file, data);
      //todo: do we need to convert data to string? i.e: writeFileSync(file.toString()), try some different types of data
    } else {
      //retrive data from file and return it as the required type
      data = fs.readFileSync(file, "utf8"); //without encoding (i.e utf-8) will return a stream insteadof a string
      if (type == "json") return JSON.parse(data);
      //todo: elseif(type=="number") elseif ...
    }
    return data;
  }
}
