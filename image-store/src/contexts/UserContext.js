import React, { createContext, useContext, useEffect, useState } from 'react';
import { ImageContext } from './ImageContext';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import axios from 'axios';

const initialUser = {
  uid: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  role: 'user',
  cart: [],
  likes: [],
  transaction: [],
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { images } = useContext(ImageContext);

  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        // User is signed in, load data from the server
        try {
          console.log(user.uid);
          const response = await axios.get(`/user/${user.uid}`);
          setUser(user);
          setUserInfo(response.data);
          console.log("Test context. User email:" + user.email)
        } catch (error) {
          console.log('Error loading user data:', error);
        }
      } else {
        // User is signed out, reset the user state
        setUser(null);
      }

      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setUser(null);
      setUserInfo(initialUser);
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  const handleAddToCart = async (imageId) => {
    // Check if the image already exists in the cart
    const isAlreadyInCart = userInfo.cart.some(
      (image) => image._id === imageId
    );

    if (isAlreadyInCart) {
      // Product ID already exists in the cart, handle accordingly
      console.log('Image already exists in the cart.');
      return;
    }

    // Add the image to the cart
    const addedImage = images.find((image) => image._id === imageId);
    const updatedUserInfo = {
      ...userInfo,
      cart: [...userInfo.cart, addedImage],
    };
    setUserInfo(updatedUserInfo);
    console.log(`Adding image`, addedImage);
    console.log(updatedUserInfo);
  };

  const handleDeleteFromCart = (imageId) => {
    const updatedCart = userInfo.cart.filter((image) => image._id !== imageId);
    const updatedUserInfo = { ...userInfo, cart: updatedCart };

    setUserInfo(updatedUserInfo);
  };

  const handleToggleLike = (imageId) => {
    const isLiked = userInfo.likes.some((image) => image._id === imageId);

    if (isLiked) {
      // Image is already liked, remove it from user's liked images
      const updatedLikes = userInfo.likes.filter(
        (image) => image._id !== imageId
      );
      const updatedUserInfo = { ...userInfo, likes: updatedLikes };
      setUserInfo(updatedUserInfo);
      console.log(`Removed image ${imageId} from liked images`);
      console.log(updatedUserInfo);
    } else {
      // Image is not liked, add it to user's liked images
      const addedImage = images.find((image) => image._id === imageId);
      const updatedUserInfo = {
        ...userInfo,
        likes: [...userInfo.likes, addedImage],
      };
      setUserInfo(updatedUserInfo);
      console.log(`Added image`, addedImage);
      console.log(updatedUserInfo);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userInfo,
        setUserInfo,
        handleSignOut,
        handleAddToCart,
        handleToggleLike,
        handleDeleteFromCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
