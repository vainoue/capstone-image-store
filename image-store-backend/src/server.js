import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import { MongoClient } from 'mongodb';

// initialize firebase
const credentials = JSON.parse(fs.readFileSync('./credentials.json'));
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());

const client = new MongoClient('mongodb://127.0.0.1:27017');
await client.connect();

const db = client.db('image-store-db');

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
        like: user.like,
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

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
