import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

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
      category,
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
    <form onSubmit={submit} style={{ marginBottom: '20px' }}>
      <Typography variant="h5" gutterBottom>{initial ? 'Edit Book' : 'Add Book'}</Typography>

      <Box mb={2}>
        <TextField fullWidth label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} required/>
      </Box>

      <Box mb={2}>
        <TextField fullWidth label="Author" variant="outlined" value={author} onChange={(e) => setAuthor(e.target.value)}/>
      </Box>

      <Box mb={2}>
        <TextField fullWidth type="number" label="Price" variant="outlined" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </Box>

      <Box mb={2}>
        <TextField fullWidth label="Description" variant="outlined" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)}/>
      </Box>

      <Box mb={2}>
        <TextField fullWidth label="Category" variant="outlined" value={category} onChange={(e) => setCategory(e.target.value)}/>
      </Box>

      <Box mt={2} display="flex" gap={2}>
        <Button variant="contained" color="primary" type="submit">
          {initial ? 'Update' : 'Add'} Book
        </Button>
        <Button variant="outlined" color="secondary" onClick={clearForm}>
          Clear
        </Button>
      </Box>
    </form>
  );
}
