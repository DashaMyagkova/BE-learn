const JsonReader = require('../utils/json-reader.util');
const { resolve } = require('path');

module.exports = class BooksService {
  booksReader

  constructor() {
    this.booksReader = new JsonReader(resolve(__dirname, '../../', 'data', 'books.json'));
  }

  getBooks() {
    return this.booksReader.read();
  }

  getBookById(id) {
    const books = this.booksReader.read();
    return books.find((book) => book.id === id);
  }

  deleteBookById(id) {
    const bookToDelete = this.getBookById(id);

    if (bookToDelete) {
      const filteredBooks = books.filter((book) => book.id !== bookToDelete.id);
      this.booksReader.write(filteredBooks);

      return bookToDelete;
    }
  }

  addNewBook(body) {
    const books = this.booksReader.read();
    const id = this.booksReader.incrementLastId()
    const newBook = {id, ...body};

    books.push(newBook);
    this.booksReader.write(books);

    return newBook;
  }

  updateBook(id, body) {
    const books = this.booksReader.read();
    const bookToUpdate = this.getBookById(id);

    if (bookToUpdate) {
      this.booksReader.write(books.reduce((acc, book) => {
        if (book.id === id) {
          return [...acc, {id, ...body}];
        }
        return acc;
      }), []);

      return {id, ...body};
    }
  }
}
