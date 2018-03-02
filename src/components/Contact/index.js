import React, {Component} from 'react'
import moment from 'moment'
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import DoneIcon from 'material-ui-icons/Done'
import DeleteIcon from 'material-ui-icons/Delete'
import WatchLaterIcon from 'material-ui-icons/WatchLater'
import Tooltip from 'material-ui/Tooltip'
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

const styles = {
  lastConnected: {
    fontSize: '0.6rem',
    color: 'gray'
  }
};

function Contact(props) {
  const { classes } = props;
  return (
    <ListItem>
      <ListItemText primary={renderContactText(props.contact)} />
      {props.contact.lastChecked &&
      <ListItemText classes={{primary: classes.lastConnected}} primary={renderLastCheckedText(props.contact.lastChecked)} />}
      <ListItem>{renderTags(props.contact.tags)}</ListItem>
      <ListItemIcon>
        <IconButton onClick={() => props.check(props.index)}>
          <Tooltip title='Mark as done'>
            <DoneIcon color='primary' />
          </Tooltip>
        </IconButton>
      </ListItemIcon>
      <ListItemIcon>
        <IconButton onClick={() => props.bump(props.index)}>
          <Tooltip title='Move down'>
            <WatchLaterIcon />
          </Tooltip>
        </IconButton>
      </ListItemIcon>
      <ListItemIcon>
        <IconButton onClick={() => props.remove(props.index)}>
          <Tooltip title='Delete'>
            <DeleteIcon color='secondary'/>
          </Tooltip>
        </IconButton>
      </ListItemIcon>
    </ListItem>
  )
}

function renderContactText(contact) {
  return contact.name
}

function renderLastCheckedText(lastChecked) {
  return `Connected ${moment(lastChecked).fromNow()}`
}

function renderTags(tags) {
  if(tags && tags.length > 0) {
    return tags.map((tag, index) => <Chip key={index} label={`#${tag}`} />)
  }
}

export default withStyles(styles)(Contact)