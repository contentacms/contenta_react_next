import React, { Fragment } from 'react';
import { NavbarToggler, NavItem, NavLink, Nav, Collapse } from 'reactstrap';
import { Link } from '../../../routes';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  }

  render = () => (
    <Fragment>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>

          <NavItem>
            <Link to="/">
              <a className="nav-link">Home</a>
            </Link>
          </NavItem>

          <NavItem>
            <Link to="/recipes">
              <a className="nav-link">Recipes</a>
            </Link>
          </NavItem>

          <NavItem>
            <NavLink href="https://github.com/spleshka/contenta_react_next" target="_blank">
              GitHub
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="http://www.contentacms.org" target="_blank">
              ContentaCMS website
            </NavLink>
          </NavItem>

        </Nav>
      </Collapse>
    </Fragment>
  );
}

export default MainMenu;
