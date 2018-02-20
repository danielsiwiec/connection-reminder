const contacts = {}

function get(username) {
  return contacts[username] || []
}

function save(username, update) {
  contacts[username] = update
}

export default {get, save}