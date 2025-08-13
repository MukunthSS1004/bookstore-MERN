import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
}, { timestamps: true });

const Book = mongoose.model('Book', BookSchema);
export default Book;