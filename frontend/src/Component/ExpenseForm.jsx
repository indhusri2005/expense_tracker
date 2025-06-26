import React from 'react'
import { useState } from 'react'
import "../index.css";


 function ExpenseForm(props) {
const[title,setTitle] = useState("")
const [amount,SetAmount] = useState(0)

    const handleSubmit=(e)=>{
        e.preventDefault()
        props.addExpense(title,amount)
        setTitle(" ")
        SetAmount(0)
    }
    const handleTitleChange=(e)=>{
        setTitle(e.target.value)
    }

    const handleAmountChange=(e)=>{
        SetAmount(e.target.value)
    }
  return (
  
    <div className='expense-form'>
        <h3>Add Expense</h3>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor='title' className='form-label'>Title</label>
                <input
                type='text'
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                className='form-input'
                />
            </div>
            <div className='form-group'>
                <label htmlFor='amount' className='form-label'>Amount($)</label>
                <input
                type="number"
                id="amount"
                name="amount"
                value={amount}
                onChange={handleAmountChange}
                className='form-input'
                />
                <br/><br/>
               <button type='submit' className='submit-button'>Add</button>
                </div>
        </form>
    </div>
    
 
  )
}

export default ExpenseForm