import React, { useState, useEffect } from 'react';
import { fetchBooks, createBook, updateBook, deleteBook } from '../../api';
import Form from '../../components/bookdetails/Form';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

// Styling for table cells and rows
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
      <h2 style ={{textAlign: "center"}}>ADMIN PANEL</h2>

      {/* Book Form */}
      <Form onSave={handleSave} initial={editingBook} />

      {/* Book Table */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">Author</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {books.map((b) => (
              <StyledTableRow key={b._id}>
                <StyledTableCell component="th" scope="row">
                  {b.title}
                </StyledTableCell>
                <StyledTableCell align="right">{b.author}</StyledTableCell>
                <StyledTableCell align="right">{b.price}</StyledTableCell>
                <StyledTableCell align="right">{b.description}</StyledTableCell>
                <StyledTableCell align="right">{b.category}</StyledTableCell>
                <StyledTableCell align="right" style={{ display: "flex", justifyContent: "flex-start", gap: "8px" }}>
                  <Button variant="contained" color="success" onClick={() => setEditingBook(b)}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(b._id)}>Delete</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {books.length === 0 && (
              <StyledTableRow>
                <StyledTableCell colSpan={6} style={{ textAlign: "center" }}>
                  No books available
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
