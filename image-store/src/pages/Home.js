import React, { useContext } from 'react';
import '../styles/Home.css';
import ImageCardsPagination from '../components/ImageCardsPagination';
import { Helmet } from 'react-helmet-async';
import { ImageContext } from '../contexts/ImageContext';

const Home = () => {
  const { images } = useContext(ImageContext);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <section className="home-wrapper-1 py-4">
        <div className="container-xxl">
          <ImageCardsPagination images={images} imagesPerPage={24} />
        </div>
      </section>
    </>
  );
};

export default Home;
