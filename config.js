/*import path from "path";

//todo: tmp: just for test with `firebase serve`, it should give the root path, not the working directory path i.e /functions

console.log("=======\n", {
  ver: 14,
  //__dirname,
  //  "process.cwd()": process.cwd(),
  //  "process.env.PWD": process.env.PWD,
  ".": path.resolve("."),
  //  basename: path.basename(__dirname),
  //  resolve: path.resolve(__dirname),
  //  "require.main.filename": path.dirname(require.main.filename),
  "process.argv[1]": process.argv[1]
});
export const root = path.resolve(); //todo: when run `firebase serve` it refers to /functions not root dir
*/

import { exportAll } from "eldeeb/general";

const local = false;
const mode = "dev";
const config = {
  root: "", //todo: path to this file
  firebase: {
    apiKey: "AIzaSyCxIOB2v53gGWYxaSrVkbRTT4G5_Gq-HEI",
    authDomain: "eldeebcms.firebaseapp.com",
    databaseURL: "https://eldeebcms.firebaseio.com",
    projectId: "eldeebcms",
    storageBucket: "eldeebcms.appspot.com",
    messagingSenderId: "276170264260",
    appId: "1:276170264260:web:e0e0395a848981ba"
  },
  db: {
    type: "mongodb",
    auth: ["xxyyzz2050", "Xx159753@@"],
    host: "cluster-test-kuwit.gcp.mongodb.net",
    srv: true, // todo: enabling srv mode causes that neither .then() or .catche() runs
    db: "test" //dev?test:articles
  },
  meta: {
    name: "eldeebCMS",
    hashtag: "@eldeebCMS",
    baseUrl: local
      ? "http://localhost:4200/"
      : "https://eldeebcms.firebaseapp.com/", //"https://www.eldeebCMS.com/"
    author: {
      name: "",
      email: "",
      url: ""
    }
  }
};

export default config;
exportAll(config); //todo: this function dosent export anything, so we temporary exports all members manually
export const root = config.root;
export const firebase = config.firebase;
export const db = config.db;
export const meta = config.meta;
