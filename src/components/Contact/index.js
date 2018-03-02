import React, {Component} from 'react'
import moment from 'moment'
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip'
import TableRow from 'material-ui/Table/TableRow'
import TableCell from 'material-ui/Table/TableCell'

class Contact extends Component {
  render() {
    return (
      <TableRow>
        <TableCell>
          {this.props.contact.name} {this.renderTags(this.props.contact.tags)}
          {this.props.contact.lastChecked &&
            <span>Last checked: {moment(this.props.contact.lastChecked).fromNow()}</span>
          }
        </TableCell>
        <TableCell>
          <Button color='primary' onClick={() => this.props.check(this.props.index)}>Check</Button>
          <Button onClick={() => this.props.bump(this.props.index)}>Bump</Button>
          <Button color='secondary' onClick={() => this.props.remove(this.props.index)}>Remove</Button>
        </TableCell>
      </TableRow>
    )
  }

  renderTags(tags) {
    if (tags && tags.length > 0) {
      return tags.map(tag => <Chip label={`#${tag}`} />)
    }
  }
}

export default Contact