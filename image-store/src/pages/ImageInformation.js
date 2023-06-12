import React from 'react';
import { Link, useParams } from 'react-router-dom';
import data from '../data';
import { Helmet } from 'react-helmet-async';
import '../styles/ImageInformation.css';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import { BsCartCheck, BsCartPlus } from 'react-icons/bs';

const ImageInformation = ({ user, handleAddToCart }) => {
  const { imageId } = useParams();
  const image = data.images.find((image) => image._id === parseInt(imageId));

  const theme = createTheme({
    palette: {
      addCart: {
        main: '#ffe666',
        text: '#1c1c1b',
      },
      buyNow: {
        main: '#ffad33',
        text: '#1c1c1b',
      },
    },
  });

  if (!image) {
    return <h1>Image not found</h1>;
  }

  return (
    <>
      <Helmet>
        <title>{image.title}</title>
      </Helmet>
      <div className="image-wrapper m-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-8 d-flex align-items-center justify-content-center">
              <img src={image.imageSrc} alt={image.title} />
            </div>
            <div className="col-4">
              <div className="image-detail">
                <h1 className="image-title mb-3">{image.title} </h1>
                <p className="image-description mb-2">
                  <span className="me-1">Description: </span>
                  {image.description.length > 300
                    ? `${image.description.substr(0, 299)}...`
                    : `${image.description.substr(0, 299)}`}
                </p>
                <div className="image-categories d-flex align-items-center mb-2">
                  <p className="me-2 mb-0">Tag:</p>
                  <div className="category-buttons d-flex flex-wrap">
                    {image.categories.sort().map((category) => (
                      <Link
                        to=""
                        className="d-flex align-items-center"
                        key={category}
                      >
                        <Button className="m-1">{category}</Button>
                      </Link>
                    ))}
                  </div>
                </div>
                <p className="image-price">
                  <span className="me-1">Price: </span>${image.price}{' '}
                </p>
              </div>
              <div className="action-bar mt-4">
                <ThemeProvider theme={theme}>
                  <Button
                    className="addToCart"
                    variant="contained"
                    color="addCart"
                    fullWidth={true}
                    onClick={() => handleAddToCart(image._id)}
                  >
                    Add To Cart <BsCartPlus className="fs-4 ms-2" />
                  </Button>
                </ThemeProvider>
                <ThemeProvider theme={theme}>
                  <Button
                    className="buyItNow mt-3"
                    variant="contained"
                    color="buyNow"
                    fullWidth={true}
                  >
                    Buy It Now <BsCartCheck className="fs-4 ms-2" />
                  </Button>
                </ThemeProvider>
              </div>
            </div>
          </div>
        </div>
        .
      </div>
    </>
  );
};

export default ImageInformation;
