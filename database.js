const books = [

    {
        ISBN: "978-3-16-148410-0",
        title: "Blue Moon",
        pubDate: "2019-10-29",
        language: "English",
        numPage: 250,
        category: ["drama", "Thriller"],
        publications: [1],
        author: [1, 2]
            //why not name of the author?
            //we specified the id of the author

    },

    {
        ISBN: "978-3-16-148410-1",
        title: "IT",
        pubDate: "1986-09-15",
        language: "English",
        numPage: 1138,
        category: ["Horror", "Thriller", "Dark fantasy"],
        publications: [2],
        author: [3]
            //why not name of the author?
            //we specified the id of the author

    },

    {
        ISBN: "978-3-16-148410-2",
        title: "Sita: Warrior of Mithila",
        pubDate: "2017-05-29",
        language: "Hindi",
        numPage: 1000,
        category: ["Fantasy", "Epic"],
        publications: [3],
        author: [4]
            //why not name of the author?
            //we specified the id of the author

    },

];

const author = [

    {
        id: 1,
        name: "Lee Child",
        books: ["978-3-16-148410-0"]
    },
    {
        id: 2,
        name: "Jack Reacher",
        books: ["978-3-16-148410-0"]
    },
    {
        id: 3,
        name: "Stephen King",
        books: ["978-3-16-148410-1"]
    },
    {
        id: 4,
        name: "Amish Tripathi",
        books: ["978-3-16-148410-2"]
    },

];

const publications = [

    {
        id: 1,
        name: "Delacorte Press",
        books: ["978-3-16-148410-0"]
    },
    {
        id: 2,
        name: "Viking",
        books: ["978-3-16-148410-1"]
    },
    {
        id: 3,
        name: "Westland Press",
        books: ["978-3-16-148410-2"]
    },

];


//This file is called module in Javascript.

module.exports = { books, author, publications };