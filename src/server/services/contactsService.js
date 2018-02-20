import dao from './dao'

function list(login) {
  return dao.get(login.email)
}

function update(login, contacts) {
  return dao.save(login.email, contacts)
}

export default {list, update}