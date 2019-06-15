import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';

// for firebase
// import { readFileSync } from 'fs';
// import { renderModuleFactory } from '@angular/platform-server';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4200;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(
  'html',
  ngExpressEngine({
    // returns renderModuleFactory(path,options,callback)
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);
// firebase: now we use AngularFire

(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
/*
app.engine('html', (filePath, options, callback) => {
  // todo: use ngExpressEngine() as a second parameter
  renderModuleFactory(AppServerModuleNgFactory, {
    document: readFileSync(join(DIST_FOLDER, 'index.html')).toString(),
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
  }).then(html => {
    callback(null, html);
  });
});
*/

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get('/articles/api/*', async (req, res) => {
  // todo: GetArticlesService.getArticle(req.url)
  // todo: do we have to make the callback async?
  const GetArticlesAPI = require('./src/app/articles/get-articles.api')
    .GetArticlesAPI;
  await new GetArticlesAPI().get(req.url).then(data => res.json(data));
});

// Serve static files from /browser
app.get(
  '*.*',
  express.static(DIST_FOLDER, {
    maxAge: '1y'
  })
);

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
