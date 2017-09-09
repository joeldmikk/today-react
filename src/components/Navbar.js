import React, { Component } from 'react';


class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  // render() {
  //   const NavDropdownExample = React.createClass({
  //   handleSelect(eventKey) {
  //     event.preventDefault();
  //     alert(`selected ${eventKey}`);
  //   },

    render() {
      return (
        <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
          <NavItem eventKey="1" href="/home">Create</NavItem>
          <NavItem eventKey="2" title="Item">Observe</NavItem>
        </Nav>
      );
    }
  });

ReactDOM.render(<NavDropdownExample />, mountNode);
  }
}
