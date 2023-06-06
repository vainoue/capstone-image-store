import React from 'react';
import ImageCard from '../components/ImageCard';
import data from '../data';

const Home = () => {
  return (
    <>
      <div className="blog-wrapper py-5 homewrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Image Collection</h3>
            </div>
            {data.images.map((image) => (
              <ImageCard key={image._id} image={image} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
