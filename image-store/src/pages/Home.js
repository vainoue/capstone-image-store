import React from 'react';
import '../styles/Home.css';
import ImageCardsPagination from '../components/ImageCardsPagination';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <section className="home-wrapper py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Image Collection</h3>
            </div>
          </div>
          <ImageCardsPagination />
        </div>
      </section>
    </>
  );
};

export default Home;
