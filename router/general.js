const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop using Promise
public_users.get('/', function (req, res) {
  const getBooks = new Promise((resolve, reject) => {
    try {
      resolve(books);
    } catch (error) {
      reject(error);
    }
  });

  getBooks
    .then(data => res.send(JSON.stringify(data, null, 4)))
    .catch(error => res.status(500).json({message: "Error retrieving books"}));
});

// Get book details based on ISBN using Promise
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  const getBookByISBN = new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) {
      resolve(book);
    } else {
      reject("Book not found");
    }
  });

  getBookByISBN
    .then(data => res.send(JSON.stringify(data, null, 4)))
    .catch(error => res.status(404).json({message: error}));
});
  
// Get book details based on author using Async-Await with Axios
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  
  try {
    const booksByAuthor = await new Promise((resolve) => {
      const result = [];
      for (let isbn in books) {
        if (books[isbn].author === author) {
          result.push({
            isbn: isbn,
            title: books[isbn].title,
            reviews: books[isbn].reviews
          });
        }
      }
      resolve(result);
    });
    
    if (booksByAuthor.length > 0) {
      return res.send(JSON.stringify(booksByAuthor, null, 4));
    } else {
      return res.status(404).json({message: "No books found by this author"});
    }
  } catch (error) {
    return res.status(500).json({message: "Error retrieving books"});
  }
});

// Get all books based on title using Async-Await
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  
  try {
    const bookByTitle = await new Promise((resolve, reject) => {
      for (let isbn in books) {
        if (books[isbn].title === title) {
          resolve({
            isbn: isbn,
            author: books[isbn].author,
            reviews: books[isbn].reviews
          });
          return;
        }
      }
      reject("Book not found");
    });
    
    return res.send(JSON.stringify(bookByTitle, null, 4));
  } catch (error) {
    return res.status(404).json({message: error});
  }
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book) {
    return res.send(JSON.stringify({
      isbn: isbn,
      title: book.title,
      author: book.author,
      reviews: book.reviews
    }, null, 4));
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
```

4. **Commit** button pe click karo

---

## ✅ **Step 3: URL Copy Karo**

1. `general.js` file kholo GitHub pe
2. URL copy karo - yeh hoga:
```
https://github.com/muhammadjunaid-dev/expressBookReviews/blob/main/router/general.js
```

---

## 📝 **Task 11 Answer:**

**Assignment mein paste karo:**
```
https://github.com/muhammadjunaid-dev/expressBookReviews/blob/main/router/general.js
