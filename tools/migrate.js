let migration = doc => {
  let transformedContacts = doc.contacts.map(contact => {
    return {name: contact, tags: []}
  })
  doc.contacts = transformedContacts
}

db.contacts.find()
.map(doc => {migration(doc); return doc})
.map(doc => db.contacts.save(doc))

db.contacts.findOne()