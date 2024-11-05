import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);
  // let budget = 1000;

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);
  const remaining = budget - totalExpenses;

  const alertType = remaining > budget ? "alert-danger" : "alert-success";

  // const balance = budget - totalExpenses;
  
  useEffect(() => {
    console.log("Updated budget:", budget);
    console.log("Calculated remaining:", remaining);
    if(remaining < 0){
      window.alert("You have exceeded your budget!")
    }
  }, [budget, remaining]);
  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: {remaining}</span>
    </div>
  );
};

export default Remaining;
