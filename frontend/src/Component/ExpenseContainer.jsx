import React, { useState } from 'react'
import Expenceform from './ExpenseForm.jsx'
import History from './History.jsx'
import BalanceContainer from './BalanceContainer.jsx';

import {v4 as uid} from "uuid";
import { useEffect } from 'react';
function ExpenseContainer(){
  
const [expense,setExpense]=useState([])
const fetchExpense = async () => {
  try {
    const response = await fetch("https://expense-tracker-2-gqup.onrender.com/Expense");
    const data = await response.json();
    setExpense(data);
  } catch (error) {
    console.error('failed to fetch data', error);
  }
};

useEffect(() => {   
  fetchExpense();
}, []);
const addExpense=async(title,amount)=>{
  try{
    const response = await fetch("https://expense-tracker-2-gqup.onrender.com/Expense", {
      method: "POST",
      headers: {"Content-Type": "application/json"  },
      body: JSON.stringify({title,amount }),
    });
    if(response.ok){
      const newItem = await response.json();
      setExpense((prev)=>[...prev, newItem]);
    }
  }
  catch(error){
    console.error('Error adding expense', error);
  }
}
// const addExpense=(title,amount)=>{
//     setExpense([
//         ...expense,{
//             id: uid(),
//             title,
//             amount,
//         },
//     ]);
// }

const deleteExpense=(id)=>{
  setExpense(expense.filter((exp)=>exp.id != id))
}
console.log(expense[0]) 
  return (
    <div className='expense-container'>
      <BalanceContainer expense={expense}/>
      <h1>Expense Tracker</h1>
        <History expense={expense} deleteExpense={deleteExpense}/>
        <Expenceform addExpense={addExpense}/>
    </div>
  )
}
export default ExpenseContainer