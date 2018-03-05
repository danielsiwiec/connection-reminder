import React, {Component} from 'react'
import Contact from '../Contact'
import List from 'material-ui/List'

export default (props) => {
  return (
    <List>
      {props.contacts.map((contact, index) => {
        return (
          <Contact key={index} contact={contact} check={props.check}
          bump={props.bump} remove={props.remove} index={index} />
        )
      })}
    </List>
  )
}