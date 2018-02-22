import mongodb from 'mongodb'

const DATABASE = 'heroku_l84l6v6d'
const CONTACTS_COLLECTION = "contacts"
let db

function get(username) {
  return db.collection(CONTACTS_COLLECTION).findOne({username})
}

function save(username, update) {
  return db.collection(CONTACTS_COLLECTION).updateOne({username}, {$set: {contacts: update}}, {upsert: true})
}

console.log(`MongoDB URL found at ${process.env.MONGODB_URI}`)
mongodb.MongoClient.connect(process.env.MONGODB_URI)
.then(connection => {
  db = connection.db(DATABASE)
  console.log('Database connection ready')
})
.catch(error => {
  console.log(error)
  process.exit(1)
})

export default {get, save}