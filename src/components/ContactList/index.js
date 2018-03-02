import React, {Component} from 'react'
import Contact from '../Contact'
import styles from './styles.scss'

class ContactList extends Component {
  render() {
    return (
      <section>
        <ul>
        {this.props.contacts.map((contact, index) => {
          return (
          <li key={index}>
            <Contact contact={contact} check={this.props.check}
            bump={this.props.bump} remove={this.props.remove} index={index} />
          </li>)
        })}
        </ul>
      </section>
    );
  }
}

export default ContactList;
