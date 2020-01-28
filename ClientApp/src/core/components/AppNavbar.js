import React, { useState, useEffect } from 'react';
import { Nav, Navbar } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import auth from '../services/authService';
const AppNavbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <Navbar color='faded' light>
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
        {user && (
          <>
            <NavLink className='nav-item nav-link' to='/'>
              {user.email}
            </NavLink>
            <NavLink className='nav-item nav-link' to='/logout'>
              Logout
            </NavLink>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default AppNavbar;
