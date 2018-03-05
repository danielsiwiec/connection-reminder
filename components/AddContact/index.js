import React, {Component} from 'react'
import Input from 'material-ui/Input'
import IconButton from 'material-ui/IconButton'
import PersonAdd from 'material-ui-icons/PersonAdd'
import Tooltip from 'material-ui/Tooltip'

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
    let newContact = parseContact(this.state.value)
    this.props.onclick(newContact)
    this.setState({value: ''})
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <Input autoFocus={true} value={this.state.value} placeholder='Name' onChange={this.handleChange} />
        <Tooltip title='Add contact'>
          <IconButton type='submit' color='primary' >
            <PersonAdd />
          </IconButton>
        </Tooltip>
      </form>
    )
  }
}

function parseContact(contactString) {
  let hashRegExp = /#\w*/g
  let stripHashSign = string => string.replace('#', '')
  let tags = (contactString.match(hashRegExp) || []).map(stripHashSign)
  let contactName = contactString.replace(hashRegExp, '').trim()
  return { name: contactName, tags }
}

export default AddContact