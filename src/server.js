import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import contacts from './routes/contacts.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGODB_URL;

export const setupServer = () => {
  const app = express();

  const corsOptions = {
    origin: '*', 
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  mongoose.connect(DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });

  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/contacts', contacts);

  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Contacts API!' });
  });

  app.get('/db-check', async (req, res) => {
    try {
      await mongoose.connection.db.command({ ping: 1 });
      res.status(200).json({ message: 'Database connected!' });
    } catch (error) {
      res.status(500).json({ message: 'Database not connected', error: error.message });
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  return app;
};
