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



//========JS ===========

const library = document.querySelector(".library");
const ui = document.querySelector(".ui");
const addBookBtn = document.getElementById("addBook");

const authorField = document.getElementById("title");
const titleField = document.getElementById("author");
const pagesField = document.getElementById("numPages");
const hasReadField = document.getElementById("hasRead");


function clearFields(){
    authorField.value = '';
    titleField.value = '';
    pagesField.value = '';
    hasReadField.value = '';
}



  function createBookElement(book){
      const bookElement = document.createElement("div");
      bookElement.textContent = `${book.info()}`;
      return bookElement;

  }//end of create book element

  function addBooksToPage(libraryArr) {
    libraryArr.forEach((book) => {
      let bookCard = createBookElement(book);
      library.appendChild(bookCard);
    });
  } //end of add books to page

addBookBtn.addEventListener('click', () => {
    let newBook = new Book(authorField.value, titleField.value, parseInt(pagesField.value), hasReadField.value);
    addBookToLibrary(newBook);
    createBookElement(newBook);
    addBooksToPage(myLibrary);
    clearFields();
    console.log(myLibrary);
});

