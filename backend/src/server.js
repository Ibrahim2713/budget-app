require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const AuthRouter = require('./routes/authRoutes');
const IncomeRouter = require('./routes/incomeRoutes');
const SavingsRouter = require('./routes/savingsRoutes');
const ExpenseRouter = require('./routes/expenseRoutes');
const DateDetailsRouter = require('./routes/dateRoutes');
const expenseCategory = require('./routes/expenseCategory');
const incomeCategory = require('./routes/incomeCategory');
const savingsCategory = require('./routes/savingsCategory')
const GoalsRouter = require('./routes/goalRoutes');
const server = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
  credentials: true, // Allow cookies to be sent
};



server.use(cookieParser());
server.use(express.json());
 server.use(express.urlencoded({extended: true}));
 server.use(cors(corsOptions));
 
server.use('/api/auth', AuthRouter);
server.use('/api/income', IncomeRouter);
server.use('/api/savings', SavingsRouter);
server.use('/api/expenses', ExpenseRouter);
server.use('/api/dateDetails', DateDetailsRouter);
server.use('/api/expense-categories', expenseCategory);
server.use('/api/income-categories', incomeCategory);
server.use('/api/savings-categories', savingsCategory);


server.use('/api/goals', GoalsRouter);







server.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('Internal error!'); 
  });








module.exports = server;




