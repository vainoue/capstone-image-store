import React, { useState } from 'react';
import { Pagination } from '@mui/material';
import ImageCard from './ImageCard';

const ImageCardsPagination = ({ data, imagesPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * imagesPerPage;
  const indexOfFirstItem = indexOfLastItem - imagesPerPage;
  const currentItems = data.images.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.images.length / imagesPerPage);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h3 className="section-heading">Image Collection</h3>
        </div>
        {currentItems.map((image) => (
          <ImageCard key={image._id} image={image} />
        ))}
      </div>
      <div className="pagination-container d-flex align-items-center justify-content-center mt-5">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ImageCardsPagination;
