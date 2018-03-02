import React, {Component} from 'react';
import styles from './styles.scss';

class ContactList extends Component {
  render() {
    return (
      <section>
        <ul>
        {this.props.contacts.map((contact, index) => {
          return <li key={index}>{contact.name}
            <button onClick={() => this.props.check(index)}>Check</button>
            <button onClick={() => this.props.bump(index)}>Bump</button>
            <button onClick={() => this.props.remove(index)}>Remove</button>
          </li>
        })}
        </ul>
      </section>
    );
  }
}

export default ContactList;
