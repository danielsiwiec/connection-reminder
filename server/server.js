import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import next from 'next'
import serverApp from './app'
import validateToken  from './validateToken'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  server.use(bodyParser.json())
  server.use(compression())

  server.use('/contacts', validateToken)

  server.get('/features', serverApp.getFeatures)
  server.get('/contacts', serverApp.getContacts)
  server.post('/contacts', serverApp.postContact)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
