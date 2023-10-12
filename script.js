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
  UpdateListeners();
});

function ResetModal() {
  bookTitle.value = null;
  bookAuthor.value = null;
  bookPages.value = null;
  bookRead.checked = false;
}

function UpdateListeners() {
  readStatusBtns = document.querySelectorAll(".read-status");

  changeBtns = document.querySelectorAll(".change-btn");
  deleteBtns = document.querySelectorAll(".delete-btn");

  readStatusBtns.forEach((readStatusBtn) =>
    readStatusBtn.addEventListener("click", (e) => {
      e.target.textContent =
        e.target.textContent == "Read" ? "To Read" : "Read";
      e.target.classList.toggle("read");
    })
  );

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      let parentEl = e.target.parentElement;
      while (!parentEl.classList.contains("book-card")) {
        parentEl = parentEl.parentElement;
      }

      let elementRemoved = bookLibrary.splice(parentEl.dataset.index);
      parentEl.remove();
    });
  });
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
  cardsContainer.innerHTML += `<div class="book-card" data-index=${
    bookLibrary.length - 1
  }>
    <h2 class="book-title">${book.title}</h2>
    <h3 class="book-author">by ${book.author}</h3>
    <p class="book-pages">${book.pages} pages</p>
    <div class="book-read">
        <p class="read-status ${book.read == true ? "read" : ""}">${
    book.read == true ? "Read" : "To Read"
  }</p>
    </div>
    <div class="book-options">
        <i class="fa-solid fa-gear fa-lg change-btn" style="color: #000000;"></i>
        <i class="fa-solid fa-trash fa-lg delete-btn" style="color: #d8463b;"></i>
    </div>
  </div>`;
}
