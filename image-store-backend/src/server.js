import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import 'dotenv/config';
import { db, connectToDb } from './db.js';
import Stripe from 'stripe';
import path from 'path';
import { ObjectId } from 'mongodb';
import cors from 'cors';
import multer from 'multer';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// initialize firebase
const credentials = JSON.parse(fs.readFileSync('./credentials.json'));
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();

// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = new Stripe(process.env.STRIPE_S_KEYS);

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

const upload = multer({ dest: 'uploads/' });
app.post(
  '/test_upload',
  upload.single('product_image'),
  function (req, res, next) {
    console.log(req.file);
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.status(200);
  }
);

app.post('/payment/create-checkout-session', async (req, res) => {
  const { product } = req.body;
  console.log(product);

  const lineItems = product.map((image) => {
    return {
      price_data: {
        currency: 'cad',
        unit_amount: Math.round(image.price * 100),
        product_data: {
          name: image.title,
          description: image.description,
          images: ['https://example.com/t-shirt.png'],
        },
      },
      quantity: 1,
    };
  });

  console.log(lineItems);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });
  res.json({ id: session.id });
});

// Define a route for handling user registration
app.post('/api/user/register', async (req, res) => {
  console.log(req.body);
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
      likes: [],
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

// Define a route for handling user login
app.get('/api/user/:uid', async (req, res) => {
  try {
    // Search user information in Database from firebase uid
    const uid = req.params.uid;
    const user = await db.collection('users').findOne({ uid });

    // Create a new user collection
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

      // return currentUser
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

// Define a route for handling get all images
app.get('/api/images', async (req, res) => {
  // Extract the query parameters
  const currentPage = req.query.page;
  const imagesPerPage = req.query.perPage;
  const isAll = req.query.status === 'All';

  const indexOfLastItem = currentPage * imagesPerPage;
  const indexOfFirstItem = indexOfLastItem - imagesPerPage;
  try {
    // Get images imformation from database
    let images;
    if (isAll) {
      images = await db.collection('images').find().toArray();
    } else {
      // if not all Get only Active images from database
      images = await db
        .collection('images')
        .find({ status: 'Active' })
        .toArray();
    }

    // Set currentItems base on imagesPerPage
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

    // Calculate totalPages
    const totalPages = Math.ceil(images.length / imagesPerPage);

    // return currentItems and totalPages
    res.json({ images: currentItems, totalPages: totalPages });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching images data' });
  }
});

// Verify firebase authtoken
app.use(async (req, res, next) => {
  const { authtoken } = req.headers;

  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken);
    } catch (e) {
      return res.sendStatus(400);
    }
  }

  req.user = req.user || {};

  next();
});

// Define a route for handling update user information
app.post('/api/user/update/', async (req, res) => {
  // verify user
  const { uid } = req.user;

  try {
    // Extract the body parameters
    const {
      email,
      firstName,
      lastName,
      phone,
      address,
      cart,
      transaction,
      likes,
    } = req.body;

    // Update the user document in the MongoDB collection
    const updatedUser = await db.collection('users').findOneAndUpdate(
      { uid: uid }, // Filter criteria
      {
        $set: {
          ...(email & { email }),
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(phone && { phone }),
          ...(address && { address }),
          ...(cart && { cart }),
          ...(transaction && { transaction }),
          ...(likes && { likes }),
        },
      },
      // Set returnOriginal option to false to get the updated document
      { returnOriginal: false }
    );

    // throws error if updatedUser is null
    if (!updatedUser.value) {
      throw new Error('User not found');
    }

    // Send a successful response
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the user profile');
  }
});

app.get('/api/images/:imageId', async (req, res) => {
  // Extract the body parameters
  const { imageId } = req.params;

  // get selected image information from database
  const id = new ObjectId(imageId);
  const image = await db.collection('images').findOne({ _id: id });

  if (image) {
    const imageURL = `/images/raws/${path.basename(image.imageLocation)}`;
    const updatedImage = { ...image, imageLocation: imageURL };

    // return images
    res.json({ image: updatedImage });
  } else {
    res.sendStatus(404);
  }
});

app.post('/api/images/update', async (req, res) => {
  try {
    // Extract the body parameters
    const { _id, title, description, price, tags, status } = req.body;

    // Update the image document in the MongoDB collection
    await db.collection('images').findOneAndUpdate(
      { _id: new ObjectId(_id) },
      {
        $set: {
          ...(title && { title }),
          ...(description && { description }),
          ...(price && { price }),
          ...(tags && { tags }),
          ...(status && { status }),
          dateEdited: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    // Send a successful response
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while updating the image');
  }
});

connectToDb(() => {
  console.log('Successfully Connect to Database');
  app.listen(8080, () => {
    console.log('Server is listening on port 8080');
  });
});
