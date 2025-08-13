import React, { useState, useEffect } from 'react';
import { fetchBooks, createBook, updateBook, deleteBook } from '../../api';
import Form from '../../components/bookdetails/Form';

export default function Admin() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  // Load all books from API
  const loadBooks = async () => {
    try {
      const { data } = await fetchBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error loading books:", error);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // Handle form submission
  const handleSave = async (payload) => {
    try {
      if (editingBook) {
        await updateBook(editingBook._id, payload);
        setEditingBook(null); // Clear edit mode
      } else {
        await createBook(payload);
      }
      await loadBooks(); // Refresh list
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      await loadBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>

      {/* Book Form */}
      <Form onSave={handleSave} initial={editingBook} />

      {/* Book Table */}
      <table border="1" cellPadding="8" style={{ marginTop: "20px", borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.price}</td>
              <td>{b.description}</td>
              <td>{b.category}</td>
              <td>
                <button onClick={() => setEditingBook(b)}>Edit</button>
                <button onClick={() => handleDelete(b._id)} style={{ marginLeft: "8px" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No books available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
