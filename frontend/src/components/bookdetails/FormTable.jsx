import React from "react";

const FormTable = ({ books, onEdit, onDelete }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ backgroundColor: "#ddd" }}>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Price</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Details</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book._id}>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.name}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.price}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{book.details}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
              <button onClick={() => onEdit(book)}>Edit</button>
              <button onClick={() => onDelete(book._id)} style={{ marginLeft: "8px" }}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FormTable;
