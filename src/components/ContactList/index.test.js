import React from 'react'
import { shallow } from 'enzyme'
import ContactList from './'

describe('ContactList', () => {
  it('should render list items', () => {
    let contacts = [{name: 'Bob'}, {name: 'Joe'}]
    const wrapper = shallow(<ContactList contacts={contacts} />)
    expect(wrapper.find('li').length).toBe(2)
    expect(wrapper.find('ul').childAt(0).text()).toContain('Bob')
    expect(wrapper.find('ul').childAt(1).text()).toContain('Joe')
  })

  it('should be fine with empty list', () => {
    const wrapper = shallow(<ContactList contacts={[]} />)
    expect(wrapper.find('li').length).toBe(0)
  })
})

