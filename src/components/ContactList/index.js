import React, {Component} from 'react'
import Contact from '../Contact'
import Table from 'material-ui/Table/Table'
import TableBody from 'material-ui/Table/TableBody'

class ContactList extends Component {
  render() {
    return (
      <Table>
        <TableBody>
          {this.props.contacts.map((contact, index) => {
            return (
              <Contact key={index} contact={contact} check={this.props.check}
              bump={this.props.bump} remove={this.props.remove} index={index} />
            )
          })}
        </TableBody>
      </Table>
    );
  }
}

export default ContactList;
