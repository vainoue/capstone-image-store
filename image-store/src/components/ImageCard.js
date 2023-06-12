import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCartPlus, BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import '../styles/ImageCard.css';
import { Button, Card } from '@mui/material';

const ImageCard = ({ image, handleAddToCart }) => {
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
            <Link to={`/image/${image._id}`}>
              <div className="product-image">
                <img src={image.imageSrc} alt={image.title} />
              </div>
            </Link>
            <div className="d-flex align-items-center justify-content-between">
              <div className="image-details mt-3 ms-2">
                <Link to={`/image/${image._id}`}>
                  <h5 className="image-title">
                    {image.title.length > 15
                      ? `${image.title.substr(0, 14)}...`
                      : `${image.title.substr(0, 14)}`}
                  </h5>
                </Link>
                <p className="image-price">${image.price} </p>
              </div>
              <div className="action-bar">
                <Button
                  className="addToCart text-white p-2 me-2"
                  variant="text"
                  onClick={() => handleAddToCart(image._id)}
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
