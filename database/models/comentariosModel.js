
const {model}=require("mongoose");
const comentariosSchema = require("../Schemas/comentariosSchema")
const comentariosModel=model("comentarios",comentariosSchema);
module.exports=comentariosModel;