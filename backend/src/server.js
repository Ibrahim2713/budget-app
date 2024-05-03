const express = require('express');
const cors = require('cors')

const AuthRouter = require('./routes/authRoutes');
const UserRouter = require('./routes/userRoutes')

const server = express();

server.use(express.json());
 server.use(express.urlencoded({extended: true}));
server.use(cors()); 
server.use('/api/auth', AuthRouter)
server.use('/api/transactions', UserRouter)





server.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('Internal error!'); 
  });








module.exports = server;




