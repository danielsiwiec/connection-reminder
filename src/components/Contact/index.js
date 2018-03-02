import React, {Component} from 'react'

class Contact extends Component {
  render() {
    return (
      <div>
        {this.props.contact.name} {this.renderTags(this.props.contact.tags)}
            <button onClick={() => this.props.check(this.props.index)}>Check</button>
            <button onClick={() => this.props.bump(this.props.index)}>Bump</button>
            <button onClick={() => this.props.remove(this.props.index)}>Remove</button>
      </div>
    )
  }

  renderTags(tags) {
    if (tags && tags.length > 0) {
      return `[${tags.join(', ')}]`
    }
  }
}

export default Contact