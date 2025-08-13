import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const fetchBooks = () => API.get('/books');
export const createBook = (payload) => API.post('/books', payload);
export const updateBook = (id, payload) => API.put(`/books/${id}`, payload);
export const deleteBook = (id) => API.delete(`/books/${id}`);

export default API;
