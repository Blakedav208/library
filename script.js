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
// const addBookBtn = document.querySelector('input[type="submit"]');
const addBookBtn = document.querySelector('.addBook');
const bookShelf = document.querySelector(".bookShelf");

const authorField = document.getElementById("title");
const titleField = document.getElementById("author");
const pagesField = document.getElementById("numPages");
const hasReadField = document.getElementsByName("hasRead");

const form = document.getElementById("form");

const newBookBtn = document.querySelector(".new-book");

//prevents form from refreshing when pressing the submit button
form.addEventListener("submit", (e) => {
  e.preventDefault();
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
  //changeVisibility();
  console.log(myLibrary);
  bookId++;
});

//these next two event listeners check for valid inputs on the pages field
pagesField.addEventListener("input", () => {
  pagesField.setCustomValidity("");
  pagesField.checkValidity();
});

pagesField.addEventListener("invalid", () => {
  pagesField.value = "";
  pagesField.setCustomValidity("# of Pages Greater Than Zero");
});

//
function determineValue(fieldToBeChecked) {
  const valueOfHasReadField = Array.from(fieldToBeChecked).filter(
    (field) => field.checked == true
  );

  return valueOfHasReadField[0].value;
}
//clears All fields
function clearFields() {
  authorField.value = "";
  titleField.value = "";
  pagesField.value = "";
  hasReadField.forEach((field) => (field.checked = false));
}
//create the book Card element that will go onto the page
function createBookElement(book) {
  const bookElement = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const numPages = document.createElement("p");
  const hasRead = document.createElement("p");
  const changeHasRead = document.createElement("input");
  changeHasRead.setAttribute("type", "radio");
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  bookElement.classList.add("book");

  title.textContent = `"${book.title}"`;
  author.textContent = "By: " + book.author;
  numPages.textContent = "# of Pages: " + book.numPages;

  if (book.hasRead == "No") {
    hasRead.textContent += "Not Read";
    hasRead.classList.add("has-read-no");
    changeHasRead.checked = false;
  } else {
    hasRead.textContent += "Read";
    hasRead.classList.add("has-read-yes");
    changeHasRead.checked = true;
  }

  bookElement.appendChild(title);
  bookElement.appendChild(author);
  bookElement.appendChild(numPages);
  bookElement.appendChild(hasRead);
  bookElement.appendChild(changeHasRead);
  bookElement.appendChild(removeBtn);
  //Add event listener so that it can change the status of a book's hasRead value
  changeHasRead.addEventListener("click", () => {
    if (book.hasRead == "No") {
      book.hasRead = "Yes";
      changeHasRead.checked = true;
      hasRead.classList.remove("has-read-no");
      hasRead.classList.add("has-read-yes");
      hasRead.textContent = "Read";
    } else {
      book.hasRead = "No";
      changeHasRead.checked = false;
      hasRead.classList.remove("has-read-yes");
      hasRead.classList.add("has-read-no");
      hasRead.textContent = "Not Read";
    }
  });
  bookElement.dataset.id = book.id;
  return bookElement;
} //end of create book element

function addBookCardToPage(bookCard) {
  bookShelf.appendChild(bookCard);
} //end of add books to page

//remove all books from page
function removeBooksFromPage() {
  while (bookShelf.hasChildNodes()) {
    bookShelf.removeChild(bookShelf.firstChild);
  }
}

//show all books that are currently in the library
function showBooks(library) {
  for (let i = 0; i < library.length; i++) {
    let bookCard = createBookElement(library[i]);
    addBookCardToPage(bookCard);
  }
}

//function to add an event listener to each remove button on the book cards
function addListenerToBook() {
  const removeBtns = document.querySelectorAll("button");
  Array.from(removeBtns).forEach((button) => {
    button.addEventListener("click", (event) => {
      let bookCardId = event.target.parentNode.dataset.id;
      let bookCard = event.target.parentNode;
      myLibrary.splice(Number(bookCardId), 1);
      bookShelf.removeChild(bookCard);
      //bookCard.remove();
    });
  });
} //end of addListenerToBook

//change visiblility of the form and the new book button
function changeVisibility() {
  if (newBookBtn.style.visibility == "visible") {
    newBookBtn.style.visibility = "hidden";
    form.style.visibility = "visible";
  } else {
    form.style.visibility = "hidden";
    newBookBtn.style.visibility = "visible";
  }
} //end of changeVisibility

// newBookBtn.addEventListener("click", () => {
//   newBookBtn.style.visibility = "hidden";
//   form.style.visibility = "visible";
// });

addBookBtn.addEventListener("submit", () => {
  // let newBook = new Book(
  //   authorField.value,
  //   titleField.value,
  //   pagesField.value,
  //   determineValue(hasReadField),
  //   bookId
  // );
  // addBookToLibrary(newBook);
  // removeBooksFromPage();
  // showBooks(myLibrary);
  // addListenerToBook();
  // clearFields();
  // //changeVisibility();
  // console.log(myLibrary);
  // bookId++;
});

//newBookBtn.addEventListener('click', changeVisibility);
