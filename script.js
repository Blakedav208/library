let myLibrary = [];

function Book(title, author, numPages, hasRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.hasRead = hasRead;
} //end of Book object constructor

Book.prototype.info = function () {
  return (
    this.title +
    " by " +
    this.author +
    ", " +
    this.numPages +
    ", " +
    this.hasRead
  );
};

const book = new Book("Clean Code", "Uncle Rob", 300, false);

const book2 = new Book("How to Code", "Blake Davis", 250, false);

const book3 = new Book("Learn to Code", "Lauren Davis", 400, true);

function addBookToLibrary(book) {
  myLibrary.push(book);
}





function addBooksToPage(library) {
  library.forEach((book) => {
    console.log(book);
  });
} //end of add books to page

//========JS ===========

const library = document.querySelector(".library");
const ui = document.querySelector(".ui");
const addBookBtn = document.getElementById("addBook");

const authorField = document.getElementById("title");
const titleField = document.getElementById("author");
const pagesField = document.getElementById("numPages");
const hasReadField = document.getElementById("hasRead");


addBookBtn.addEventListener('click', () => {
    let newBook = new Book(authorField.value, titleField.value, parseInt(pagesField.value), hasReadField.value);
    addBookToLibrary(newBook);
    console.log(myLibrary);
});