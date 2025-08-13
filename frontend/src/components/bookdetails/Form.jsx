import React, { useState, useEffect } from 'react';

export default function Form({ onSave, initial = null }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '');
      setAuthor(initial.author || '');
      setPrice(initial.price ?? '');
      setDescription(initial.description || '');
      setCategory(initial.category || '');
    }
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      author,
      price: Number(price),
      description,
      category
    };
    onSave(payload);

    // Clear form only when creating a new book
    if (!initial) {
      clearForm();
    }
  };

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setPrice('');
    setDescription('');
    setCategory('');
  };

  return (
    <form className="card" onSubmit={submit} style={{ marginBottom: "20px" }}>
      <h3>{initial ? 'Edit Book' : 'Add Book'}</h3>

      <label>Title</label>
      <input value={title} onChange={e => setTitle(e.target.value)} required />

      <label>Author</label>
      <input value={author} onChange={e => setAuthor(e.target.value)} />

      <label>Price</label>
      <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />

      <label>Description</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} />

      <label>Category</label>
      <input value={category} onChange={e => setCategory(e.target.value)} />

      <div style={{ marginTop: "10px" }}>
        <button type="submit">{initial ? 'Update' : 'Add'} Book</button>
        <button type="button" onClick={clearForm} style={{ marginLeft: "8px" }}>Clear</button>
      </div>
    </form>
  );
}
