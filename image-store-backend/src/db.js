import { MongoClient } from 'mongodb';

let db;

async function connectToDb(cb) {
  const client = new MongoClient(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.q7jc927.mongodb.net/?retryWrites=true&w=majority`
  );
  await client.connect();

  db = client.db('image-store-db');

  cb();
}

export { db, connectToDb };
