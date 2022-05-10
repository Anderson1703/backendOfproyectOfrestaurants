const express = require("express") ;
// Security
const cors = require( 'cors');
// Root Router
const root = require('../Routes');
const errorResponseManager = require("../utils/errorResponseManager");
// * Create Express APP
const server = express();

// TODO: Mongoose Connection
require("../database/conection");

// * Security Config
server.use(cors());

// * Content Type Config
server.use(express.urlencoded({ extended: true}));
server.use(express.json());


server.use('/api',root);
server.use(errorResponseManager);
server.use((req, res, next)=>res.status(404).json({isError:true,message:"Route Not Found, or peticion not acepted on this Route"}));

// * Redirection Config
// http://localhost:8000/ --> http://localhost:8080/api/
server.get('/', (req, res) => {
    res.redirect('/api');
});


module.exports = server;