import { Response } from 'express';

// Function to get the budget
export function getBudget(res: Response, budget: number) {
    res.status(200).send({ "data": budget });
}

// Function to update the budget

let budgetAmount = 1000;
export function updateBudget(res: Response, body: any, budget: { amount: number }) {
    console.log("Received data in updateBudget:", body);
    if (typeof budget.amount === 'number' && budget.amount >= 0) {
        budgetAmount = budget.amount; 
        res.status(200).send({ message: `New Budget ${budget.amount}`, data: budgetAmount });
    } else {
        res.status(400).send({ error: "Budget Value Not Allowed" });  
    }
}
