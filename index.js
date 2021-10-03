const express = require("express");

//Database
const database = require("./database");

//Initialisation
const booky = express();

//configuration
booky.use(express.json());

booky.listen(3000, () => console.log("Hey! server is running!!")); /*in the terminal it shows whether our localhost:3000 is working or not.*/


/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         get
*/
booky.get("/", (req, res) => {
    //changes line
    return res.json({ books: database.books });
});

/*
Route           /is
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         get
*/
booky.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn);

    if (getSpecificBook.length === 0) {
        return res.json({ error: `Book not found for the ISBN of ${req.params.isbn}`, });
    }
    return res.json({ book: getSpecificBook });

});

/*
Route           /c
Description     Get specific books based on category
Access          PUBLIC
Parameter       catgry
Methods         get
*/
booky.get("/c/:catgry", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.catgry));

    if (getSpecificBook.length === 0) {
        return res.json({ error: `Book not found for the category of ${req.params.catgry}`, });
    }
    return res.json({ book: getSpecificBook });

});

/*
Route           /l
Description     Get specific books based on language
Access          PUBLIC
Parameter       lang
Methods         get
*/
booky.get("/l/:lang", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.lang);

    if (getSpecificBook.length === 0) {
        return res.json({ error: `Book not found in the language ${req.params.lang}`, });
    }
    return res.json({ book: getSpecificBook });

});

/*
Route           /t
Description     Get specific books based on title
Access          PUBLIC
Parameter       title
Methods         get
*/
booky.get("/t/:title", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.title === req.params.title);

    if (getSpecificBook.length === 0) {
        return res.json({ error: `Book not found with the title ${req.params.title}`, });
    }
    return res.json({ book: getSpecificBook });

});

/*
Route           /author
Description     Get all authors
Access          PUBLIC
Parameter       NONE
Methods         get
*/
booky.get("/authors", (req, res) => {
    //changes line
    return res.json({ authors: database.author });
});

/*
Route           /ident
Description     Get specific authors based on id
Access          PUBLIC
Parameter       id
Methods         get
*/
booky.get("/ident/:id", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.id == req.params.id);

    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `Author not found for the id of ${req.params.id}`, });
    }
    return res.json({ author: getSpecificAuthor });

});

/*
Route           /author/book
Description     Get all authors based on book isbn
Access          PUBLIC
Parameter       isbn
Methods         get
*/
booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn));

    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `Author not found for the book ISBN of ${req.params.isbn}`, });
    }
    return res.json({ author: getSpecificAuthor });

});

/*
Route           /publications
Description     Get all publications
Access          PUBLIC
Parameter       NONE
Methods         get
*/
booky.get("/publications", (req, res) => {

    return res.json({ publications: database.publications });
});

/*
Route           /p
Description     Get specific publications based on id
Access          PUBLIC
Parameter       id
Methods         get
*/
booky.get("/p/:id", (req, res) => {
    const getSpecificPublication = database.publications.filter(
        (publications) => publications.id == req.params.id);

    if (getSpecificPublication.length === 0) {
        return res.json({ error: `Publication not found for the id of ${req.params.id}`, });
    }
    return res.json({ publications: getSpecificPublication });

});

/*
Route           /publication/book
Description     Get all authors based on book isbn
Access          PUBLIC
Parameter       isbn
Methods         get
*/
booky.get("/publication/book/:isbn", (req, res) => {
    const getSpecificpublication = database.author.filter(
        (publication) => publication.books.includes(req.params.isbn));

    if (getSpecificpublication.length === 0) {
        return res.json({ error: `Publication not found for the book ISBN of ${req.params.isbn}`, });
    }
    return res.json({ publication: getSpecificpublication });

});

/*
Route           /book/add
Description     add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/book/add", (req, res) => {
    const { newBook } = req.body;
    database.books.push(newBook);
    return res.json({ books: database.books });
});

/*Postman helps us to make https calls for Api request.
Browser cannot take any other methof otherthan GET that is why we are using this postman*/

/*
Route           /author/add
Description     add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/author/add", (req, res) => {
    const { newAuthor } = req.body;
    database.author.push(newAuthor);
    return res.json({ author: database.author });
});

/*
Route           /publication/add
Description     add new publication
Access          PUBLIC
Parameter       NONE
Methods         POST
*/
booky.post("/publication/add", (req, res) => {
    const { newPublication } = req.body;
    database.publications.push(newPublication);
    return res.json({ publications: database.publications });
});

