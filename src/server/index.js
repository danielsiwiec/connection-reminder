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
import fetch from 'node-fetch'

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

const contacts = {}

app.get('/contacts', (request, response) => {
  validateToken(request.query.token)
  .then(login => {
    response.json({contacts: contacts[login.email] || []})
  })
  .catch(() => response.status(500).end())
})

app.post('/contacts', (request, response) => {
  validateToken(request.query.token)
  .then(login => {
    saveContacts(login.email, request.body.contacts)
    response.end()
  })
  .catch(() => response.status(500).end())
})

function saveContacts(email, update) {
  contacts[email] = update
}

function validateToken(token) {
  return fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
  .then(response => {
    if (response.status != 200) {
      throw new Error("Token verification failed")
    } else {
      return response.json()
    }
  })
}

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
