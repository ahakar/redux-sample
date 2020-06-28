
import React, { PropTypes } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Link from 'react-router/lib/Link';

const NavMenu = ({ data, brandLabel }) => {

  const navBrand = (<Navbar.Brand><Link to="/">{brandLabel}</Link></Navbar.Brand>);
  const navRight = (
    <Nav pullRight>
      {
        data.map(a => (
          <li key={a.id}>
            <Link to={a.id}>{a.label}</Link>
          </li>
        ))
      }
    </Nav>
  );

  return (
    <Navbar fluid>
      <Navbar.Header>
        {navBrand}
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {navRight}
      </Navbar.Collapse>
    </Navbar>
  );
};

NavMenu.propTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func
};

export default NavMenu;
