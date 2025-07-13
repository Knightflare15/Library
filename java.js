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
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.addEventListener("click", () => {
      const index = myLibrary.findIndex(b => b.id === book.id);
      if (index > -1) {
        myLibrary.splice(index, 1);
        updateBookList(); 
        searchResult.textContent = "";
      }
    });

    li.appendChild(deleteBtn);
    bookList.appendChild(li);
  });
}

function Book(name,author) {
  // the constructor...
  this.id=crypto.randomUUID();
  this.name=name;
  this.author=author;
  this.read=false;

}
Book.prototype.toggleRead= function ()
{
  this.read=!this.read;
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

  const found = myLibrary.filter(book => book.name.toLowerCase().includes(query));
  if(found.length === 0){
    searchResult.textContent="no books found";
    return;
  }
  const resultsContainer = document.createElement("div");
  found.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.style.marginBottom = "10px";

    const readStatus = book.read ? "Read" : "Unread";
    bookDiv.innerHTML = `"${book.id}" : <strong>${book.name}</strong> by ${book.author} — <em>${readStatus}</em>`;


    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Read";
    toggleBtn.style.marginLeft = "10px";
    toggleBtn.addEventListener("click", () => {
      book.toggleRead();
      const newStatus = book.read ? "Read" : "Unread";
      bookDiv.innerHTML = `"${book.id}" : <strong>${book.name}</strong> by ${book.author} — <em>${newStatus}</em>`;
      bookDiv.appendChild(toggleBtn); 
    });

    bookDiv.appendChild(toggleBtn);
    resultsContainer.appendChild(bookDiv);
  });

  searchResult.appendChild(resultsContainer);
});