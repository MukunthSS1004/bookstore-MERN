import Book from '../models/form.model.js';

export const createBook = async (payload) => {
  const book = new Book(payload);
  return book.save();
};

export const getBooks = async () => {
  return Book.find().sort({ createdAt: -1 });
};

export const getBookById = async (id) => {
  return Book.findById(id);
};

export const updateBook = async (id, payload) => {
  return Book.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteBook = async (id) => {
  return Book.findByIdAndDelete(id);
};