import React, {Component} from 'react'
import moment from 'moment'
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import DoneIcon from 'material-ui-icons/Done'
import DeleteIcon from 'material-ui-icons/Delete'
import WatchLaterIcon from 'material-ui-icons/WatchLater'
import Tooltip from 'material-ui/Tooltip'
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
          <IconButton onClick={() => this.props.check(this.props.index)}>
            <Tooltip title='Push to bottom'>
              <DoneIcon color='primary' />
            </Tooltip>
          </IconButton>
        </ListItemIcon>
        <ListItemIcon>
          <IconButton onClick={() => this.props.bump(this.props.index)}>
            <Tooltip title='Move down'>
              <WatchLaterIcon />
            </Tooltip>
          </IconButton>
        </ListItemIcon>
        <ListItemIcon>
          <IconButton onClick={() => this.props.remove(this.props.index)}>
            <Tooltip title='Delete'>
              <DeleteIcon color='secondary'/>
            </Tooltip>
          </IconButton>
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