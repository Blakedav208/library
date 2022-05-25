let myLibrary = [];
let bookId = 0;

function Book(title, author, numPages, hasRead, id) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.hasRead = hasRead;
  this.id = id;
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

const form = document.getElementById("form");

//const removeBtns = document.querySelectorAll("button");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

pagesField.addEventListener("input", () => {
  pagesField.setCustomValidity("");
  pagesField.checkValidity();
});

pagesField.addEventListener("invalid", () => {
  pagesField.value = "";
  pagesField.setCustomValidity("# of Pages Greater Than Zero");
});

function determineValue(fieldToBeChecked) {
  const valueOfHasReadField = Array.from(fieldToBeChecked).filter(
    (field) => field.checked == true
  );

  return valueOfHasReadField[0].value;
}

function clearFields() {
  authorField.value = "";
  titleField.value = "";
  pagesField.value = "";
  hasReadField.forEach((field) => (field.checked = false));
}

function createBookElement(book) {
  const bookElement = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const numPages = document.createElement("p");
  const hasRead = document.createElement("p");
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
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
  bookElement.appendChild(removeBtn);

  bookElement.dataset.id = book.id
  return bookElement;
} //end of create book element

function addBookCardToPage(bookCard) {
  bookShelf.appendChild(bookCard);
} //end of add books to page

function removeBooksFromPage() {
  while (bookShelf.hasChildNodes()) {
    bookShelf.removeChild(bookShelf.firstChild);
  }
}

function showBooks(library) {
  for (let i = 0; i < library.length; i++) {
    let bookCard = createBookElement(library[i]);
    addBookCardToPage(bookCard);
  }
}


function addListenerToBook(){
  const removeBtns = document.querySelectorAll("button");
  Array.from(removeBtns).forEach((button) => {
    button.addEventListener('click', (event) => {
      let bookCardId = event.target.parentNode.dataset.id;
      let bookCard = event.target.parentNode;
      myLibrary.splice(Number(bookCardId), 1)
      bookShelf.removeChild(bookCard);
    });
  });
}



addBookBtn.addEventListener("click", () => {
  let newBook = new Book(
    authorField.value,
    titleField.value,
    pagesField.value,
    determineValue(hasReadField), 
    bookId
  );
  addBookToLibrary(newBook);
  removeBooksFromPage();
  showBooks(myLibrary);
  addListenerToBook();
  clearFields();
  bookId++;
});
