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
      <section className="home-wrapper py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Image Collection</h3>
            </div>
          </div>
          <ImageCardsPagination images={images} imagesPerPage={24} />
        </div>
      </section>
    </>
  );
};

export default Home;
