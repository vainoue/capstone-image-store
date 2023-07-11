import React, { createContext, useContext, useEffect, useState } from 'react';
import { ImageContext } from './ImageContext';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import axios from 'axios';

const initialUser = {
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
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    return storedUserInfo ? JSON.parse(storedUserInfo) : initialUser;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        // User is signed in, load data from the server
        try {
          const response = await axios.get(`/api/user/${user.uid}`);
          setUser(user);
          setUserInfo(response.data);
          localStorage.setItem('userInfo', JSON.stringify(response.data));
        } catch (error) {
          console.log('Error loading user data:', error);
        }
      } else {
        // User is signed out, reset the user state
        setUser(null);
        setUserInfo(initialUser);
        localStorage.removeItem('userInfo');
      }

      setIsLoading(false);
    });

    // Load user data from localStorage if available
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setUser(null);
      setUserInfo(initialUser);
      localStorage.removeItem('userInfo');
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
    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    console.log(`Adding image`, addedImage);
    console.log(updatedUserInfo);
  };

  const handleDeleteFromCart = (imageId) => {
    const updatedCart = userInfo.cart.filter((image) => image._id !== imageId);
    const updatedUserInfo = { ...userInfo, cart: updatedCart };

    setUserInfo(updatedUserInfo);
    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
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
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
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
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
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
