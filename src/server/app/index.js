import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import contactsDao from '../dao'
import validateToken from '../validateToken'

const app = express();

app.use(bodyParser.json())

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

app.use('/contacts', validateToken)

app.get('/contacts', (request, response) => {
  contactsDao.get(request.login.email)
  .then(user => user && user.contacts || [])
  .then(contacts => response.json({contacts}))
  .catch((error) => {
    console.log(error)
    response.status(500).end()
  })
})

app.post('/contacts', (request, response) => {
  contactsDao.save(request.login.email, request.body.contacts)
  .then(() => response.end())
  .catch((error) => {
    console.log(error)
    response.status(500).end()
  })
})

export default app