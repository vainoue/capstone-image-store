import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import 'dotenv/config';
import { db, connectToDb } from './db.js';
import Stripe from 'stripe';
import path from 'path';
import { ObjectId } from 'mongodb';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// initialize firebase
const credentials = JSON.parse(fs.readFileSync('./credentials.json'));
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();

app.use(express.static('public'));
app.use(express.json());

// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Define a route for handling user registration
app.post('/api/register', async (req, res) => {
  try {
    // Create a new Firebase user
    const firebaseUser = await admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    // Create a new user document
    const user = {
      uid: firebaseUser.uid,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      address: req.body.address,
      role: 'user',
      cart: [],
      like: [],
      transaction: [],
    };

    // Save the user document to the 'users' collection
    await db.collection('users').insertOne(user);

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while registering the user' });
  }
});

// handle user login
app.get('/api/user/:uid', async (req, res) => {
  try {
    const uid = req.params.uid;
    const user = await db.collection('users').findOne({ uid });

    if (user) {
      const currentUser = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
        role: user.role,
        cart: user.cart,
        likes: user.likes,
        transaction: user.transaction,
      };

      res.status(200).json(currentUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching user data' });
  }
});

app.get('/api/images', async (req, res) => {
  // Extract the query parameters
  const currentPage = req.query.page;
  const imagesPerPage = req.query.perPage;

  const indexOfLastItem = currentPage * imagesPerPage;
  const indexOfFirstItem = indexOfLastItem - imagesPerPage;
  try {
    const images = await db.collection('images').find().toArray();

    let currentItems;
    if (images.length <= imagesPerPage) {
      currentItems = images; // Use all images if there are fewer than imagesPerPage
    } else {
      currentItems = images.slice(indexOfFirstItem, indexOfLastItem);
    }

    // Update imageLocation to the image file path
    currentItems = currentItems.map((item) => {
      const imageURL = `/images/raws/${path.basename(item.imageLocation)}`;
      return { ...item, imageLocation: imageURL };
    });

    const totalPages = Math.ceil(images.length / imagesPerPage);
    res.json({ images: currentItems, totalPages: totalPages });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching images data' });
  }
});

// app.use(async (req, res, next) => {
//   const { authToken } = req.header;

//   if (authToken) {
//     try {
//       req.user = await admin.auth().verifyIdToken(authToken);
//     } catch (e) {
//       res.sendStatus(400);
//     }
//   }

//   next();
// });

app.get('/api/images/:imageId', async (req, res) => {
  const { imageId } = req.params;
  const id = new ObjectId(imageId);

  //const { uid } = req.user;
  const status = { isLiked: false, isInCart: false };
  const image = await db.collection('images').findOne({ _id: id });

  if (image) {
    // const userInfo = await db.collection('users').findOne({ uid: uid });

    // status.isLiked =
    //   uid && userInfo.likes.some((likedImage) => likedImage === image._id);
    // status.isInCart =
    //   uid && userInfo.likes.some((cartImage) => cartImage === image._id);
    const imageURL = `/images/raws/${path.basename(image.imageLocation)}`;
    const updatedImage = { ...image, imageLocation: imageURL };

    res.json({ image: updatedImage, status: status });
    console.log(updatedImage);
  } else {
    res.sendStatus(404);
  }
});

connectToDb(() => {
  console.log('Successfully Connect to Database');
  app.listen(8080, () => {
    console.log('Server is listening on port 8080');
  });
});
