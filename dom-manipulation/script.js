let quotes = [];

// Load quotes from local storage on initialization
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
    populateCategories();
}

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById('quoteDisplay').textContent = "No quotes available.";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.textContent = `"${quotes[randomIndex].text}" - ${quotes[randomIndex].category}`;
}

/// Your array of quotes
const quotes = [
    "The only way to do great work is to love what you do.",
    "Your time is limited, so don't waste it living someone else's life.",
    "The best way to predict the future is to create it."
  ];
  
  // Function to add a new quote
  function addQuote(newQuote) {
    // Add the new quote to the quotes array
    quotes.push(newQuote);
  
    // Update the DOM to display the new quote
    const quoteList = document.getElementById("quote-list"); // Assuming you have a container with this ID
    const newQuoteElement = document.createElement("li");
    newQuoteElement.textContent = newQuote;
    quoteList.appendChild(newQuoteElement);
  }
  
  // Event listener for the "Show New Quote" button
  const showNewQuoteButton = document.getElementById("show-new-quote"); // Assuming this is the button's ID
  showNewQuoteButton.addEventListener("click", function() {
    // Prompt the user to enter a new quote
    const newQuote = prompt("Enter a
// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate categories in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        quoteDisplay.textContent = `"${