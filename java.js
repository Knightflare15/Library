const myLibrary = [];
const form = document.getElementById("libraryForm");
const titleInput = document.getElementById("bookTitle");
const authorInput = document.getElementById("bookAuthor");
const bookList = document.getElementById("bookList");
const searchBtn = document.getElementById("searchBtn");
const searchResult = document.getElementById("searchResult");

function updateBookList() {
  bookList.innerHTML = "";
  myLibrary.forEach((book) => {
    const li = document.createElement("li");
    li.textContent = `${book.name} by ${book.author}`;
    bookList.appendChild(li);
  });
}

function Book(name,author) {
  // the constructor...
  this.id=crypto.randomUUID();
  this.name=name;
  this.author=author;

}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!name || !author) return;

  const exists = myLibrary.some(b => b.name.toLowerCase() === name.toLowerCase() && b.author.toLowerCase() === author.toLowerCase());
  if (!exists) {
    const newBook = new Book(name, author);
    myLibrary.push(newBook);
    updateBookList();
    titleInput.value = "";
    authorInput.value = "";
    searchResult.textContent = "";
  } else {
    searchResult.textContent = "This book already exists.";
  }
});
searchBtn.addEventListener("click", function () {
  const query = titleInput.value.trim().toLowerCase();
  if (query === "") {
    searchResult.textContent = "Please enter a title to search.";
    return;
  }

  const found = myLibrary.find(book => book.name.toLowerCase().includes(query));
  searchResult.textContent = found
    ? `"${found.id}" : "${found.name}" by ${found.author} is available in the library.`
    : `Book not found.`;
});