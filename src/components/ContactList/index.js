import React, {Component} from 'react'
import Contact from '../Contact'
import List from 'material-ui/List'

class ContactList extends Component {
  render() {
    return (
      <List>
        {this.props.contacts.map((contact, index) => {
          return (
            <Contact key={index} contact={contact} check={this.props.check}
            bump={this.props.bump} remove={this.props.remove} index={index} />
          )
        })}
      </List>
    )
  }
}

export default ContactList;
