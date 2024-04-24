const express = require('express');
const cors = require('cors')
const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cors());









module.exports = server;




