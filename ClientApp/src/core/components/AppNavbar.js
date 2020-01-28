import React, { useState } from 'react';
import { Collapse, Navbar, NavbarText, NavbarToggler } from 'reactstrap';

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color='faded' light expand='md'>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <NavbarText className='ml-auto'>Simple Text</NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default AppNavbar;
