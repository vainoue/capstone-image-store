import React from 'react';
import '../styles/Home.css';
import ImageCardsPagination from '../components/ImageCardsPagination';
import { Helmet } from 'react-helmet-async';

const Home = ({ user, images, handleAddToCart }) => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <section className="home-wrapper-1 py-4">
        <div className="container-xxl">
          <ImageCardsPagination
            images={images}
            imagesPerPage={24}
            handleAddToCart={handleAddToCart}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
