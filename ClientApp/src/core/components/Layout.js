import React from 'react';
// import AppNavbar from './AppNavbar';
import { Container } from 'reactstrap';

const Layout = props => {
  return (
    <>
      {/* <AppNavbar /> */}
      {props.children}
    </>
  );
};

export default Layout;
