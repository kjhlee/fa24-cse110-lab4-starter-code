import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
const AddExpenseForm = () => {
  const {expenses, setExpenses} = useContext(AppContext);
  const [name, setName] = useState<string>('');
  const [cost, setCost] = useState<number>(0);


  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = name;

    const newExpense = {id, name, cost};
    setExpenses([...expenses, newExpense]);

    setName('');
    setCost(0);
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange = {(event) => setName(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="text"
            className="form-control"
            id="cost"
            value={cost.toString()}
            onChange={(event) => setCost(Number(event.target.value))}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
