import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCartPlus, BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import '../styles/ImageCard.css';
import { Button, Card } from '@mui/material';

const ImageCard = ({ image }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div className="col-3 mt-3">
        <Card
          variant="outlined"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="image-card position-relative">
            <div className="like-icon position-absolute">
              {isHovered && <BsSuitHeart className="fs-2" />}
            </div>
            <div className="product-image">
              <img src={image.imageSrc} alt={image.title} />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="image-details mt-3 ms-2">
                <h5 className="image-title">{image.title} </h5>
                <p className="image-price">${image.price} </p>
              </div>
              <div className="action-bar">
                <Button
                  className="addToCart text-white p-2 me-2"
                  variant="text"
                >
                  Add To Cart <BsCartPlus className="fs-4 ms-2" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ImageCard;
