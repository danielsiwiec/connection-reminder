import moment from 'moment'

let addContact = (contacts, newContact) => {
  return [newContact, ...contacts]
}

let checkContact = (contacts, index) => {
  let checked = contacts.splice(index, 1)[0]
  checked.lastChecked = moment().valueOf()
  return [...contacts, checked]
}

let bumpContact = (contacts, index) => {
  let bumpBy = 2
  let bumped = contacts.splice(index, 1)[0]
  let lastPart = contacts.splice(bumpBy + index)
  return [...contacts, bumped, ...lastPart]
}

let removeContact = (contacts, index) => {
  contacts.splice(index, 1)
  return contacts
}

export default {addContact, checkContact, bumpContact, removeContact}