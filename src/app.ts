import express, { Response, Request} from 'express';
import fs from 'fs';
import { resolve } from 'path';
import dotenv from "dotenv";

import { BooksService } from './services/books.service';

dotenv.config({ path: resolve(__dirname, '../', 'config', '.env')});

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const booksService = new BooksService();

app.get('/', (req: Request, res: Response) => {
  try {
    res.status(200).send(booksService.getBooks());
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/:id", (req: Request, res: Response) => {
    try {
      if (req.params.id) {
        const book: string = booksService.getBookById(req.params.id);
  
        if (book) {
          res.status(200).send(book);
        } else return res.status(404).send({ message: 'Not found!' });
      }
      return res.status(400).send({ message: 'Invalid request' });
    } catch (err) {
      res.status(500).send("Server error");
    }
  });

  app.post("/", (req: Request, res: Response) => {
    try {
      if (req.body) {
        const book: object = booksService.addNewBook(req.body);
  
        if (book) {
          res.status(200).send(book);
        }
      }
      return res.status(400).send({ message: 'Invalid request' });
    } catch (err) {
      res.status(500).send("Server error");
    }
  });

  app.delete("/:id", (req: Request, res: Response) => {
    try {
      if (req.params.id) {
        const deletedBook: object = booksService.deleteBookById(req.params.id);
    
        if (deletedBook) {
          res.status(200).send(deletedBook);
        } else return res.status(404).send({ message: 'Not found!' });
      }
      return res.status(400).send({ message: 'Invalid request' });
    } catch (err) {
      res.status(500).send("Server error");
    }
  });

  app.put("/:id", (req: Request, res: Response) => {
    try {
      if (req.body && req.params.id) {
        const book: object = booksService.changeBook(req.params.id, req.body);
    
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