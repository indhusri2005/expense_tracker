import React, { useState } from 'react'

function ExpenseItem(props){

const {title,amount,id}=props.expense
const type=amount>0?"income":"expense";

const handledelete =()=>{
  props.deleteExpense(id)
}
  return (
    <div className={`expense-item ${type}`}>
        <div className='expense-title'>{title}</div>
        <div className='expense-amount'>${amount}</div>
        <div className='delete-button-overlay'>
          <button onClick={handledelete}>Delete</button>
        </div>
    </div>
   
  )
}
export default ExpenseItem;