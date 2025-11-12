let books = [];
let currentSearchTerm = '';

const bookGrid = document.getElementById('bookGrid');
const addBookModal = document.getElementById('addBookModal');
const addBookBtn = document.getElementById('addBookBtn');
const cancelBtn = document.getElementById('cancelBtn');
const bookForm = document.getElementById('bookForm');
const searchBar = document.getElementById('searchBar');
const statsTotalBooks = document.getElementById('statsTotalBooks');
const statsAvailable = document.getElementById('statsAvailable');

addBookBtn.addEventListener('click', () => {
    addBookModal.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
    addBookModal.style.display = 'none';
    bookForm.reset();
});

bookForm.addEventListener('submit', (e) => {
    const priceInput = document.getElementById('bookPrice');
    if (priceInput.value < 0 || isNaN(priceInput.value)) {
        alert('Please enter a valid non-negative number for the price.');
        e.preventDefault();
        return;
    }           
    e.preventDefault();
    addBook();
});

searchBar.addEventListener('input', (e) => {
    currentSearchTerm = e.target.value.toLowerCase();
    displayBooks();
});

function displayBooks() {
    bookGrid.innerHTML = '';

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(currentSearchTerm) ||
        book.author.toLowerCase().includes(currentSearchTerm)
    );

    const booksToDisplay = currentSearchTerm ? filteredBooks : books;

    booksToDisplay.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-image" ">
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">by: ${book.author}</div>
                <span class="book-status ${book.status}">
                    ${book.status === 'available' ? 'Available' : 'Unavailable'}
                </span>
                <div class="book-price">Price: ${parseFloat(book.price).toFixed(2)} DH</div>
            </div>
            <div class="book-actions">
                <button class="remove-btn" data-id="${book.id}">Remove Book</button>
            </div>
        `;
        bookGrid.appendChild(bookCard);
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const bookId = parseInt(e.target.getAttribute('data-id'));
            removeBook(bookId);
        });
    });

    updateStats();
}

function addBook() {
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const image = document.getElementById('bookImage').value.trim() ;
    const status = document.getElementById('bookStatus').value;
    const priceInput = document.getElementById('bookPrice').value;
    const price = parseFloat(priceInput);

    const newBook = {
        id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title,
        author,
        image,
        status,
        price: price.toFixed(2)
    };

    books.push(newBook);
    addBookModal.style.display = 'none';
    bookForm.reset();
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.id = `${newBook.id}`;
        bookCard.innerHTML = `
            <img src="${newBook.image}" alt="${newBook.title}" class="book-image" ">
            <div class="book-info">
                <div class="book-title">${newBook.title}</div>
                <div class="book-author">by: ${newBook.author}</div>
                <span class="book-status ${newBook.status}">
                    ${newBook.status === 'available' ? 'Available' : 'Unavailable'}
                </span>
                <div class="book-price">Price: ${parseFloat(newBook.price).toFixed(2)} DH</div>
            </div>
            <div class="book-actions">
                <button class="remove-btn" data-id="${newBook.id}" onClick="removeBook(${newBook.id})">Remove Book</button>
            </div>
        `;
        bookGrid.appendChild(bookCard);
        console.log(bookCard);
        updateStats();
}

function removeBook(id) {
    if (confirm('Are you sure you want to remove this book?')) {
        books = books.filter(newBook => newBook.id !== id);
        let bookCard = document.getElementById(`${id}`);
        console.log(bookCard);
        bookGrid.removeChild(bookCard);
        updateStats();
    }
}

function updateStats() {
    const total = books.length;
    const available = books.filter(b => b.status === 'available').length;

    statsTotalBooks.textContent = total;
    statsAvailable.textContent = available;
}

displayBooks();