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
    for (const book of books) {
      if (book.id.toString() === id) {
        return book;
      }
    }
  }

  deleteBookById(id) {
    const books = this.booksReader.read();
  
    const bookToDelete = books.find((book) => book.id.toString() === id);
  
    if (bookToDelete) {
      const filteredbooks = books.filter((book) => book.id != bookToDelete.id);
      this.booksReader.write(filteredbooks);
      
      return bookToDelete;
    }
  }

  addNewBook(body) {
    const { title, description, author } = body;

    const books = this.booksReader.read();
    const lastId = this.booksReader.getLastId();

    books.push({ id: lastId + 1, title, description, author });
    this.booksReader.write(books);
    this.booksReader.incrementLastId();

    return ({id: lastId + 1, title, description, author});
  }

  changeBook(id, body) {
    const { title, description, author } = body;

    const books = this.booksReader.read();

    books.forEach((book) => {
      if(book.id.toString() === id) {
        book.title = title;
        book.description = description;
        book.author = author;
      }
    })
    
    this.booksReader.write(books);
    return ({id, title, description, author});
  }

}
