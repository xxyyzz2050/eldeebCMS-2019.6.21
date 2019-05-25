//run with node: >node test

//import nativeMongoose from "mongoose";
const nativeMongoose = require("mongoose");
nativeMongoose
  .connect(
    "mongodb+srv://xxyyzz2050:Xx159753%2540%2540@cluster-test-kuwit.gcp.mongodb.net/test"
  )
  .then(() => console.log("Native connected"))
  .catch(err => console.log(err));
