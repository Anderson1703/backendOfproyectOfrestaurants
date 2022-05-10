const {model}=require("mongoose");
const userSchema = require("../Schemas/userSchema");
const userModel=model("users",userSchema);
module.exports=userModel;