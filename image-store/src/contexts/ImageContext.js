import React, { createContext, useState, useEffect } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 24;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `/api/images?page=${currentPage}&perPage=${imagesPerPage}`
        );
        const data = await response.json();
        setImages(data.images);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [currentPage, imagesPerPage]);

  const paginate = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(currentPage);
  };

  return (
    <ImageContext.Provider
      value={{ images, currentPage, totalPages, paginate }}
    >
      {children}
    </ImageContext.Provider>
  );
};
