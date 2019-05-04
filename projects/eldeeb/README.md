# Eldeeb library

a library for common tasks, such as databases, files, data, ... compatible with angular but can be used in any node.js

written in TypeScript to provide a good typed code, but you can use the compiled js code located in 'dist' dir.

used in [eldeebCMS project](https://github.com/xxyyzz2050/eldeebCMS), a modern CMS build on [Angular Uiversal](https://angular.io)

# examples

let eldeeb = new eldeeb({ log:true, debug: false });

eldeeb.db("mongoDB",{/_conection options_/}).then(..)

eldeeb.run("test",()=>{/_ run a function or a promise and it will log details about run process _/})

eldeeb.promise([()=>getData(),()=>getAnotherData()]).done(..)

## install

run `npm i eldeeb` or `npm i -g eldeeb`.

## contributing

your contributing is always welcome.
