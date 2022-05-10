const categoriaModel = require("../database/models/categoriaModel");
const menuModel = require("../database/models/menuModel");
const { LogError, LogSuccess, LogInfo } = require("../utils/logger");

class categoriaControllerClass {
    /**
     * this method is for get one Categoria of the database (mongoDB Atlas)
     * @param {*} id 
     * @returns one Categoria of database if this exist
     */
    getOneCategoria(id) {
        LogInfo("[GET CATEGORIA]: id Categoria is " + id);
        return new Promise((resolve, reject) => {
            if (id) {
                const resultOfOperation = categoriaModel.findById({ _id: id })
                    .populate("menus", { categoria: 0 })
                resultOfOperation.then((result) => {
                    if (result === null || result === {}) {
                        LogInfo("[GET CATEGORIA]: response when get Categoria is '{}'`");
                        resolve({ status: 200, data: { message: "El Categoria no existe" } });
                    } else {
                        LogSuccess("[GET CATEGORIA]: response of geted Categoria perfect")
                        resolve({ status: 200, data: result });
                    }
                }).catch((err) => {
                    LogError("[GET CATEGORIA]:error on get Categoria");
                    reject({ status: 500, data: err });
                });
            }
        })
    };

    /**
     * this method is for get All Categorias of the database (mongoDB Atlas)
     * @returns all Categoria of database if this exist
     */
    getAllCategoria() {
        return new Promise((resolve, reject) => {
            const resultOfOperation = categoriaModel.find({})
                .populate("menus", { categoria: 0 })
            resultOfOperation.then((result) => {
                if (result.length <= 0) {
                    LogInfo("[GET ALL CATEGORIAS]: response when get all Categorias is '[]'");
                    resolve({ status: 200, data: { message: "no hay Categoria" } });
                } else {
                    LogSuccess("[GET ALL CATEGORIAS]: response of geted all Categorias perfect");
                    resolve({ status: 200, data: result });
                }
            }).catch((err) => {
                LogError("[GET ALL CATEGORIAS]:error on get all Categorias");
                reject({ status: 500, data: err });
            });
        })
    }

    /**
     * this method is for create one Categoria on the database (mongoDB Atlas)
     * @param {*} name 
     * @returns the Categoria created
     */
    createOneCategoria(name) {
        LogInfo("[CREATE CATEGORIA]: name of categoria is " + name);
        return new Promise((resolve, reject) => {
            if (name) {
                categoriaModel.create({ name: name })
                    .then((result) => {
                        LogSuccess("[CREATE CATEGORIA]: response of created Categoria perfect");
                        resolve({ status: 201, data: { created: true, message: "Categoria creada correctamente", CategoriaId: result.id } });
                    })
                    .catch(err => {
                        LogError("[CREATE CATEGORIA]:error on create Categoria");
                        reject({ status: 502, data: err });
                    })
            } else {
                LogError("[CREATE CATEGORIA]:name is null");
                reject({ status: 406, data: { message: "name is null" } });
            };
        })
    };


    /**
      * this method is for update one Categoria on the database (mongoDB Atlas)
     * @param {*} id 
     * @param {*} data 
     * @returns the Categoria updated
     */
    updateOneCategoria(id, data) {
        LogInfo("[Data]: data Categoria is " + data);
        return new Promise((resolve, reject) => {
            if (data) {
                categoriaModel
                    .findByIdAndUpdate({ _id: id }, data, { rawResult: true })
                    .then((result) => {
                        LogSuccess("[UPDATE CATEGORIA]: response of Update Categoria perfect");
                        resolve({ status: 200, data: result });
                    })
                    .catch((err) => {
                        LogError("[UPDATE CATEGORIA]:error of update Categoria");
                        reject({ status: 502, data: err });
                    });
            } else {
                LogError("[UPDATE CATEGORIA]:data is null");
                reject({ status: 406, data: { message: "data is null" } });
            };
        })
    };

    /**
     * this method is for delete one Categoria on the database (mongoDB Atlas)
     * @param {*} id 
     * @returns the Categoria eliminated
     */
    deleteOneCategoria(id) {
        LogInfo("[DELETE CATEGORIA]: id Categoria is " + id);
        return new Promise((resolve, reject) => {
            categoriaModel.findByIdAndDelete({ _id: id }, { runValidators: true })
                .then((result) => {
                    menuModel.deleteMany({categoria:id})
                    .then(res=>{
                        LogSuccess("[DELETE CATEGORIA]: response of delete Categoria perfect");
                        resolve({ status: 200, data: { message: "Categoria eliminada correctamente", categoria:result.name} });    
                    })
                    .catch((err) => {
                        LogError("[DELETE CATEGORIA]:this categoria is eliminated, but can not eliminate his all menus");
                        reject({ status: 502, data: err });
                    });
                })
                .catch((err) => {
                    LogError("[DELETE CATEGORIA]:cant find this categoria");
                    reject({ status: 502, data: err });
                });
        })
    };


}

const categoriaController = new categoriaControllerClass();
module.exports = categoriaController;