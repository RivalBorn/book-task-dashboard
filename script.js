const searchForm = document.querySelector('#book-search-form');
const searchInput = document.querySelector('#search-input');
const resultsList = document.querySelector('#results');
const bookStatus = document.querySelector('#book-status');

function createBookItem(book) {
  const title = book.title || 'Untitled book';
  const author = book.author_name?.[0] || 'Unknown author';
  const year = book.first_publish_year || 'Unknown year';

  const item = document.createElement('li');

  const titleElement = document.createElement('p');
  titleElement.className = 'book-title';
  titleElement.textContent = title;

  const metaElement = document.createElement('p');
  metaElement.className = 'book-meta';
  metaElement.textContent = `${author} · First published: ${year}`;

  item.append(titleElement, metaElement);

  return item;
}

function showStatus(message) {
  bookStatus.textContent = message;
}

async function searchBooks(term) {
  const cleanedTerm = term.trim();

  if (!cleanedTerm) {
    resultsList.innerHTML = '';
    showStatus('Please enter a book title, author, or keyword.');
    return;
  }

  showStatus('Searching books...');
  resultsList.innerHTML = '';

  try {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(cleanedTerm)}&limit=10`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Book search request failed.');
    }

    const data = await response.json();
    const books = data.docs || [];

    if (books.length === 0) {
      showStatus('No books found. Try another search term.');
      return;
    }

    const bookItems = books.map(createBookItem);
    resultsList.append(...bookItems);
    showStatus(`Showing ${bookItems.length} result(s) for "${cleanedTerm}".`);
  } catch (error) {
    console.error(error);
    showStatus('Something went wrong. Please check your connection and try again.');
  }
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  searchBooks(searchInput.value);
});
