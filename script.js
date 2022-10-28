function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read}`;
    };
}

const newBookButton = document.querySelector("#new-book");
newBookButton.addEventListener("click", openForm);

const emptyMessage = document.querySelector("#empty");
const modalBackdrop = document.querySelector("#modal-backdrop");
const modal = document.querySelector("#modal");
const form = document.querySelector("form");
const library = document.querySelector(".library");

const closeButton = document.querySelector("#close");
closeButton.addEventListener('click', closeForm);

modalBackdrop.addEventListener('click', (e) => {
    if (e.target !== modal) {
        closeForm();
    }
})

// TODO: delete the example books below
let myLibrary = [];
myLibrary.push(new Book("The Fellowship of The Ring", "J.R.R. Tolkien", 423, "Read"));
createCard("The Fellowship of The Ring", "J.R.R. Tolkien", 423, "Read");
myLibrary.push(new Book("The Two Towers", "J.R.R. Tolkien", 352, "Read"));
createCard("The Two Towers", "J.R.R. Tolkien", 352, "Read");
myLibrary.push(new Book("The Return of the King", "J.R.R. Tolkien", 416, "Unread"));
createCard("The Return of the King", "J.R.R. Tolkien", 416, "Unread");
// delete up to here

if (myLibrary.length === 0) {
    emptyMessage.style.display = "inline";
}

function openForm() {
    newBookButton.style.visibility = "hidden";
    modal.style.display = "block";
    modalBackdrop.style.display = "inline";
}

function closeForm() {
    newBookButton.style.visibility = "visible";
    modal.style.display = "none";
    modalBackdrop.style.display = "none";
}

function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#status").checked ? "Read" : "Unread";

    myLibrary.push(new Book(title, author, pages, read));
    
    form.reset();
    closeForm();

    createCard(title, author, pages, read);

    emptyMessage.style.display = "none";
}

function createCard(title, author, pages, read) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("index", `${myLibrary.length - 1}`);

    let dot = document.createElement("i");
    dot.classList.add("fa-solid", "fa-circle", "dot");
    dot.style.color = "#4649FF";
    dot.setAttribute("title", "Unread");
    dot.style.visibility = read === "Read" ? "hidden" : "visible";

    let cardInfo = document.createElement("div");
    cardInfo.classList.add("info");
    
    let titleElement = document.createElement("h3");
    titleElement.textContent = title;
    
    let authorElement = document.createElement("div");
    authorElement.textContent = `by ${author}`;
    authorElement.style.fontStyle = "italic";

    let pagesElement = document.createElement("div");
    pagesElement.textContent = `${pages} pages`;

    let buttons = document.createElement("div");
    buttons.classList.add("buttons");

    let readButton = document.createElement("button");
    readButton.innerHTML = read === "Read" ?  `<i class="fa-regular fa-square-check"></i> Read`: `<i class="fa-regular fa-square"></i> Unread`;
    readButton.setAttribute("data-read", read === "Read" ? "true" : "false");
    readButton.addEventListener('click', markRead);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i> Delete`;
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", deleteCard);

    cardInfo.appendChild(titleElement);
    cardInfo.appendChild(authorElement);
    cardInfo.appendChild(pagesElement);

    buttons.appendChild(readButton);
    buttons.appendChild(deleteButton);

    card.appendChild(dot);
    card.appendChild(cardInfo);
    card.appendChild(buttons);
    library.appendChild(card);
}

function deleteCard(e) {
    let index = e.target.parentNode.parentNode.getAttribute("index");
    updateIndices(index);
    myLibrary.splice(index, 1);
    library.removeChild(e.target.parentNode.parentNode);

    if (myLibrary.length === 0) {
        emptyMessage.style.display = "inline";
    }
}

function updateIndices(index) {
    for (let i = +index + 1; i < myLibrary.length; i++) {
        let card = document.querySelector(`[index="${i}"]`);
        card.setAttribute("index", i - 1);
    }
}

function markRead(e) {
    if (e.target.getAttribute("data-read") === "true") {
        e.target.innerHTML = `<i class="fa-regular fa-square"></i> Unread`;
        e.target.setAttribute("data-read", "false");
        e.target.parentNode.parentNode.firstChild.style.visibility = "visible";
    } else {
        e.target.innerHTML = `<i class="fa-regular fa-square-check"></i> Read`;
        e.target.setAttribute("data-read", "true");
        e.target.parentNode.parentNode.firstChild.style.visibility = "hidden";
    }

    let book = myLibrary[+e.target.parentNode.parentNode.getAttribute("index")];
    book.read = book.read === "Read" ? "Unread" : "Read";
}