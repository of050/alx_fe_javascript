document.addEventListener("DOMContentLoaded", () => {
    const quotes = JSON.parse(localStorage.getItem("quotes")) || [];
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuoteBtn = document.getElementById("newQuote");
    const addQuoteBtn = document.getElementById("addQuote");
    const newQuoteText = document.getElementById("newQuoteText");
    const newQuoteCategory = document.getElementById("newQuoteCategory");
    const categoryFilter = document.getElementById("categoryFilter");
    const exportQuotesBtn = document.getElementById("exportQuotes");
    const importFile = document.getElementById("importFile");

    function showRandomQuote() {
        const filteredQuotes = categoryFilter.value === "all" ? quotes : quotes.filter(q => q.category === categoryFilter.value);
        if (filteredQuotes.length === 0) {
            quoteDisplay.textContent = "No quotes available for this category.";
            return;
        }
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        quoteDisplay.textContent = filteredQuotes[randomIndex].text;
    }

    function addQuote() {
        const text = newQuoteText.value.trim();
        const category = newQuoteCategory.value.trim();
        if (text && category) {
            quotes.push({ text, category });
            localStorage.setItem("quotes", JSON.stringify(quotes));
            populateCategories();
            newQuoteText.value = "";
            newQuoteCategory.value = "";
        }
    }

    function populateCategories() {
        const categories = ["all", ...new Set(quotes.map(q => q.category))];
        categoryFilter.innerHTML = categories.map(cat => `<option value="${cat}">${cat}</option>`).join("");
    }

    function exportQuotes() {
        const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "quotes.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function importFromJsonFile(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedQuotes = JSON.parse(e.target.result);
                quotes.push(...importedQuotes);
                localStorage.setItem("quotes", JSON.stringify(quotes));
                populateCategories();
            } catch (error) {
                alert("Invalid JSON file.");
            }
        };
        reader.readAsText(file);
    }

    newQuoteBtn.addEventListener("click", showRandomQuote);
    addQuoteBtn.addEventListener("click", addQuote);
    exportQuotesBtn.addEventListener("click", exportQuotes);
    importFile.addEventListener("change", importFromJsonFile);
    categoryFilter.addEventListener("change", showRandomQuote);

    populateCategories();
    showRandomQuote();
});
