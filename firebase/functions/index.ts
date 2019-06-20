require('zone.js/dist/zone-node'); // todo: why?

import * as functions from 'firebase-functions';
import { enableProdMode } from '@angular/core';

enableProdMode();

// to test: https://us-central1-eldeebcms.cloudfunctions.net/<functionName>
export const test = functions.https.onRequest((request, response) => {
  response.send('firebase function works');
});

// import express routes (i.e app.get(..)) from /dist/server
const universal = require('../server').app; // relative to /dist/browser/index.js, todo: $root/dist/server.js
export const ssr = functions.https.onRequest(universal);
