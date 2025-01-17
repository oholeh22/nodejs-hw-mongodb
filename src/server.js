import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

const PORT = Number(3000)

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  return app;
};
