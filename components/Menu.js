import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import Link from 'next/link'

export default class Menu_powerHr extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
           <div>
            <Link prefetch href="/">
                <Menu.Item name='home'/>
            </Link>
            <Link prefetch href="/about">
                <Menu.Item
                name='about'
                />
            </Link>
            <Menu.Item
            name='friends'
            />
           </div>
    )
  }
}