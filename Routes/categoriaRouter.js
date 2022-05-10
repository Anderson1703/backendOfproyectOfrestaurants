const express=require("express");
const {getAllCategoria,createOneCategoria,getOneCategoria,updateOneCategoria,deleteOneCategoria}= require("../controllers/categoriaController");
const getAcces = require("../utils/acces");
const categoriaRouter=express.Router();

/**
 * raiz route of categorias
 */
 categoriaRouter.route("/")
 .get((req,res,next)=>{
     getAllCategoria()
     .then(response=>{
         res.status(response.status).json(response.data);
     })
     .catch(err=>{
         next(err);
     })
 })

 .post(getAcces,(req,res,next)=>{
    const { name } = req.body;
    createOneCategoria(name)
    .then(response=>{
       res.status(response.status).json(response.data);
    })
    .catch(err=>{
        next(err);
    })

})
 
 
 /**
  * route for individual categoria
  */
 categoriaRouter.route("/categoria/:id")
 .get((req,res,next)=>{
     const { id } = req.params;
     getOneCategoria(id)
     .then(response=>{
         res.status(response.status).json(response.data);
     })
     .catch(err=>{
         next(err);
     })
 })
 
 .put(getAcces,(req,res,next)=>{
     const { id } = req.params;
     const data = req.body;
     updateOneCategoria(id,data)
     .then(response=>{
         res.status(response.status).json(response.data);
     })
     .catch(err=>{
         next(err);
     })
 })
 
 .delete(getAcces,(req,res,next)=>{
     const { id } = req.params;
     deleteOneCategoria(id)
     .then(response=>{
         res.status(response.status).json(response.data);
     })
     .catch(err=>{
         next(err);
     })
 });

module.exports=categoriaRouter;