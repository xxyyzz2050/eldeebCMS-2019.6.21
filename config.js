import path from "path";

//todo: tmp: just for test with `firebase serve`, it should give the root path, not the working directory path i.e /functions

console.log("=======\n", {
  ver: 12,
  __dirname,
  "process.cwd()": process.cwd(),
  "process.env.PWD": process.env.PWD,
  ".": path.resolve("."),
  basename: path.basename(__dirname),
  resolve: path.resolve(__dirname),
  //  "require.main.filename": path.dirname(require.main.filename),
  "process.argv[1]": process.argv[1]
});

export let firebase = {
  apiKey: "AIzaSyCxIOB2v53gGWYxaSrVkbRTT4G5_Gq-HEI",
  authDomain: "eldeebcms.firebaseapp.com",
  databaseURL: "https://eldeebcms.firebaseio.com",
  projectId: "eldeebcms",
  storageBucket: "eldeebcms.appspot.com",
  messagingSenderId: "276170264260",
  appId: "1:276170264260:web:e0e0395a848981ba"
};

export let db = {
  auth: ["xxyyzz2050", "Xx159753@@"],
  host: "cluster-test-kuwit.gcp.mongodb.net",
  srv: true, // todo: enabling srv mode causes that neither .then() or .catche() runs
  db: "test" //dev?test:articles
};

//default meta tags
export let meta = {
  name: "eldeebCMS",
  hashtag: "@eldeebCMS",
  baseUrl: "https://eldeebCMS.com/"
};

export default {
  root,
  firebase,
  db,
  meta
};
