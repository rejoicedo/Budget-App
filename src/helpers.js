export const waait = () => new Promise(res => setTimeout(res, Math.random() * 2000))

// color
const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

// My local storage - Used to fetch data
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// Create budget
export const createBudget = ({
    name, amount
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }

    const existingBudgets =  fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}


// Create budget
export const createExpense = ({
    name, amount
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }

    const existingExpenses =  fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}


// Delete Item
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key)
}






