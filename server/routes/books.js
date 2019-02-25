// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render("books/details", {
    title: "Add Books",
    books: ""
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  let addBook = book({
    Title: req.body.title,
    Author: req.body.author,
    Description: req.body.description,
    Price: req.body.price,
    Genre: req.body.genre
  });

  book.create(addBook, (err, val) =>{
    if(err){
      res.end(err);
    } else {
      res.redirect('/books')
    }
  })

});

// GET the Book Details page in order to edit an existing Book
router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id;
  book.findById({ _id: id }, (err, bookObject) => {
    if (err) {
      res.end(err);

      return console.error(err);
    } else {
      res.render("books/details", {
        title: "Edit Books",
        books: bookObject
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  let id = req.params.id;
  let updateBook = book({
    _id: id,
    Title: req.body.title,
    Author: req.body.author,
    Description: req.body.description,
    Price: req.body.price,
    Genre: req.body.genre
  });

  book.update({ _id: id }, updateBook, (err, books) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/books");
    }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;
  book.remove({ _id: id }, (err, val) => {
    if (err) {
      res.end(err);
    } else {
      res.redirect("/books");
    }
  });
});


module.exports = router;
