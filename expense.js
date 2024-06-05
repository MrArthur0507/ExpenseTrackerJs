import { updateCategoryChart, updateMonthlyTrendChart } from './chart.js';
import { saveExpenses, loadExpenses } from './storage.js';
import { updateCategoryDropdown } from './category.js';

export let expenses = loadExpenses();

export function addOrUpdateExpense(e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const editIndex = document.getElementById('edit-index').value;
    const expense = { amount, category, date };

    if (isNaN(amount) || amount <= 0) {
        alert('Amount must be a positive number.');
        return;
    }


    if (editIndex !== '') {
        expenses[editIndex] = expense; 
        document.getElementById('edit-index').value = ''; 
    } else {
        expenses.push(expense); 
    }

    saveExpenses(expenses);
    updateExpenses(expenses);
    clearForm();
}

function applyFilters() {
    const categoryFilter = document.getElementById('category-filter').value;
    const startDateFilter = document.getElementById('start-date-filter').value;
    const endDateFilter = document.getElementById('end-date-filter').value;
    const searchFilter = document.getElementById('search-filter').value.toLowerCase();

    const filteredExpenses = expenses.filter(expense => {
        if (categoryFilter !== '' && expense.category !== categoryFilter) {
            return false;
        }
        
        if (startDateFilter !== '' && endDateFilter !== '') {
            const expenseDate = new Date(expense.date);
            const startDate = new Date(startDateFilter);
            const endDate = new Date(endDateFilter);
            if (expenseDate < startDate || expenseDate > endDate) {
                return false;
            }
        }
        
        if (searchFilter !== '' && !expense.category.toLowerCase().includes(searchFilter)) {
            return false;
        }
        
        return true; 
    });

    updateExpenses(filteredExpenses); 
}


export function updateExpenses(expenses) { 
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    let total = 0;

    expenses.forEach((expense, index) => {
        const totalAmount = expense.amount + (expense.amount * 0.2);
        total += totalAmount;

        const li = document.createElement('li');
        li.className = 'flex justify-between items-center mb-2 p-2 border border-gray-300 rounded';
        li.innerHTML = `${expense.category}: $${expense.amount.toFixed(2)} + 20% = $${totalAmount.toFixed(2)} on ${expense.date}
                        <div class="flex">
                            <button onclick="editExpense(${index})" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                            <button onclick="deleteExpense(${index})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
                        </div>`;
        expenseList.appendChild(li);
    });

    const totalExpenses = total.toFixed(2);
    const averageExpense = (total / expenses.length).toFixed(2);
    const expenseCount = expenses.length;

    document.getElementById('total-expenses').innerText = totalExpenses;
    document.getElementById('average-expense').innerText = averageExpense;
    document.getElementById('expense-count').innerText = expenseCount;

    updateCategoryChart(expenses);
    updateMonthlyTrendChart(expenses);
}

export function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('amount').value = expense.amount;
    document.getElementById('category').value = expense.category;
    document.getElementById('date').value = expense.date;
    document.getElementById('edit-index').value = index;
}

export function deleteExpense(index) {
    expenses.splice(index, 1);
    saveExpenses(expenses);
    updateExpenses(expenses);
}

function clearForm() {
    document.getElementById('amount').value = '';
    document.getElementById('category').value = '';
    document.getElementById('date').value = '';
    document.getElementById('edit-index').value = ''; 
}

window.editExpense = editExpense;
window.deleteExpense = deleteExpense;
window.applyFilters = applyFilters;