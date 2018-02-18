import React, {Component} from 'react';
import styles from './styles.scss';
import ContactList from '../ContactList'
import AddContact from '../AddContact'

class Home extends Component {

  constructor() {
    super()
    this.state = {
      contacts: []
    }

    this.addContact = this.addContact.bind(this)
    this.fetchContacts = this.fetchContacts.bind(this)
    this.loginToGoogle = this.loginToGoogle.bind(this)
  }

  componentDidMount() {
    this.loginToGoogle()
    .then(login => {
      this.setState({login})
    })
    .then(this.fetchContacts)
  }

  render() {
    return (
      <section>
        <AddContact contacts={this.state.contacts} onclick={this.addContact}/>
        <ContactList contacts={this.state.contacts} />
      </section>
    )
  }

  loginToGoogle() {
    return googleyolo.retrieve({
      supportedAuthMethods: [
        "https://accounts.google.com",
        "googleyolo://id-and-password"
      ],
      supportedIdTokenProviders: [
        {
          uri: "https://accounts.google.com",
          clientId: "627854783760-thjum3jd8ulc08244o9211au5aqq4ar3.apps.googleusercontent.com"
        }
      ]
    })
  }

  fetchContacts() {
    fetch(`/contacts?token=${this.state.login.idToken}`)
      .then(results => results.json())
      .then(data => {
        this.setState({contacts: data.contacts})
      })
  }

  addContact(newContact) {
    this.setState({ contacts: [...this.state.contacts, newContact]})
    fetch(`/contacts?token=${this.state.login.idToken}`,{
      method: 'POST',
      body: JSON.stringify({contact: newContact}),
      headers: {
        'content-type': 'application/json'
      }
    })
  }
}



export default Home;
