const express = require("express");

//Database
const database = require("./database");

//Initialisation
const booky = express();

booky.get("/", (req, res) => {
    //changes line
    return res.json({ books: database.books });
});

booky.get("/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn);

    if (getSpecificBook.length === 0) {
        return res.json({ error: `Book not found for the ISBN of ${req.params.isbn}`, });
    }

    return res.json({ book: getSpecificBook });

});


booky.listen(3000, () => console.log("Hey server is running"));