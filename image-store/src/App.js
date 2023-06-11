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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
