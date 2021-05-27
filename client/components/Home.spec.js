/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Home } from './Home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Home', () => {
  let home

  beforeEach(() => {
    home = shallow(<Home username="cody" />)
  })

  it('renders the email in an h3', () => {
    expect(home.find('h3').text()).to.be.equal('Welcome, cody')
  })
})
