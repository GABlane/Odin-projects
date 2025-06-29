const library = [];
const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const submitBtn = dialog.querySelector("#submitBtn");
const cancelBtn = dialog.querySelector("#cancelBtn");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const form = document.getElementById("book-form");

const table = document.getElementById("books-table");
const tbody = document.querySelector("#books-table tbody");

    function Book(title, author, pages, status) {
        if (!new.target) {
            throw Error("You must use the 'new' operator to call the constructor");
        }
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    Book.prototype.toggleStatus = function () {
        this.status = !this.status;
    };

    function removeBookFromLibrary(id) {
        const index = library.findIndex((book) => {
            return book.id === id;
        });
        library.splice(index, 1);
        displayBooks();
    }

    function addBookToLibrary(title, author, pages, status) {
        const book = new Book(title, author, pages, status);
        library.push(book);
    }

    function toggleReadStatus(id) {
        library.find((book) => {
            if (book.id === id) {
                book.toggleStatus();
                displayBooks();
            }
        });
    }

    function displayBooks() {
        tbody.innerHTML = "";
        library.forEach((book) => {
            const tr = document.createElement("tr");
            for (const property in book) {
                if (!Object.hasOwn(book, property)) continue;
                const td = document.createElement("td");
                if (property === "status") {
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = book.status;
                    checkbox.addEventListener("change", () => {
                        toggleReadStatus(book.id);
                    });
                    td.append(checkbox);
                } else {
                    td.innerText = book[property];
                }
                tr.append(td);
            }
            const trashIcon = document.createElement("span");
            trashIcon.textContent = "🗑️";
            trashIcon.style.cursor = "pointer"; 
            trashIcon.addEventListener("click", () =>
                removeBookFromLibrary(book.id)
            );
            const td = document.createElement("td");
            td.append(trashIcon);
            tr.append(td);

            tr.dataset.index = book.id;
            tbody.append(tr);
        });
    }

    showBtn.addEventListener("click", () => {
    dialog.showModal();
    });

    submitBtn.addEventListener("click", (e) => {
    if (form.checkValidity() === true) {
        e.preventDefault();
        addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value);
        displayBooks();
        form.reset();
        dialog.close();
    }
    });

    cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close();
    });

    addBookToLibrary("Atomic Habits", "James Clear", 220, true);
    addBookToLibrary("The Art of Not Giving A Fuck", "Mark Mason", 250, true);
    addBookToLibrary("Stillness is the Key", "Ryan Holiday", 200, false);
    displayBooks();