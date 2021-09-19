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
    return res.json({ authors: database.author });
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
}); //not working