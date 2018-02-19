import React, {Component} from 'react';
import styles from './styles.scss';

class ContactList extends Component {
  render() {
    return (
      <section>
        <ul>
        {this.props.contacts.map((contact, index) => {
          return <li key={index}>{contact}<button onClick={this.handleClick(index)}>Bump</button></li>
        })}
        </ul>
      </section>
    );
  }

  handleClick(key) {
    return () => this.props.bump(key)
  }
}

export default ContactList;
