import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>📚 Book Store</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {books.map((book, index) => (
          <div
            key={book._id}
            className="card"
            style={{
              border: `2px solid ${getRandomBorderColor(index)}`,
              minHeight: "220px",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>{book.title || "Untitled"}</h3>
            <p><strong>Author:</strong> {book.author || "Unknown"}</p>
            <p><strong>Price:</strong> ₹{book.price}</p>
            <p><strong>Description:</strong> {book.description || "No description"}</p>
            <p><strong>Category:</strong> {book.category || "General"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Function to give each card a different border color
function getRandomBorderColor(index) {
  const colors = ["#c62828", "#2e7d32", "#1565c0", "#f9a825", "#6a1b9a"];
  return colors[index % colors.length];
}

export default Home;
