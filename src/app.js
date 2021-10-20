const express = require("express");
const { resolve } = require('path');

require('dotenv').config({ path: resolve(__dirname, '../', 'config', '.env') });

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const BooksService = require('./services/books.service');
const booksService = new BooksService();

app.get('/', (req, res) => {
  try {
    res.status(200).send(booksService.getBooks());
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/:id", (req, res) => {
  try {
    if (req.params.id) {
      const book = booksService.getBookById(parseInt(req.params.id, 10));

      if (book) {
        res.status(200).send(book);
      } else return res.status(404).send({ message: 'Not found!' });
    }
    return res.status(400).send({ message: 'Invalid request' });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/", (req, res) => {
  try {
    if (req.body) {
      const book = booksService.addNewBook(req.body);

      if (book) {
        res.status(200).send(book);
      }
    }
    return res.status(400).send({ message: 'Invalid request' });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.delete("/:id", (req, res) => {
  try {
    if (req.params.id) {
      const deletedBook = booksService.deleteBookById(parseInt(req.params.id, 10));

      if (deletedBook) {
        return res.status(200).send(deletedBook);
      }

      return res.status(404).send({ message: 'Not found!' });
    }
    return res.status(400).send({ message: 'Invalid request' });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.put("/:id", (req, res) => {
  try {
    if (req.body && req.params.id) {
      const book = booksService.updateBook(req.params.id, req.body);

      if (book) {
        res.status(200).send(book);
      } else return res.status(404).send({ message: 'Not found!' });
    }
    return res.status(400).send({ message: 'Invalid request' });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`App is listening in port ${PORT}`);
});
