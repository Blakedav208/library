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

function addBookToLibrary(book) {
  myLibrary.push(book);
}

//======== JS for the DOM ===========

const library = document.querySelector(".library");
const ui = document.querySelector(".ui");
const addBookBtn = document.getElementById("addBook");
const bookShelf = document.querySelector(".bookShelf");

const authorField = document.getElementById("title");
const titleField = document.getElementById("author");
const pagesField = document.getElementById("numPages");
const hasReadField = document.getElementById("hasRead");

function clearFields() {
  authorField.value = "";
  titleField.value = "";
  pagesField.value = "";
  hasReadField.value = "";
}

function createBookElement(book) {
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");
  bookElement.textContent = book.info();
  return bookElement;
} //end of create book element

function addBookToPage(bookCard) {
  bookShelf.appendChild(bookCard);
} //end of add books to page

addBookBtn.addEventListener("click", () => {
  let newBook = new Book(
    authorField.value,
    titleField.value,
    parseInt(pagesField.value),
    hasReadField.value
  );
  addBookToLibrary(newBook);
  let bookCard = createBookElement(newBook);
  addBookToPage(bookCard);
  clearFields();
  console.log(myLibrary);
});
