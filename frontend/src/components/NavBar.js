import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router'


export default class NavBar extends Component {
  state = { activeItem: 'portfolio', redirect: false }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if(name == 'portfolio'){
      this.props.handlePortfolioClick()
    }else if(name == 'transactions'){
      this.props.handleTransactionClick()
    }else if(name == 'logout'){
      this.props.handleSocketDisconnect()
      this.setRedirect();
    }
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />
    }
  }

  render() {
    const { activeItem } = this.state
    return (
      <div>
      {this.renderRedirect()}
        <Menu pointing secondary>
          <Menu.Item name='SMX'  />
          <Menu.Item name='portfolio' active={activeItem === 'portfolio'} onClick={this.handleItemClick} />
          <Menu.Item
            name='transactions'
            active={activeItem === 'transactions'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>

      </div>
    )
  }
}
