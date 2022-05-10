const express=require("express");
const { LogInfo } = require("../utils/logger");
const categoriaRouter = require("./categoriaRouter");
const comentariosRouter = require("./comentariosRouter");
const menuRouter = require("./menuRouter");
const userRouter = require("./userRouter");


const server=express();
const root = express.Router();

root.get("/",(req,res)=>{
    LogInfo("GET to princiapl Route");
    res.send("welcon to menu of yeyo burgers");
})

server.use("/",root);
server.use("/menu",menuRouter);
server.use("/categorias",categoriaRouter);
server.use("/comentarios",comentariosRouter);
server.use("/users",userRouter);

module.exports=server;