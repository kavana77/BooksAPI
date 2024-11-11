const express = require('express');
const { getAllBooks, getBookById } = require('./controllers');
const app = express();
app.use(express.json());
app.get('/books', async (req, res) => {
  const books = await getAllBooks();
  res.json({ books });
});
app.get('/books/details/:id', async (req, res) => {
  const books = await getBookById(parseInt(req.params.id));
  res.json({ books });
});
module.exports = { app };
