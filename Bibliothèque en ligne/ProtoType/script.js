let books = [];

const bookGrid = document.getElementById('bookGrid');
const addBookModal = document.getElementById('addBookModal');
const addBookBtn = document.getElementById('addBookBtn');
const cancelBtn = document.getElementById('cancelBtn');
const bookForm = document.getElementById('bookForm');

addBookBtn.addEventListener('click', () => {
    addBookModal.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
    addBookModal.style.display = 'none';
    bookForm.reset();
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBook();
});

function displayBooks() {
    bookGrid.innerHTML = '';

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-image">
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author}</div>
                <span class="book-status ${book.status}">${book.status === 'available' ? 'Available' : 'Unavailable'}</span>
                <div class="book-price">Price: ${book.price}DH</div>
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
}

function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const image = document.getElementById('bookImage').value;
    const status = document.getElementById('bookStatus').value;
    const price = document.getElementById('bookPrice').value;

    const newBook = {
        id: books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1,
        title,
        author,
        image,
        status,
        price
    };
    
    books.push(newBook);
    addBookModal.style.display = 'none';
    bookForm.reset();
    displayBooks();
}

function removeBook(id) {
    if (confirm('Are you sure you want to remove this book?')) {
        books = books.filter(book => book.id !== id);
        displayBooks();
    }
}

displayBooks();