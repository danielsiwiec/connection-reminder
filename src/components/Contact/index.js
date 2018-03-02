import React, {Component} from 'react'
import moment from 'moment'
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import DoneIcon from 'material-ui-icons/Done'
import DeleteIcon from 'material-ui-icons/Delete'
import WatchLaterIcon from 'material-ui-icons/WatchLater'
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
          <IconButton onClick={() => this.props.check(this.props.index)}><DoneIcon color='primary' /></IconButton>
        </ListItemIcon>
        <ListItemIcon>
          <IconButton onClick={() => this.props.bump(this.props.index)}><WatchLaterIcon /></IconButton>
        </ListItemIcon>
        <ListItemIcon>
          <IconButton onClick={() => this.props.remove(this.props.index)}><DeleteIcon color='secondary'/></IconButton>
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