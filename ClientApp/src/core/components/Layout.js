import React from 'react';
import AppNavbar from './AppNavbar';

const Layout = props => {
  return (
    <>
      <AppNavbar />
      {props.children}
    </>
  );
};

export default Layout;
