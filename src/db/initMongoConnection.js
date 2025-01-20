import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URL;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


export const initMongoDB = async () => {
    try {
      const user = ('MONGODB_USER');
      const pwd = ('MONGODB_PASSWORD');
      const url = ('MONGODB_URL');
      const db = ('MONGODB_DB');

      await mongoose.connect(
        `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
      );
      console.log('Mongo connection successfully established!');
    } catch (e) {
      console.log('Error while setting up mongo connection', e);
      throw e;
    }
  };
