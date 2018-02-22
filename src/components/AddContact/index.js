import React, {Component} from 'react'

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let newContact = this.parseContact(this.state.value)
    this.props.onclick(newContact)
    this.setState({value: ''})
  }

  parseContact(contactString) {
    let hashRegExp = /#\w*/g
    let stripHashSign = string => string.replace('#', '')
    let tags = (contactString.match(hashRegExp) || []).map(stripHashSign)
    let contactName = contactString.replace(hashRegExp, '').trim()
    return { name: contactName, tags }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          New Contact:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default AddContact