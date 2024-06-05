let categoryChart = null;
let monthlyTrendChart = null;

export function updateCategoryChart(expenses) {
    const categories = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(categories),
        datasets: [{
            label: 'Expenses by Category',
            data: Object.values(categories),
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#4bc0c0', '#9966ff'],
        }],
    };

    const config = {
        type: 'pie',
        data: data,
    };

    if (categoryChart) {
        categoryChart.destroy();
    }

    categoryChart = new Chart(document.getElementById('category-chart'), config);
}

export function updateMonthlyTrendChart(expenses) {
    const monthlyExpenses = expenses.reduce((acc, expense) => {
        const month = expense.date.substring(0, 7);
        acc[month] = (acc[month] || 0) + expense.amount;
        return acc;
    }, {});

    const data = {
        labels: Object.keys(monthlyExpenses),
        datasets: [{
            label: 'Monthly Expenses',
            data: Object.values(monthlyExpenses),
            fill: false,
            borderColor: '#4bc0c0',
            tension: 0.1,
        }],
    };

    const config = {
        type: 'line',
        data: data,
    };

    if (monthlyTrendChart) {
        monthlyTrendChart.destroy();
    }

    monthlyTrendChart = new Chart(document.getElementById('monthly-trend-chart'), config);
}
