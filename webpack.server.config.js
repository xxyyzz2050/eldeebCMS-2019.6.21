/*
creats dist/server.js contains our express server (i.e /server.ts)
as the entry file, and all other files it uses, such as get-articles.api.ts
or other file it requires
from: https://github.com/angular/angular-cli/issues/7200
 */

const path = require("path");
const webpack = require("webpack");

//this plugin makes webpack use paths that defined in tsconfig.ts
//https://github.com/dividab/tsconfig-paths-webpack-plugin
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "none",
  entry: {
    // This is our Express server for Dynamic universal
    server: "./server.ts"
  },
  target: "node",
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.resolve("."), "node_modules"],
    plugins: [new TsconfigPathsPlugin()]
  },
  optimization: {
    minimize: false
  },
  output: {
    // Puts the output at the root of the dist folder
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    library: "app",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" },
      {
        // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
        // Removing this will cause deprecation warnings to appear.
        test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
        parser: { system: true }
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, "src"), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, "src"),
      {}
    ) /*
//ReferenceError: window is not defined  https://github.com/ui-router/angular/issues/134#issuecomment-310699942
new webpack.DefinePlugin({
  path: undefined,
  window: undefined,
  document: undefined,
  location: JSON.stringify({
    protocol: "https",
    host: `localhost`
  })
})*/
  ]
};
