const express=require("express");
const {getUser,createUser,updateUser,deleteUser,getAllUsers,loginUser} = require("../controllers/userController");
const userRouter=express.Router();


/**
 * raiz route of users
 */
userRouter.route("/")
.get(async(req,res,next)=>{
    getAllUsers()
    .then(response=>{
        res.status(response.status).json(response.data);
    })
    .catch(err=>{
        next(err);
    })
})


/**
 * route for register one user
 */
userRouter.route("/register")
.post(async (req,res,next)=>{
    const { name, password,rol } = req.body;
    createUser(name,password,rol)
    .then(response=>{
       res.status(response.status).json(response.data);

    })
    .catch(err=>{
        next(err);
    })

})



/**
 * route for individual users
 */
userRouter.route("/user/:id")
.get(async(req,res,next)=>{
    const { id } = req.params;
    getUser(id)
    .then(response=>{
        res.status(response.status).json(response.data);
    })
    .catch(err=>{
        next(err);
    })
})

.put(async (req,res,next)=>{
    const { id } = req.params;
    const data = req.body;
    updateUser(id,data)
    .then(response=>{
        res.status(response.status).json(response.data);
    })
    .catch(err=>{
        next(err);
    })
})

.delete(async (req,res,next)=>{
    const { id } = req.params;
    deleteUser(id)
    .then(response=>{
        res.status(response.status).json(response.data);
    })
    .catch(err=>{
        next(err);
    })
});

/**
 * route for the user login
 */
userRouter.route("/login")
.post(async (req,res,next)=>{
    const { name, password } = req.body;
    loginUser(name,password)
    .then(response=>{
       res.status(response.status).json(response.data);
    })
    .catch(err=>{
        next(err);
    })

})

module.exports=userRouter;