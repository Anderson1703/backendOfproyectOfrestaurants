const express=require("express");
const {getAllComentario, createOneComentario, getOneComentario,updateOneComentario, deleteOneComentario}= require("../controllers/comentariosController");
const getAcces = require("../utils/acces");
const comentariosRouter=express.Router();

/**
 * raiz route of comentarios
 */
 comentariosRouter.route("/")
 .get((req,res,next)=>{
     getAllComentario()
     .then(response=>{
         res.status(response.status).json(response.data);
     })
     .catch(err=>{
         next(err);
     })
 })

 .post( (req,res,next)=>{
    const { comment, menuId } = req.body;
    createOneComentario(comment,menuId)
    .then(response=>{
       res.status(response.status).json(response.data);
    })
    .catch(err=>{
        next(err);
    })

})
 
 
 /**
  * route for individual comentario
  */
 comentariosRouter.route("/comentario/:id")
 .get((req,res,next)=>{
     const { id } = req.params;
     getOneComentario(id)
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
     updateOneComentario(id,data)
     .then(response=>{
         res.status(response.status).json(response.data);
     })
     .catch(err=>{
         next(err);
     })
 })
 
 .delete(getAcces,(req,res,next)=>{
     const { id } = req.params;
     deleteOneComentario(id)
     .then(response=>{
         res.status(response.status).json(response.data);
     })
     .catch(err=>{
         next(err);
     })
 });

module.exports=comentariosRouter;