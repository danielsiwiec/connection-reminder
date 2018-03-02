import React, {Component} from 'react';
import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid'
import ContactList from '../ContactList'
import AddContact from '../AddContact'
import backendClient from '../../services/backendClient'
import googleLogin from '../../services/googleLogin'
import contactsHelper from '../../services/contactsHelper'

class App extends Component {

  constructor() {
    super()
    this.state = {
      contacts: []
    }

    this.addContact = this.addContact.bind(this)
    this.checkContact = this.checkContact.bind(this)
    this.bumpContact = this.bumpContact.bind(this)
    this.removeContact = this.removeContact.bind(this)
    this.syncWithBackend = this.syncWithBackend.bind(this)
  }

  componentDidMount() {
    backendClient.loadFeatures()
    .then(features => this.setState({features}))
    .then(() => googleLogin(this.state.features.isMock))
    .then(login => this.setState({login}))
    .then(() => backendClient.fetchUserData(this.state.login.idToken))
    .then(data => this.setState({contacts: data.contacts || []}))
  }

  render() {
    return (
      <Grid>
        <Reboot />
        <Grid item xs={12}>
          <Grid container justify='center'>
            <script src="https://smartlock.google.com/client"></script>
            <AddContact contacts={this.state.contacts} onclick={this.addContact}/>
            <ContactList contacts={this.state.contacts}
              check={this.checkContact} 
              remove={this.removeContact}
              bump={this.bumpContact} />
          </Grid>
        </Grid>
      </Grid>
    )
  }

  addContact(newContact) {
    this.setState({ contacts: contactsHelper.addContact(this.state.contacts, newContact)}, this.syncWithBackend)
  }

  checkContact(index) {
    this.setState({contacts: contactsHelper.checkContact(this.state.contacts, index)}, this.syncWithBackend)
  }

  bumpContact(index) {
    this.setState({contacts: contactsHelper.bumpContact(this.state.contacts, index)}, this.syncWithBackend)
  }

  removeContact(index) {
    this.setState({contacts: contactsHelper.removeContact(this.state.contacts, index)}, this.syncWithBackend)
  }

  syncWithBackend() {
    return backendClient.syncWithBackend(this.state.login.idToken, this.state.contacts)
  }
}

export default App;
