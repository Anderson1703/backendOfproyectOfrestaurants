const menuModel = require("../database/models/menuModel");
const categoriaModel = require("../database/models/categoriaModel");
const comentariosModel = require("../database/models/comentariosModel");
const { LogError, LogSuccess, LogInfo } = require("../utils/logger");

class menuControllerClass {
    /**
     * this method is for get one menu of the database (mongoDB Atlas)
     * @param {*} id 
     * @returns one menu of database if this exist
     */
    getOneMenu(id) {
        LogInfo("[GET MENU]: id menu is " + id);
        return new Promise((resolve, reject) => {
            if (id) {
                const resultOfOperation = menuModel.findById({ _id: id })
                    .populate("categoria", { menus: 0 })
                    .populate("comentarios", { menus: 0 })
                resultOfOperation.then((result) => {
                    if (result === null || result === {}) {
                        LogInfo("[GET MENU]: response when get menu is '{}'`");
                        resolve({ status: 200, data: { message: "El menu no existe" } });
                    } else {
                        LogSuccess("[GET MENU]: response of geted menu perfect")
                        resolve({ status: 200, data: result });
                    }
                }).catch((err) => {
                    LogError("[GET MENU]:error on get menu");
                    reject({ status: 500, data: err });
                });
            }
        })
    };

    /**
     * this method is for get All menu of the database (mongoDB Atlas)
     * @returns all menu of database if this exist
     */
    getAllMenu() {
        return new Promise((resolve, reject) => {
            const resultOfOperation = menuModel.find({})
                .populate("categoria", { menus: 0 })
                .populate("comentarios", { menus: 0 })
            resultOfOperation.then((result) => {
                if (result.length <= 0) {
                    LogInfo("[GET ALL MENU]: response when get all menus is '[]'");
                    resolve({ status: 200, data: { message: "no hay menu" } });
                } else {
                    LogSuccess("[GET ALL MENU]: response of geted all menus perfect");
                    resolve({ status: 200, data: result });
                }
            }).catch((err) => {
                LogError("[GET ALL MENU]:error on get all menus");
                reject({ status: 500, data: err });
            });
        })
    }

    /**
     * this method is for create one menu on the database (mongoDB Atlas)
     * @param {*} name 
     * @param {*} precio
     * @param {} total_likes
     * @param {} categoriaId
     * @returns the menu created
     */
    createOneMenu(name, precio, total_likes, categoriaId) {
        LogInfo("[CREATE MENU]: name categoria is " + name);
        LogInfo("[CREATE MENU]: precio categoria is " + precio);
        LogInfo("[CREATE MENU]: total_likes categoria is " + total_likes);
        LogInfo("[CREATE MENU]:  categoriaId is " + categoriaId);
        return new Promise((resolve, reject) => {
            if (name && precio && categoriaId) {
                categoriaModel.findById({ _id: categoriaId })
                    .then(responseOfCategoria => {
                        menuModel.create({ name: name, precio: precio, total_likes: total_likes, categoria: categoriaId })
                            .then((result) => {
                                const menuId = result._id;
                                const menusForUpdate = [...responseOfCategoria.menus, menuId];
                                LogInfo("[CREATE MENU]:  id of menu is " + menuId);
                                LogInfo("[CREATE MENU]:   all menus of this categoria are " + menusForUpdate);
                                categoriaModel.findByIdAndUpdate({ _id: categoriaId }, { menus: menusForUpdate })
                                    .then(res => {
                                        LogSuccess("[CREATE MENU]: response of created menu perfect");
                                        resolve({ status: 201, data: { created: true, message: "menu creado correctamente", menu: result } });
                                    })
                                    .catch(err => {
                                        LogError("[CREATE MENU]:cant add this menu in his categoria");
                                        reject({ status: 502, data: err });
                                    })
                            })
                            .catch(err => {
                                LogError("[CREATE MENU]:error on create menu");
                                reject({ status: 502, data: err });
                            })
                    })
                    .catch(err => {
                        LogError("[CREATE MENU]:cant find the categoria");
                        reject({ status: 502, data: err });
                    })
            } else {
                LogError("[CREATE MENU]:precio or name or categoriaId are null");
                reject({ status: 406, data: { message: "precio or name or categoriaId are null" } });
            };
        })
    };


    /**
      * this method is for update one menu on the database (mongoDB Atlas)
     * @param {*} id 
     * @param {*} data 
     * @returns the menu updated
     */
    updateOneMenu(id, data) {
        LogInfo("[Data]: data menu is " + data);
        return new Promise((resolve, reject) => {
            if (data) {
                menuModel
                    .findByIdAndUpdate({ _id: id }, data, { rawResult: true })
                    .then((result) => {
                        LogSuccess("[UPDATE MENU]: response of Update menu perfect");
                        resolve({ status: 200, data: result });
                    })
                    .catch((err) => {
                        LogError("[UPDATE MENU]:error of update menu");
                        reject({ status: 502, data: err });
                    });
            } else {
                LogError("[UPDATE MENU]:data is null");
                reject({ status: 406, data: { message: "data is null" } });
            };
        })
    };

    /**
     * this method is for delete one menu on the database (mongoDB Atlas)
     * @param {*} id 
     * @returns the menu eliminated
     */
    deleteOneMenu(id) {
        LogInfo("[DELETE MENU]: id menu is " + id);
        return new Promise((resolve, reject) => {
            menuModel.findByIdAndDelete({ _id: id }, { rawResult: true })
                .then((result) => {
                    comentariosModel.deleteMany({ menu: id })
                        .then(res => {
                            LogSuccess("[DELETE MENU]: response of delete menu perfect");
                            resolve({ status: 200, data: { message: "menu eliminado correctamente", menu: result.name } });
                        })
                        .catch((err) => {
                            LogError("[DELETE MENU]:categoria eliminated but his all comments not");
                            reject({ status: 502, data: err });
                        });
                })
                .catch((err) => {
                    LogError("[DELETE MENU]:error of delete menu");
                    reject({ status: 502, data: err });
                });
        })
    };

}
const menuController = new menuControllerClass();
module.exports = menuController;