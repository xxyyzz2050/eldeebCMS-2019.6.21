require('zone.js/dist/zone-node'); // todo: why?

import * as functions from 'firebase-functions';
import { enableProdMode } from '@angular/core';

enableProdMode();

// to test: https://us-central1-eldeebcms.cloudfunctions.net/helloWorld
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send(`Hello from Firebase!, process.cwd= ${process.cwd()}`);
});

// import express routes (i.e app.get(..)) from /dist/server
const universal = require('../server').app; // relative to /dist/browser/index.js
export const ssr = functions.https.onRequest(universal);
