import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ user }) => {
  return (
    <>
      <Header user={user} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
