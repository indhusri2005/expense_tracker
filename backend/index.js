const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

// MongoDB URI
const MONGO_URI = "mongodb+srv://Indhu:Indhuvish@cluster0.qfayvsv.mongodb.net/Expensetracker?retryWrites=true&w=majority&appName=Cluster0";

// Define Schema and Model
const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const Expense = mongoose.model('Expense', expenseSchema);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB", err));

// Create Expense
app.post('/Expense', async (req, res) => {
    try {
        const { title, amount } = req.body;
        const expense = new Expense({ title, amount });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        console.error('Error saving expense', error);
        res.status(500).json({ error: "Failed to save expense" });
    }
});

// Get All Expenses
app.get('/Expense', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        console.error('Error getting expenses', error);
        res.status(500).json({ error: "Failed to load expenses" });
    }
});

// Delete Expense by ID
app.delete('/Expense/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.json(deletedExpense);
    } catch (error) {
        console.error('Error deleting expense', error);
        res.status(500).json({ error: "Failed to delete expense" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
