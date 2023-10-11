const bookLibrary = [];

const cardsContainer = document.querySelector(".cards-container");

const bookSettings = document.querySelector("dialog");
const addBtn = document.querySelector(".add-book");

const formBtn = document.querySelector(".form-btn");
const bookTitle = document.getElementById("book_title");
const bookAuthor = document.getElementById("book_author");
const bookPages = document.getElementById("book_pages");
const bookRead = document.getElementById("book_read");

let readStatus = document.querySelectorAll(".read-status");

addBtn.addEventListener("click", () => {
  ResetModal();
  bookSettings.showModal();
});

formBtn.addEventListener("click", () => {
  addBookToLibrary(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.checked
  );
  addBookCard(bookLibrary[bookLibrary.length - 1]);
  UpdateReadChecks();
});

function ResetModal() {
  bookTitle.value = null;
  bookAuthor.value = null;
  bookPages.value = null;
  bookRead.checked = false;
}

function UpdateReadChecks() {
  readStatus = document.querySelectorAll(".read-status");
  readStatus.forEach((element) =>
    element.addEventListener("click", (e) => {
      e.target.textContent =
        e.target.textContent == "Read" ? "To Read" : "Read";
      e.target.classList.toggle("read");
    })
  );
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(bookTitle, bookAuthor, bookPages, wasRead) {
  const newBook = new Book(bookTitle, bookAuthor, bookPages, wasRead);
  bookLibrary.push(newBook);
}

function addBookCard(book) {
  cardsContainer.innerHTML += `<div class="book-card">
    <h2 class="book-title">${book.title}</h2>
    <h3 class="book-author">by ${book.author}</h3>
    <p class="book-pages">${book.pages} pages</p>
    <div class="book-read">
        <p class="read-status ${book.read == true ? "read" : ""}">${
    book.read == true ? "Read" : "To Read"
  }</p>
    </div>
  </div>`;
}
