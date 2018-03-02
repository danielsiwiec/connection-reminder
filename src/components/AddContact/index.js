import React, {Component} from 'react'
import Input from 'material-ui/Input'
import Button from 'material-ui/Button'
import PersonAdd from 'material-ui-icons/PersonAdd'

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  submit(event) {
    event.preventDefault()
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
      <form onSubmit={this.submit}>
        <Input autoFocus={true} value={this.state.value} placeholder='Name' onChange={this.handleChange} />
        <Button type='submit' color='primary' ><PersonAdd /></Button>
      </form>
    )
  }
}

export default AddContact