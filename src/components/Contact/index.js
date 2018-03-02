import React, {Component} from 'react'
import moment from 'moment'
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import Done from 'material-ui-icons/Done'
import Delete from 'material-ui-icons/Delete'
import WatchLater from 'material-ui-icons/WatchLater'
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'

class Contact extends Component {
  render() {
    return (
      <ListItem>
        <ListItemText primary={this.renderContactText()} />
        {this.props.contact.lastChecked &&
        <ListItemText primary={this.renderLastCheckedText()} />}
        {this.props.contact.tags &&
        <ListItem>{this.renderTags()}</ListItem>}
        <ListItemIcon>
          <IconButton color='primary' onClick={() => this.props.check(this.props.index)}><Done /></IconButton>
        </ListItemIcon>
        <ListItemIcon>
          <IconButton onClick={() => this.props.bump(this.props.index)}><WatchLater /></IconButton>
        </ListItemIcon>
        <ListItemIcon>
          <IconButton color='secondary' onClick={() => this.props.remove(this.props.index)}><Delete /></IconButton>
        </ListItemIcon>
      </ListItem>
    )
  }

  renderContactText() {
    let contact = this.props.contact
    return contact.name
  }

  renderLastCheckedText() {
    return `Last checked: ${moment(this.props.contact.lastChecked).fromNow()}`
  }

  renderTags() {
    let tags = this.props.contact.tags
    return tags.map((tag, index) => <Chip key={index} label={`#${tag}`} />)
  }
}

export default Contact