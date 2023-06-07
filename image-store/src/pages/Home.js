import React from 'react';
import data from '../data';
import '../styles/Home.css';
import ImageCardsPagination from '../components/ImageCardsPagination';

const Home = () => {
  return (
    <>
      <div className="blog-wrapper py-4 homewrapper-2">
        <div className="container-xxl">
          <ImageCardsPagination data={data} imagesPerPage={24} />
        </div>
      </div>
    </>
  );
};

export default Home;
