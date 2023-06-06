import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiCartAdd } from 'react-icons/bi';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import '../styles/ImageCard.css';

const ImageCard = ({ image }) => {
  return (
    <>
      <div className="col-3 mt-3">
        <div className="image-card position-relative">
          <div className="product-image">
            <img src={image.imageSrc} alt={image.title} />
            <div className="d-flex align-items-center justify-content-between">
              <div className="image-details">
                <h5 className="image-title">{image.title} </h5>
                <p className="image-price">${image.price} </p>
              </div>
              <div className="action-bar">
                <BsSuitHeart className="text-pink fs-2" />
                <Link className="text-black">
                  <BiCartAdd className="fs-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
