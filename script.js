import { addOrUpdateExpense, deleteExpense, editExpense, expenses, updateExpenses } from './expense.js';
import { downloadPDF } from './pdf.js';

document.getElementById('expense-form').addEventListener('submit', addOrUpdateExpense);
document.getElementById('download-pdf').addEventListener('click', downloadPDF);

updateExpenses(expenses);
