/*
todo:
- update: run() deprecated!, use unit test to trace errors
- transpiler to auto inject eldeeb.run(), using notation @eldeeb.run()
- run(): auto get function name & arguments list,
- run(): mark may be object: arguments -> if(mark:obj && mark.collee)mark={run:mark/mark.callee.name,...arguments}
*/

import util from 'util';

// todo: test if this function exports module keys & work correctly
export function exportAll(module: any) {
  /* todo:
  Object.keys(module).forEach(key => {
    exports[key] = module[key];
    // todo:  export const [key] = module[key];
  });
  */
}

/**
 * formt and flatten objects before logging it in the console, instead of just showing [Object]
 * @method log
 * @param  obj          [description]
 * @param  type="error" any console method, such as log, error, warn
 */

export function log(obj: any, type = 'error'): void {
  obj = util.inspect(obj, {
    maxArrayLength: null,
    depth: null,
    colors: true,
    breakLength: 100
    // compact: false,
  });

  console[type](obj);
}

/**
 * get the current timestamp in milli seconds
 * @method now
 * @return timestamp in milli seconds
 */
export function now(): number {
  return Math.round(new Date().getTime());
}

export function isIterable(obj: any): boolean {
  return (
    obj &&
    (obj instanceof Array ||
      (typeof obj != 'string' && typeof obj[Symbol.iterator] == 'function'))
    // todo: or obj={...}
  );
}

/**
 * check if the array includes the element
 * @method inArray
 * @param  element        the element that you want to search for
 * @param  array       [description]
 * @param  caseSensitive applies only if the element is string
 * @return boolean
 */
export function inArray(
  element: any,
  array: Array<any> | object | string,
  caseSensitive?: boolean // case sensitive
): boolean {
  if (!caseSensitive && typeof element == 'string') {
    element = element.toLowerCase();
  }
  if (typeof array == 'string') {
    return !!array.indexOf(element);
  } // !! to convert umber to boolean
  if (isIterable(array)) {
    for (let i = 0; i < (array as Array<any>).length; i++) {
      return (
        array[i] == element ||
        (!caseSensitive &&
          typeof array[i] == 'string' &&
          array[i].toLowerCase() == element)
      );
    }
  } else if (typeof array == 'object') {
    return element in array;
  }
}

/**
 * to pause a js function make it async and use await sleep(duration);
 * @examples async function test(){console.log(1); await sleep(2); console.log(1);}
 * @method sleep
 * @param  seconds [description]
 * @return [description]
 */
export function sleep(seconds?: number): Promise<void> {
  // ex: this.run(async fn(){await this.sleep(1); alert(1);})
  return new Promise(resolve => setTimeout(resolve, (seconds || 2) * 1000));
}

/**
 * return the object type. i.e: string, array, number, ...
 * @examples examples:
 *  {} => object
 *  [] => array
 *  null => null
 *  function(){} => function
 *  1 => number
 *  "x", 'x', `x` => string
 * @method objectType
 * @param  obj        [description]
 * @return [description]
 */

export function objectType(obj: any): string {
  return Object.prototype.toString
    .call(obj)
    .replace('[object ', '')
    .replace(']', '')
    .toLowerCase();
  /*
    examples:
   {} => object
   [] => array
   null => null
   function(){} => function
   1 => number
   "x", 'x', `x` => string
   */
}

export function isEmpty(obj: any): boolean {
  return typeof obj == 'undefined' || inArray(obj, ['', null, [], {}]);
}

export function merge(target: any, ...obj: any[]): any {
  // merge objects,arrays,classes (must besame type) ;
  // don't use "arguments" in an arrow functions, also don't use 'this' inside a normal function, so we declare a new variable = arguments
  const _arg = arguments; // the arguments of merge() not run()
  return this.run({ run: 'merge', ...arguments }, () => {
    const type = objectType(target); // todo: error: Cannot read property 'objectType' of undefined
    for (let i = 1; i < _arg.length; i++) {
      if (this.objectType(_arg[i]) !== type) {
        return target;
      }
    }
    if (type == 'array') {
      target = target.concat(...obj);
    } else if (type == 'object') {
      // target=Object.assign(target,...obj) //later objects dosen't override previous ones
      for (let i = 1; i < _arg.length; i++) {
        for (const p in _arg[i]) {
          target[p] = _arg[i][p]; // to override current values
        }
      }
    } else if (type == 'class') {
      // add or override target's methods & properties
    }

    return target;
  });
}

export function json(data: string | object) {
  if (typeof data == 'string') {
    if (data.trim().charAt(0) == '{') {
      return JSON.parse(data);
    }
    if (
      data
        .split('.')
        .pop()
        .toLowerCase() == 'json'
    ) {
      return require(data);
    }
    // load a .json file,
    // todo: ES2015 modules don't allow dynamic imports, and causes typescript error:
    // 'Critical dependency: the request of a dependency is an expression'
    // todo: move this part to files class
    data = require('fs').readFileSync(data);
    return JSON.parse(data as string);
  } else {
    return JSON.stringify(data);
  }
  // nx: if(string & !start)
}
