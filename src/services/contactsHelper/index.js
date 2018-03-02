let addContact = (contacts, newContact) => {
  return [...contacts, newContact]
}

let checkContact = (contacts, index) => {
  let removed = contacts.splice(index, 1)
  return [...contacts, ...removed]
}

let bumpContact = (contacts, index) => {
  let bumpBy = 2
  let removed = contacts.splice(index, 1)
  let lastPart = contacts.splice(bumpBy + index)
  return [...contacts, ...removed, ...lastPart]
}

let removeContact = (contacts, index) => {
  contacts.splice(index, 1)
  return contacts
}

export default {addContact, checkContact, bumpContact, removeContact}