import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddBudgetForm from '../components/AddBudgetForm';
import Intro from '../components/Intro';
import { createBudget, createExpense, fetchData, waait } from '../helpers'
import AddExpenseForm from '../components/AddExpenseForm';

// Budget Loader
export function dashboardLoader() {
    const userName = fetchData('userName');
    const budgets = fetchData('budgets');
    return { userName, budgets }
}

export async function dashboardAction({ request }) {
  await waait();
  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data)


  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName))
      return toast.success(`Welcome, ${values.userName}`)
    } catch (error) {
      throw new Error("There was a problem creating your account.")
    }
  }


  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount
      })
      return toast.success("Budget created!")
    } catch (error) {
      throw new Error("There was a problem creating your budget")
    }
  }
  
  if (_action === "createExpense") {
    try {
      // Create an expense
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget
      })
      return toast.success(`Expense ${values.newExpense} created!`)
    } catch (error) {
      throw new Error("There was a problem creating your expense")
    }
  }


}

const Dashboard = () => {
    const { userName, budgets } = useLoaderData()

  return (
    <>
        { userName ? (
          <div className="dashboard">
            <h1>Welcome back, <span className="accent">{userName}</span></h1>
            <div className="grid-sm">
              {
                budgets && budgets.length > 0 ? (
                  <div className="grid-lg">
                    <div className="flex-lg">
                      <AddBudgetForm />
                      <AddExpenseForm budgets={budgets} />
                    </div>
                  </div>
                ) : (
                  <div className="grid-sm">
                    <p>Indivdual budgeting is the secret to financial freedom</p>
                    <p>Create a budget to get started</p>
                    <AddBudgetForm />
                  </div>
                )
              }
            </div>
          </div>
        ) : <Intro /> }
    </>
  )
}

export default Dashboard



