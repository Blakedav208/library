let myLibrary = [];

function Book(title, author, numPages, hasRead) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.hasRead = hasRead;
} //end of Book object constructor

Book.prototype.info = function () {
  return this.title + " by " + this.author + " # of Pages: " + this.numPages;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

//======== JS for the DOM ===========

const library = document.querySelector(".library");
const ui = document.querySelector(".ui");
const addBookBtn = document.querySelector('input[type="submit"]');
const bookShelf = document.querySelector(".bookShelf");

const authorField = document.getElementById("title");
const titleField = document.getElementById("author");
const pagesField = document.getElementById("numPages");
const hasReadField = document.getElementsByName("hasRead");

pagesField.addEventListener('input', () => {
  pagesField.setCustomValidity('');
  pagesField.checkValidity();
});

pagesField.addEventListener('invalid', () => {
  if(pagesField.value <= 0) {
    pagesField.setCustomValidity('# of Pages Greater Than Zero');
  } else {
    pagesField.setCustomValidity('');
  }
});


function determineValue(fieldToBeChecked){
  const valueOfHasReadField = Array.from(fieldToBeChecked).filter((field) => field.checked == true);

  return valueOfHasReadField[0].value;
}


function clearFields() {
  authorField.value = "";
  titleField.value = "";
  pagesField.value = "";
  hasReadField.forEach(field => field.checked = false);
}

function createBookElement(book) {
  const bookElement = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const numPages = document.createElement("p");
  const hasRead = document.createElement("p");
  bookElement.classList.add("book");

  title.textContent = `"${book.title}"`;
  author.textContent = "By: " + book.author;
  numPages.textContent = "# of Pages: " + book.numPages;

  if (book.hasRead == "No") {
    hasRead.textContent += "Have not Read";
  } else {
    hasRead.textContent += "Have Read";
  }

  bookElement.appendChild(title);
  bookElement.appendChild(author);
  bookElement.appendChild(numPages);
  bookElement.appendChild(hasRead);
  return bookElement;
} //end of create book element

function addBookToPage(bookCard) {
  bookShelf.appendChild(bookCard);
} //end of add books to page

addBookBtn.addEventListener("click", () => {
  let newBook = new Book(
    authorField.value,
    titleField.value,
    pagesField.value,
    determineValue(hasReadField)
  );
  addBookToLibrary(newBook);
  let bookCard = createBookElement(newBook);
  addBookToPage(bookCard);
  clearFields();
  console.log(myLibrary);
});
