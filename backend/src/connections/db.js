import mongoose from 'mongoose';

export const connectDB = async (uri) => {
  const connectionString = uri || process.env.MONGO_URI || 'mongodb://localhost:27017/booksdb';
  try {
    await mongoose.connect(connectionString, {
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};