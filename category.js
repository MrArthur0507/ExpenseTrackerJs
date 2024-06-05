import { saveCategories, loadCategories } from './storage.js';

export let categories = loadCategories();

export function addCategory(e) {
    e.preventDefault();

    const newCategory = document.getElementById('new-category').value.trim();

    if (newCategory === '' || !/^[a-zA-Z\s]+$/.test(newCategory)) {
        alert('Category must only contain letters and spaces.');
        return;
    }

    if (!categories.includes(newCategory)) {
        categories.push(newCategory);
        saveCategories(categories);
        updateCategoryDropdown();
    }

    document.getElementById('new-category').value = '';
}

export function updateCategoryDropdown() {
    const categorySelect = document.getElementById('category');
    const categoryFilter = document.getElementById('category-filter');
    categorySelect.innerHTML = '';
    categoryFilter.innerHTML = '';
    const allCategoriesFilterOption = document.createElement('option');
    allCategoriesFilterOption.value = '';
    allCategoriesFilterOption.textContent = 'All Categories';
    categoryFilter.appendChild(allCategoriesFilterOption);
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

window.addCategory = addCategory;
updateCategoryDropdown();
