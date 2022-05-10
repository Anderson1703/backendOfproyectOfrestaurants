const {model}=require("mongoose");
const categoriaSchema = require("../Schemas/categoriaSchema")
const categoriaModel=model("categorias",categoriaSchema);
module.exports=categoriaModel;