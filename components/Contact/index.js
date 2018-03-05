import React from 'react'

import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import Tooltip from 'material-ui/Tooltip'
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import Button from 'material-ui/Button'

import DoneIcon from 'material-ui-icons/Done'
import WatchLaterIcon from 'material-ui-icons/WatchLater'
import DeleteIcon from 'material-ui-icons/Delete'

import LastConnected from '../LastConnected'

export default props => {
  return (
    <ListItem>
      <ListItemText primary={props.contact.name} />
      {props.contact.lastChecked &&  <LastConnected date={props.contact.lastChecked}/> }
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

function renderTags(tags) {
  if(tags && tags.length > 0) {
    return tags.map((tag, index) => <Chip key={index} label={`#${tag}`} />)
  }
}