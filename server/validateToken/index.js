import fetch from 'node-fetch'

function mockToken(req, res, next) {
  req.login = {
    email: 'mock'
  }
  next()
}

function validateToken(req, res, next) {
  let token = req.query.token
  return fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`)
  .then(response => {
    if (response.status != 200) {
      next(new Error("Token verification failed"))
    } else {
      return response.json()
    }
  })
  .then(login => {
    req.login = login
    next()
  })
}

export default process.env.mock === 'true' ? mockToken : validateToken