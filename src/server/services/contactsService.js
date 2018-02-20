import dao from './dao'
import fetch from 'node-fetch'

function list(token) {
  return validateToken(token)
  .then(login => dao.get(login.email))
}

function update(token, contacts) {
  return validateToken(token)
  .then(login => dao.save(login.email, contacts))
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

export default {list, update}