import React, {Component} from 'react';
import styles from './styles.scss';

class ContactList extends Component {
  render() {
    return (
      <section>
        <ul>
        {this.props.contacts.map((contact, index) => {
          return <li key={index}>{contact}
            <button onClick={this.bump(index)}>Bump</button>
            <button onClick={this.remove(index)}>Remove</button>
          </li>
        })}
        </ul>
      </section>
    );
  }

  bump(key) {
    return () => this.props.bump(key)
  }

  remove(key) {
    return () => this.props.remove(key)
  }
}

export default ContactList;
