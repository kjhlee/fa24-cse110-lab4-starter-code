import { useState, useEffect, useContext } from "react";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";
import { AppContext } from "../../context/AppContext";
const Budget = () => {
  const {budget, setBudget} = useContext(AppContext);
  const [newBudget, setNewBudget] = useState<number>(budget || 0);

  const loadBudget = async () => {
    try {
      const budgetValue = await fetchBudget();
      setBudget(budgetValue);
    } catch (error) {
      console.error("Didn't fetch the budget", error);
    }
  }
  const budgetUpdate = async () => {
    try {
        const updatedBudget = await updateBudget(newBudget);
        setBudget(updatedBudget);
    } catch (error) {
        console.error("Failed to update the budget", error);
    }
  };
  useEffect(() =>{
    loadBudget();
  }, []);

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: ${newBudget}</div>
      <input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(Number(e.target.value))}
            />
      <button onClick={budgetUpdate}>Update Budget</button>
      {/* <div>Budget: {budget !== null ? `$${budget}` : "Loading..."}</div> */}
    </div>
  );
};

export default Budget;
