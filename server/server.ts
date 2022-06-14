const path = require('path');
const express = require('express');
const cors = require('cors');
import { Request, Response } from 'express';
import { config } from 'dotenv';
import userRoutes from './routes/userRoutes';
import ticketRoutes from './routes/ticketRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import connectDB from './config/db';

const PORT = process.env.SERVER_PORT || 5001;

config();

// Connect to database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get('*', (_: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
} else {
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
