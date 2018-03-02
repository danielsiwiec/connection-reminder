import React, {Component} from 'react';
import styles from './styles.scss';
import ContactList from '../ContactList'
import AddContact from '../AddContact'

const GOOGLE_YOLO_CONFIGURATION = {
  supportedAuthMethods: [
    'https://accounts.google.com'
  ],
  supportedIdTokenProviders: [
    {
      uri: 'https://accounts.google.com',
      clientId: '627854783760-thjum3jd8ulc08244o9211au5aqq4ar3.apps.googleusercontent.com'
    }
  ]
}

class App extends Component {

  constructor() {
    super()
    this.state = {
      contacts: []
    }

    this.addContact = this.addContact.bind(this)
    this.fetchUserData = this.fetchUserData.bind(this)
    this.loadFeatures = this.loadFeatures.bind(this)
    this.loginToGoogle = this.loginToGoogle.bind(this)
    this.checkContact = this.checkContact.bind(this)
    this.removeContact = this.removeContact.bind(this)
    this.syncWithBackend = this.syncWithBackend.bind(this)
  }

  componentDidMount() {
    this.loadFeatures()
    .then(features => this.setState({features}))
    .then(this.loginToGoogle)
    .then(login => this.setState({login}))
    .then(this.fetchUserData)
    .then(data => this.setState({contacts: data.contacts || []}))
  }

  render() {
    return (
      <div>
        <script src="https://smartlock.google.com/client"></script>
        <div className={styles.content}>
          <section>
            <AddContact contacts={this.state.contacts} onclick={this.addContact}/>
            <ContactList contacts={this.state.contacts} check={this.checkContact} remove={this.removeContact} />
          </section>
        </div>
      </div>
    )
  }

  loadFeatures() {
    return fetch('/features')
      .then(response => {
        if (response.status == 200) {
          return response.json()
        } else {
          throw new Error("Error fetching contacts")
        }
      }) 
  }

  loginToGoogle() {
    if (this.state.features.isMock) {
      return Promise.resolve({email: 'mock'})
    } else {
      return googleyolo.retrieve(GOOGLE_YOLO_CONFIGURATION)
      .then(login => login, error => {
        if (error.type === 'noCredentialsAvailable'){
          return googleyolo.hint(GOOGLE_YOLO_CONFIGURATION)
        }
      })
    }
  }

  fetchUserData() {
    return fetch(`/contacts?token=${this.state.login.idToken}`)
      .then(response => {
        if (response.status == 200) {
          return response.json()
        } else {
          throw new Error("Error fetching contacts")
        }
      })
  }

  addContact(newContact) {
    this.setState({ contacts: [...this.state.contacts, newContact]}, this.syncWithBackend)
  }

  checkContact(index) {
    let removed = this.state.contacts.splice(index, 1)
    this.setState({contacts: [...this.state.contacts, ...removed]}, this.syncWithBackend)
  }

  removeContact(index) {
    let removed = this.state.contacts.splice(index, 1)
    this.setState({contacts: this.state.contacts}, this.syncWithBackend)
  }

  syncWithBackend() {
    fetch(`/contacts?token=${this.state.login.idToken}`,{
      method: 'POST',
      body: JSON.stringify({contacts: this.state.contacts}),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(response => {
      if (response.status != 200) {
        throw new Error("Sync error")
      }
    })
  }
}



export default App;
