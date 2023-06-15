import React, { createContext, useContext, useState } from 'react';
import data from '../data';
import { ImageContext } from './ImageContext';

// const initialUser = {
//   _id: 99,
//   uId: '',
//   cart: [],
// };
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(data.user);
  const { images } = useContext(ImageContext);

  const handleAddToCart = (imageId) => {
    // Check if the image already exists in the cart
    const isAlreadyInCart = user.cart.some((image) => image._id === imageId);

    if (isAlreadyInCart) {
      // Product ID already exists in the cart, handle accordingly
      console.log('Image already exists in the cart.');
      return;
    }

    // Add the image to the cart
    const addedImage = images.find((image) => image._id === imageId);
    const updatedUser = { ...user, cart: [...user.cart, addedImage] };
    setUser(updatedUser);

    console.log(`Adding image`, addedImage);
    console.log(updatedUser);
  };

  const handleDeleteFromCart = (imageId) => {
    const updatedCart = user.cart.filter((image) => image._id !== imageId);
    const updatedUser = { ...user, cart: updatedCart };

    setUser(updatedUser);
  };

  const handleToggleLike = (imageId) => {
    const isLiked = user.like.some((image) => image._id === imageId);

    if (isLiked) {
      // Image is already liked, remove it from user's liked images
      const updatedLikes = user.like.filter((image) => image._id !== imageId);
      const updatedUser = { ...user, like: updatedLikes };
      setUser(updatedUser);
      console.log(`Removed image ${imageId} from liked images`);
      console.log(updatedUser);
    } else {
      // Image is not liked, add it to user's liked images
      const addedImage = images.find((image) => image._id === imageId);
      const updatedUser = { ...user, like: [...user.like, addedImage] };
      setUser(updatedUser);
      console.log(`Added image`, addedImage);
      console.log(updatedUser);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleAddToCart,
        handleToggleLike,
        handleDeleteFromCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