/*
Route           /book/update/title
Description     update a book title
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/title/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.title = req.body.newBookTitle;
            return;
        }
    });
    return res.json({ books: database.books });
});



/*
Route           /author/update/name
Description     update an author name
Access          PUBLIC
Parameter       ide
Methods         PUT
*/
booky.put("/author/update/name/:ide", (req, res) => {
    database.author.forEach((authors) => {
        if (authors.id == req.params.ide) {
            authors.name = req.body.newAuthorName;
            return;
        }
    });
    return res.json({ author: database.author });
});

/*
Route           /publication/update/name
Description     update a publication name
Access          PUBLIC
Parameter       idi
Methods         PUT
*/
booky.put("/publication/update/name/:idi", (req, res) => {
    database.publications.forEach((publication) => {
        if (publication.id == req.params.idi) {
            publication.name = req.body.newPublicationName;
            return;
        }
    });
    return res.json({ publications: database.publications });
});


/*
Route           /book/update/author
Description     update/add new author for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/book/update/author/:isbn/:authorId", (req, res) => {

    //update book database

    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            return book.author.push(parseInt(req.params.authorId));
        }
        /* we used parseInt so that converts string to an integer.

        in books, author is array
        in author, book is array so we are using the push method to add new data inside the array*/
    });

    //update author database
    database.author.forEach((authori) => {
        if (authori.id === req.body.newAuthor)
            return authori.books.push(req.params.isbn);

    });
    return res.json({ books: database.books, author: database.author });

});


/*
Route           /publication/update/book
Description     update/add new books to publication
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/
booky.put("/publication/update/book/:isbn",
    (req, res) => {
        //update the publication database
        database.publications.forEach((publication) => {
            if (publication.id === req.body.pubId) {
                return publication.books.push(req.params.isbn);
            }
        });
        //update the book database
        database.books.forEach((book) => {
            if (book.ISBN === req.params.isbn) {
                book.publications = req.body.pubId;
                return;
            }
        });
        return res.json({ books: database.books, publications: database.publications });

    });

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/
booky.delete("/book/delete/:isbn", (req, res) => {

    const updatedBookDatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);
    //filter will enter new array and we will have to store it somewhere.
    database.books = updatedBookDatabase;
    return res.json({ books: database.books });

});
//=== strictly equal to
//!== strictly not equal to
/*
Route           /book/delete/author
Description     delete an author from the book
Access          PUBLIC
Parameter       isbn, authorId
Methods         DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    //update the book databse
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const newAuthorList = book.author.filter((author1) => author1 !== parseInt(req.params.authorId));
            book.author = newAuthorList;
            return;
        }
    });

    //update the author database
    database.author.forEach((author1) => {
        if (author1.id === parseInt(req.params.authorId)) {
            const newBooksList = author1.books.filter((book) => book !== req.params.isbn);

            author1.books = newBooksList;
            return;
        }
    });
    return res.json({ book: database.books, author1: database.author });
});

/*
Route           /author/delete
Description     delete an author
Access          PUBLIC
Parameter       authorId
Methods         DELETE
*/
booky.delete("/author/delete/:authorId", (req, res) => {

    const updatedAuthorDatabase = database.author.filter((author1) => author1.id !== parseInt(req.params.authorId));
    //filter will enter new array and we will have to store it somewhere.
    database.author = updatedAuthorDatabase;
    return res.json({ author: database.author });


});

/*
Route           /publication/delete
Description     delete a publication
Access          PUBLIC
Parameter       pubId
Methods         DELETE
*/
booky.delete("/publication/delete/:pubId", (req, res) => {

    const updatedPublicationDatabase = database.publications.filter((publication) => publication.id !== parseInt(req.params.pubId));
    //filter will enter new array and we will have to store it somewhere.
    database.publications = updatedPublicationDatabase;
    return res.json({ publications: database.publications });

});

/*
Route           /publication/delete/book
Description     delete a book from a publication
Access          PUBLIC
Parameter       isbn,pubId
Methods         DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
    //update publication database
    //replace the publication as 0
    database.publications.forEach((publication) => {
        if (publication.id === parseInt(req.params.pubId)) {
            const newBooksList = publication.books.filter((book) => book !== req.params.isbn);
            publication.books = newBooksList;
            return;
        }
    });
    //update book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publications = 0; //no publication available
        }
    });
    return res.json({ books: database.books, publications: database.publications });
});