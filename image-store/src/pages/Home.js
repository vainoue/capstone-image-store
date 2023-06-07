import React from 'react';
import data from '../data';
import '../styles/Home.css';
import ImageCardsPagination from '../components/ImageCardsPagination';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <section className="home-wrapper-1 py-4">
        <div className="container-xxl">
          <ImageCardsPagination data={data} imagesPerPage={24} />
        </div>
      </section>
    </>
  );
};

export default Home;
