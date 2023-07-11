import React, { useContext } from 'react';
import { Pagination } from '@mui/material';
import ImageCard from './ImageCard';
import { ImageContext } from '../contexts/ImageContext';

const ImageCardsPagination = () => {
  const { images, currentPage, totalPages, paginate } =
    useContext(ImageContext);

  return (
    <>
      <div className="row">
        {images.map((image) => (
          <ImageCard key={image._id} image={image} />
        ))}
      </div>
      <div className="pagination-container d-flex align-items-center justify-content-center mt-5">
        <Pagination count={totalPages} page={currentPage} onChange={paginate} />
      </div>
    </>
  );
};

export default ImageCardsPagination;
