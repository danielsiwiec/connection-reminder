import React from 'react'
import moment from 'moment'
import CheckCircle from 'material-ui-icons/CheckCircle'
import { withStyles } from 'material-ui/styles'
import {ListItem} from 'material-ui/List'

const styles = {
  lastConnected: {
    fontSize: '0.6rem',
    color: 'gray'
  }
}

function LastConnected(props) {
  const { classes } = props;  
  return (
    <ListItem classes={{root: classes.lastConnected}}>
      {renderLastCheckedText(props.date)}
      <CheckCircle fontSize={true} />
    </ListItem>
  )
}

function renderLastCheckedText(date) {
  return moment(date).fromNow()
}

export default withStyles(styles)(LastConnected)