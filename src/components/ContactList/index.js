import React, {Component} from 'react';
import styles from './styles.scss';

class ContactList extends Component {
  constructor() {
    super();
    this.state = {
      contacts: []
    }
  }

  componentDidMount() {
    fetch('/contacts')
    .then(results => results.json())
    .then(data => {
      this.setState({contacts: data.contacts})
    })
  }

  render() {
    return (
      <section>
        <ul>
        {this.state.contacts.map(contact => {
          return <li key={contact}>{contact}</li>
        })}
        </ul>
      </section>
    );
  }
}

export default ContactList;
