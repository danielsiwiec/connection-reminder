import 'babel-polyfill'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import compression from 'compression'
import React from 'react'
import { renderToString } from 'react-dom/server'
import RouterContext from 'react-router/lib/RouterContext'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import match from 'react-router/lib/match'

import template from './template'
import routes from '../routes'

import validateToken from './validateToken'
import serverApp from './app'

const app = express()

app.disable('x-powered-by')

app.use(compression())
app.use(bodyParser.json())
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)))

app.use('/contacts', validateToken)

app.get('/features', serverApp.getFeatures)
app.get('/contacts', serverApp.getContacts)
app.post('/contacts', serverApp.postContact)


const clientAssets = require(KYT.ASSETS_MANIFEST) // eslint-disable-line import/no-dynamic-require

app.get('*', (request, response) => {
  const history = createMemoryHistory(request.originalUrl)

  match({ routes, history }, (error, redirectLocation, renderProps) => {
    if (error) {
      response.status(500).send(error.message)
    } else if (redirectLocation) {
      response.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
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
      )
    } else {
      response.status(404).send('Not found')
    }
  })
})

const port = process.env.PORT || parseInt(KYT.SERVER_PORT, 10)

app.listen(port, () => {
  console.log(`✅  server started on port: ${port}`) // eslint-disable-line no-console
})
