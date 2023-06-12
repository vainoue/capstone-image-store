import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ user, images }) => {
  return (
    <>
      <Header user={user} images={images} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
