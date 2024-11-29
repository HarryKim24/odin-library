const addBookBtn = document.querySelector("#add_book");
const submitBookBtn = document.querySelector("#submit_book");
const cancelBookBtn = document.querySelector("#cancel_book");
const bookForm = document.querySelector("#book_form");
const bookTable = document.querySelector("#book_table");

const myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function showBookForm() {
  bookForm.style.display = "block";
}

function addBookToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;

  if (!title || !author || !pages) {
    alert("모든 정보를 채워주세요.");
    return;
  }

  const newBook = new Book(title, author, pages);
  myLibrary.push(newBook);

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${title}</td>
    <td>${author}</td>
    <td>${pages}</td>
    <td><button class="delete_book">-</button></td>
  `;
  bookTable.appendChild(row);

  bookForm.style.display = "none";
  document.querySelector("#title").value = '';
  document.querySelector("#author").value = '';
  document.querySelector("#pages").value = '';
}

function deleteBook(event) {
  const row = event.target.closest("tr");
  row.remove();

  const title = row.querySelector("td").textContent;
  const index = myLibrary.findIndex(book => book.title === title);
  if (index > -1) {
    myLibrary.splice(index, 1);
  }
}

addBookBtn.addEventListener("click", showBookForm);

submitBookBtn.addEventListener("click", addBookToLibrary);

cancelBookBtn.addEventListener("click", () => {
  bookForm.style.display = "none";
});

bookTable.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete_book")) {
    deleteBook(event);
  }
});