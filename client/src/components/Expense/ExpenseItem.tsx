import { Expense } from "../../types/types";
import { AppContext } from "../../context/AppContext";
import React, { useContext } from "react";

const ExpenseItem = (currentExpense: Expense) => {
  const {expenses, setExpenses} = useContext(AppContext);

  const handleDeleteExpense = async (currentExpense: Expense) => {

    try {
      const response = await fetch(`http://localhost:8080/expenses/${currentExpense.id}`, {
        method: 'DELETE',
    });
      if(response.ok){
        setExpenses(expenses.filter(expense => expense.id !== currentExpense.id));
      } else {
      console.error("Error deleting expense:", await response.json());
      }
    } catch (error) {
      console.error("Network error:", error);
    }

  };


  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
