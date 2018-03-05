import mongodb from 'mongodb'
import features from '../features'

class MockDB {
  constructor() {
    this.db = {}
    console.log('Using in-memory database')
  }

  get(username) {
    return Promise.resolve(this.db[username])
  }

  save(username, update) {
    this.db[username] = {contacts: update}
    return Promise.resolve()
  }
}

class MongoDB {
  constructor() {
    this.DATABASE = 'heroku_l84l6v6d'
    this.CONTACTS_COLLECTION = "contacts"
    console.log(`MongoDB URL found at ${process.env.MONGODB_URI}`)
    mongodb.MongoClient.connect(process.env.MONGODB_URI)
    .then(connection => {
      this.db = connection.db(this.DATABASE)
      console.log('Database connection ready')
    })
    .catch(error => {
      console.log(error)
      process.exit(1)
    })
  }

  get(username) {
    return this.db.collection(this.CONTACTS_COLLECTION).findOne({username})
  }

  save(username, update) {
    return this.db.collection(this.CONTACTS_COLLECTION).updateOne({username}, {$set: {contacts: update}}, {upsert: true})
  }
}

let dbClient = features.isMock ? new MockDB() : new MongoDB()

export default dbClient