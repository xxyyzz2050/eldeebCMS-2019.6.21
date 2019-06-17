/* Start writing Firebase Functions
https://firebase.google.com/docs/functions/typescript
*/

/*
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
*/

require('zone.js/dist/zone-node');

const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const { enableProdMode } = require('@angular/core');
const { renderModuleFactory } = require('@angular/platform-server');
const { AppServerModuleNgFactory } = require('../server/main');

enableProdMode();

const index = require('fs')
  .readFileSync(path.resolve(__dirname, './index.html'), 'utf8')
  .toString();

const app = express();

app.get('**', (req, res) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    url: req.path,
    document: index
  }).then(html => res.status(200).send(html));
});

exports.ssr = functions.https.onRequest(app);
/*
const universal = require(`${process.cwd()}/dist/server`).app;
export const ssr = functions.https.onRequest(universal);
 */
