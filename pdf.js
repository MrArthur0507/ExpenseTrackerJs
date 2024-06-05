

import { expenses } from "./expense.js";

export function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;
    doc.setFontSize(16);
    doc.text('Expense Tracker Report', 10, y);
    y += 10;

    doc.setFontSize(12);
    expenses.forEach(expense => {
        const totalAmount = expense.amount + (expense.amount * 0.2);
        doc.text(`${expense.category}: $${expense.amount.toFixed(2)} + 20% = $${totalAmount.toFixed(2)} on ${expense.date}`, 10, y);
        y += 10;
    });

    doc.save('expense_report.pdf');
}
