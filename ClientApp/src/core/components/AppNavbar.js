import React from 'react';
import { Nav, Navbar, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
const AppNavbar = ({ user }) => {
  return (
    <Navbar color='faded' light expand='md'>
      <NavLink className='navbar-brand' to='/'>
        Search Tunes
      </NavLink>
      <Nav>
        {!user && (
          <>
            <NavLink className='nav-item nav-link navbar-text' to='/login'>
              Login
            </NavLink>

            <NavLink className='nav-item nav-link navbar-text' to='/register'>
              Register
            </NavLink>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default AppNavbar;
