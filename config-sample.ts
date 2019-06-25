import { exportAll } from "eldeeb/general";

const local = false;
const mode = "dev";
const config = {
  root: "",
  firebase: {
    apiKey: "",
    authDomain: "eldeebcms.firebaseapp.com",
    databaseURL: "https://eldeebcms.firebaseio.com",
    projectId: "eldeebcms",
    storageBucket: "eldeebcms.appspot.com",
    messagingSenderId: "276170264260",
    appId: "1:276170264260:web:e0e0395a848981ba"
  },
  db: {
    type: "mongodb",
    auth: ["username", "password"],
    host: "cluster-test-kuwit.gcp.mongodb.net",
    srv: true,
    db: "test"
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
