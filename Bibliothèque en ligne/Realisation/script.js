let books = [];
let currentSearchTerm = '';
let sortAscending = true;

const bookGrid = document.getElementById('bookGrid');
const addBookModal = document.getElementById('addBookModal');
const addBookBtn = document.getElementById('addBookBtn');
const cancelBtn = document.getElementById('cancelBtn');
const bookForm = document.getElementById('bookForm');
const searchBar = document.getElementById('searchBar');
const statsTotalBooks = document.getElementById('statsTotalBooks');
const statsAvailable = document.getElementById('statsAvailable');
const sortBtn = document.getElementById('sortBtn');
const statsMostExp = document.getElementById('statsMostExp');

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

if (sortBtn) {
    sortBtn.addEventListener('click', () => {
        sortAscending = !sortAscending;
        sortBtn.textContent = sortAscending ? 'Sort: A→Z' : 'Sort: Z→A';
        displayBooks();
    });
}

function displayBooks() {
    bookGrid.innerHTML = '';

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(currentSearchTerm)
    );

    let booksToDisplay = currentSearchTerm ? filteredBooks : books;

    booksToDisplay = [...booksToDisplay].sort((a, b) => a.title.localeCompare(b.title));
    if (!sortAscending) booksToDisplay.reverse();

    booksToDisplay.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.id = `book-${book.id}`;

        const statusClass = book.status === 'available' ? 'available' : 'reserved';
        const statusLabel = book.status === 'available' ? 'Available' : 'Reserved';

        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-image" >
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">by: ${book.author}</div>
                <span class="book-status ${statusClass}">
                    ${statusLabel}
                </span>
                <div class="book-price">Price: ${parseFloat(book.price).toFixed(2)} DH</div>
            </div>
            <div class="book-actions">
                <button class="remove-btn" data-id="${book.id}">Remove Book</button>
                ${book.status === 'available' ? `<button class="reserve-btn" data-id="${book.id}">Reserve</button>` : ''}
            </div>
        `;

        bookGrid.appendChild(bookCard);

        const removeBtn = bookCard.querySelector('.remove-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.getAttribute('data-id'));
                removeBook(bookId);
            });
        }

        const reserveBtn = bookCard.querySelector('.reserve-btn');
        if (reserveBtn) {
            reserveBtn.addEventListener('click', (e) => {
                const bookId = parseInt(e.target.getAttribute('data-id'));
                reserveBook(bookId);
            });
        }
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
    displayBooks();
}

function removeBook(id) {
    if (confirm('Are you sure you want to remove this book?')) {
        books = books.filter(newBook => newBook.id !== id);
        displayBooks();
    }
}

function reserveBook(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
    if (book.status !== 'available') return;
    book.status = 'unavailable';
    displayBooks();
}

function updateStats() {
    const total = books.length;
    const available = books.filter(b => b.status === 'available').length;

    statsTotalBooks.textContent = total;
    statsAvailable.textContent = available;

    if (books.length === 0) {
        if (statsMostExp) statsMostExp.textContent = 'None';
    } else {
        const mostExp = books.reduce((prev, curr) => (parseFloat(curr.price) > parseFloat(prev.price) ? curr : prev), books[0]);
        if (statsMostExp) statsMostExp.textContent = `${mostExp.title} - ${parseFloat(mostExp.price).toFixed(2)} DH`;
    }
}

displayBooks();