const express = require('express');
const cors = require('cors')

const AuthRouter = require('./routes/authRoutes');
const IncomeRouter = require('./routes/incomeRoutes');
const SavingsRouter = require('./routes/savingsRoutes');
const ExpenseRouter = require('./routes/expenseRoutes');
const DateDetailsRouter = require('./routes/dateRoutes');
const CategoryRouter = require('./routes/categoryRoutes');
const server = express();






server.use(express.json());
 server.use(express.urlencoded({extended: true}));
server.use(cors()); 
server.use('/api/auth', AuthRouter);
server.use('/api/income', IncomeRouter);
server.use('/api/savings', SavingsRouter);
server.use('/api/expenses', ExpenseRouter);
server.use('api/dateDetails', DateDetailsRouter);
server.use('/api/category', CategoryRouter);







server.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('Internal error!'); 
  });








module.exports = server;




