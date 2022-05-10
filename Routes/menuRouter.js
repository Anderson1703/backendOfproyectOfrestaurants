const express = require("express") ;
const {getAllMenu,getOneMenu,updateOneMenu,deleteOneMenu,createOneMenu} = require("../controllers/menuController");
const getAcces = require("../utils/acces");
const menuRouter=express();


/**
 * raiz route of menu
 */
 menuRouter.route("/")
 .get((req,res,next)=>{
     getAllMenu()
     .then(response=>{
         res.status(response.status).json(response.data);
     })
     .catch(err=>{
         next(err);
     })
 })

 .post(getAcces,(req,res,next)=>{
    const {name, precio,total_likes,categoriaId} = req.body;
    createOneMenu(name, precio,total_likes, categoriaId)
    .then(response=>{
       res.status(response.status).json(response.data);

    })
    .catch(err=>{
        next(err);
    })

})
 
 
 /**
  * route for individual menu
  */
 menuRouter.route("/servicio/:id")
 .get((req,res,next)=>{
     const { id } = req.params;
     getOneMenu(id)
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
     updateOneMenu(id,data)
     .then(response=>{
         res.status(response.status).json(response.data);
     })
     .catch(err=>{
         next(err);
     })
 })
 
 .delete(getAcces,(req,res,next)=>{
     const { id } = req.params;
     deleteOneMenu(id)
     .then(response=>{
         res.status(response.status).json(response.data);
     })
     .catch(err=>{
         next(err);
     })
 });

module.exports=menuRouter;