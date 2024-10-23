import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);
  // let budget = 1000;

  const totalExpenses = expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const alertType = totalExpenses > budget ? "alert-danger" : "alert-success";

  const balance = budget - totalExpenses;
  
  useEffect(() => {
    if(balance < 0){
      window.alert("You have exceeded your budget!")
    }
  }, [balance]);
  return (
    <div className={`alert ${alertType}`}>
      <span>Remaining: {balance}</span>
    </div>
  );
};

export default Remaining;
