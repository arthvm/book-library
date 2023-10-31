const bookLibrary = [];

const cardsContainer = document.querySelector(".cards-container");

const bookSettings = document.querySelector("dialog");
const settingsTitle = document.querySelector(".settings-title");
const addBtn = document.querySelector(".add-book");

const formBtn = document.querySelector(".form-btn");
const bookTitle = document.getElementById("book_title");
const bookAuthor = document.getElementById("book_author");
const bookPages = document.getElementById("book_pages");
const bookRead = document.getElementById("book_read");

let readStatus = document.querySelectorAll(".read-status");
let bookToEdit;
let bookToEditEl;
let editing = false;

addBtn.addEventListener("click", () => {
  ResetModal();
  bookSettings.showModal();
});

formBtn.addEventListener("click", () => {
  if (!editing) {
    AddBookToLibrary(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      bookRead.checked
    );
    AddBookCard(bookLibrary[bookLibrary.length - 1]);
    UpdateListeners();
  } else {
    editing = false;
    UpdateBook();
    UpdateBookCard();
  }
});

function EditModal(book) {
  settingsTitle.innerHTML = "Edit Book";

  bookTitle.value = book.title;
  bookAuthor.value = book.author;
  bookPages.value = book.pages;
  bookRead.checked = book.read;

  formBtn.innerHTML = "Edit";
}

function ResetModal() {
  settingsTitle.innerHTML = "New Book";

  bookTitle.value = null;
  bookAuthor.value = null;
  bookPages.value = null;
  bookRead.checked = false;

  formBtn.innerHTML = "Add Book";
}

function UpdateListeners() {
  readStatusBtns = document.querySelectorAll(".read-status");

  editBtns = document.querySelectorAll(".edit-btn");
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

      let elementRemoved = bookLibrary.splice(parentEl.dataset.index, 1);
      parentEl.remove();
      const bookCards = document.querySelectorAll(".book-card");
      bookCards.forEach((book) => {
        if (book.dataset.index > parentEl.dataset.index) {
          book.dataset.index -= 1;
        }
      });
    });
  });

  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      let parentEl = e.target.parentElement;
      while (!parentEl.classList.contains("book-card")) {
        parentEl = parentEl.parentElement;
      }

      bookToEdit = bookLibrary[parentEl.dataset.index];
      bookToEditEl = parentEl;
      EditBook(bookToEdit);
    });
  });
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  UpdateInfo(newTitle, newAuthor, newPages, newRead) {
    this.title = newTitle;
    this.author = newAuthor;
    this.pages = newPages;
    this.read = newRead;
  }
}

function AddBookToLibrary(bookTitle, bookAuthor, bookPages, wasRead) {
  const newBook = new Book(bookTitle, bookAuthor, bookPages, wasRead);
  bookLibrary.push(newBook);
}

function AddBookCard(book) {
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
        <i class="fa-solid fa-gear fa-lg edit-btn" style="color: #000000;"></i>
        <i class="fa-solid fa-trash fa-lg delete-btn" style="color: #d8463b;"></i>
    </div>
  </div>`;
}

function UpdateBook() {
  bookToEdit.UpdateInfo(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.checked
  );
}

function UpdateBookCard() {
  const bTitle = bookToEditEl.querySelector(".book-title");
  const bAuthor = bookToEditEl.querySelector(".book-author");
  const bPages = bookToEditEl.querySelector(".book-pages");
  const bRead = bookToEditEl.querySelector(".read-status");

  bTitle.innerHTML = bookToEdit.title;
  bAuthor.innerHTML = "by " + bookToEdit.author;
  bPages.innerHTML = bookToEdit.pages + " pages";
  bRead.innerHTML = bookToEdit.read == true ? "Read" : "To Read";
  if (bookToEdit.read == true) {
    bRead.classList.add("read");
  } else {
    bRead.classList.remove("read");
  }
}

function EditBook(book) {
  editing = true;
  EditModal(book);
  bookSettings.showModal();
}
