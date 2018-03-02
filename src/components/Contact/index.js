import React, {Component} from 'react'
import moment from 'moment'
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip'

class Contact extends Component {
  render() {
    return (
      <div>
        {this.props.contact.name} {this.renderTags(this.props.contact.tags)}
        {this.props.contact.lastChecked &&
          <span>Last checked: {moment(this.props.contact.lastChecked).fromNow()}</span>
        }
        <Button color='primary' onClick={() => this.props.check(this.props.index)}>Check</Button>
        <Button color='secondary' onClick={() => this.props.bump(this.props.index)}>Bump</Button>
        <Button onClick={() => this.props.remove(this.props.index)}>Remove</Button>
      </div>
    )
  }

  renderTags(tags) {
    if (tags && tags.length > 0) {
      return tags.map(tag => <Chip label={`#${tag}`} />)
    }
  }
}

export default Contact