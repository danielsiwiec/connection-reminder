import 'babel-polyfill';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import RouterContext from 'react-router/lib/RouterContext';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import match from 'react-router/lib/match';
import template from './template';
import routes from '../routes';
import contactsService from './services/contactsService'

const clientAssets = require(KYT.ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require
const port = process.env.PORT || parseInt(KYT.SERVER_PORT, 10);
const app = express();

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(compression());
app.use(bodyParser.json())

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

app.get('/contacts', (request, response) => {
  contactsService.list(request.query.token)
  .then(contacts => response.json({contacts}))
  .catch((error) => {
    console.log(error)
    response.status(500).end()
  })
})

app.post('/contacts', (request, response) => {
  contactsService.update(request.query.token, request.body.contacts)
  .then(() => response.end())
  .catch((error) => {
    console.log(error)
    response.status(500).end()
  })
})



// Setup server side routing.
app.get('*', (request, response) => {
  const history = createMemoryHistory(request.originalUrl);

  match({ routes, history }, (error, redirectLocation, renderProps) => {
    if (error) {
      response.status(500).send(error.message);
    } else if (redirectLocation) {
      response.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`);
    } else if (renderProps) {
      // When a React Router route is matched then we render
      // the components and assets into the template.
      response.status(200).send(
        template({
          root: renderToString(<RouterContext {...renderProps} />),
          manifestJSBundle: clientAssets['manifest.js'],
          mainJSBundle: clientAssets['main.js'],
          vendorJSBundle: clientAssets['vendor.js'],
          mainCSSBundle: clientAssets['main.css'],
        })
      );
    } else {
      response.status(404).send('Not found');
    }
  });
});

app.listen(port, () => {
  console.log(`✅  server started on port: ${port}`); // eslint-disable-line no-console
});