let myLibrary = [];

function Book(title, author, numPages, hasRead){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasRead = hasRead;

}//end of Book object constructor

Book.prototype.info = function() {
    return this.title + " by " + this.author + ", " + this.numPages + ", " + this.hasRead;
}

const book = new Book("Clean Code", "Uncle Rob", 300, false);

console.log(book.info());

function addBookToLibrary(book){
    myLibrary.push(book);
}

addBookToLibrary(book);

console.log(myLibrary);

function addBooksToPage(library){
    library.forEach((book) => {
        

    });

}