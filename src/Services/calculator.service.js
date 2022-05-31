
const budgetPreviewCalcul = (incomes, coasts) => {
    let allAmountIncome = 0;
    let allAmountCoast = 0;
    let previewBudget = 0;

    incomes.map((income) => {
        if (income.dueDate !== null) {
            income.dueDate.map((date) => {
                allAmountIncome += parseFloat(income.amount);
            })
        }
    })

    coasts.map((coast) => {
        if (coast.dueDate !== null) {
            coast.dueDate.map((date) => {
                allAmountCoast += parseFloat(coast.amount);
            })
        }
    })

    previewBudget = parseFloat(allAmountIncome) - parseFloat(allAmountCoast);

    return previewBudget;
}


const nbDaysRemaining = () => {
    const now = new Date();

    // Tota number of days in current month
    const totalDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    // Today's day
    const today = now.getDate();

    // Remaining days of the month
    const remainingDays = totalDays - today + 1;

    return remainingDays;
}

const authorizedExpense = (budget, saving, savingReal) => {
    let authorizedExpense = 0;
    const remainingDays = nbDaysRemaining();

    
    authorizedExpense = ((parseFloat(budget) - parseFloat(saving) + parseFloat(savingReal)) / parseInt(remainingDays)).toFixed(2);
    return parseFloat(authorizedExpense);
}

export default {
    budgetPreviewCalcul,
    authorizedExpense
}
