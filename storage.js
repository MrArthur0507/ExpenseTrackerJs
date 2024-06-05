export function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

export function loadExpenses() {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
}

export function saveCategories(categories) {
    localStorage.setItem('categories', JSON.stringify(categories));
}

export function loadCategories() {
    const categories = localStorage.getItem('categories');
    return categories ? JSON.parse(categories) : [];
}