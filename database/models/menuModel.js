const {model}=require("mongoose");
const menuSchema = require("../Schemas/menuSchema")
const menuModel=model("menus",menuSchema);
module.exports=menuModel;