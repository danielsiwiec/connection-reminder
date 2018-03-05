import contactsDao from '../dao'
import features from '../features'

let getFeatures = (request, response) => {
  response.json(features)
}

let getContacts = (request, response) => {
  contactsDao.get(request.login.email)
  .then(user => user && user.contacts || [])
  .then(contacts => response.json({contacts}))
  .catch((error) => {
    console.log(error)
    response.status(500).end()
  })
}

let postContact = (request, response) => {
  contactsDao.save(request.login.email, request.body.contacts)
  .then(() => response.end())
  .catch((error) => {
    console.log(error)
    response.status(500).end()
  })
}

export default {getFeatures, getContacts, postContact}