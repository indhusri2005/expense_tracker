import React, { useState } from 'react'
import ExpenseItem from './ExpenseItem.jsx';

function History(props){
  console.log("hello")

   return (
    <div className='history'>
        <h1>History</h1>
      {props.expense.map((expense) => (
        <ExpenseItem
          key={expense._id}
          expense={expense} deleteExpense = {props.deleteExpense}
        />
      ))}
    </div>
  );
}
export default History;