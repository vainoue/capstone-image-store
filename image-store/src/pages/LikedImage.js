import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Helmet } from 'react-helmet-async';
import ImageCardsPagination from '../components/ImageCardsPagination';
import { Link } from 'react-router-dom';

const LikedImage = () => {
  const { user } = useContext(UserContext);
  const isEmpty = user.cart.length === 0;

  return (
    <>
      <Helmet>
        <title>Liked Images</title>
      </Helmet>
      <section className="home-wrapper py-4">
        <div className="container-xxl">
          {!isEmpty && (
            <>
              <div className="row">
                <div className="col-12">
                  <h3 className="section-heading">Your Liked Images</h3>
                </div>
              </div>
              <ImageCardsPagination images={user.like} imagesPerPage={24} />
            </>
          )}
          {isEmpty && (
            <div class="col-12 d-flex flex-column  justify-content-center align-items-center text-center">
              <div className="m-5">
                <h3>You does not have any liked Images</h3>
              </div>
              <div className="mb-5">
                <Link className="button " to="/">
                  See more images?
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default LikedImage;
