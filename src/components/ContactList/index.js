import React, {Component} from 'react';
import styles from './styles.scss';

class ContactList extends Component {
  render() {
    return (
      <section>
        <ul>
        {this.props.contacts.map(contact => {
          return <li key={contact}>{contact}</li>
        })}
        </ul>
      </section>
    );
  }
}

export default ContactList;
