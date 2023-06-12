import './App.css';
import axiosSet from './axiosConfig';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import ImageInformation from './pages/ImageInformation';
import data from './data';
import CartPage from './pages/CartPage';

function App() {
  // const [users, setUsers] = useState();
  // const getUsers = async () => {

  //   try {

  //     const response = await axiosSet.get("/api/user");
  //     console.log(response.data);

  //     setUsers(response.data);

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   getUsers();
  // }, [])
  const [user, setUser] = useState(data.user);

  const handleAddToCart = (imageId) => {
    // Check if the image already exists in the cart
    const isAlreadyInCart = user.cart.some((image) => image._id === imageId);

    if (isAlreadyInCart) {
      // Product ID already exists in the cart, handle accordingly
      console.log('Image already exists in the cart.');
      return;
    }

    // Add the image to the cart
    const addedImage = data.images.find((image) => image._id === imageId);
    const updatedUser = { ...user, cart: [...user.cart, addedImage] };
    setUser(updatedUser);

    console.log(`Adding image`, addedImage);
    console.log(updatedUser);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} />}>
            <Route
              index
              element={
                <Home
                  user={user}
                  images={data.images}
                  handleAddToCart={handleAddToCart}
                />
              }
            />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="image/:imageId" element={<ImageInformation />} />
            <Route path="/:userId/cart" element={<CartPage />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
