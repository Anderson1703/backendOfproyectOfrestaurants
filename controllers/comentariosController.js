const comentariosModel = require("../database/models/comentariosModel");
const menuModel = require("../database/models/menuModel");
const { LogError, LogSuccess, LogInfo } = require("../utils/logger");

class ComentarioControllerClass {
    /**
     * this method is for get one Comentario of the database (mongoDB Atlas)
     * @param {*} id 
     * @returns one Comentario of database if this exist
     */
    getOneComentario(id) {
        LogInfo("[GET COMENTARIO]: id Comentario is " + id);
        return new Promise((resolve, reject) => {
            if (id) {
                const resultOfOperation = comentariosModel.findById({ _id: id })
                    .populate("menu", { comentarios: 0 })
                resultOfOperation.then((result) => {
                    if (result === null || result === {}) {
                        LogInfo("[GET COMENTARIO]: response when get Comentario is '{}'`");
                        resolve({ status: 200, data: { message: "El Comentario no existe" } });
                    } else {
                        LogSuccess("[GET COMENTARIO]: response of geted Comentario perfect")
                        resolve({ status: 200, data: result });
                    }
                }).catch((err) => {
                    LogError("[GET COMENTARIO]:error on get Comentario");
                    reject({ status: 500, data: err });
                });
            }
        })
    };

    /**
     * this method is for get All Comentarios of the database (mongoDB Atlas)
     * @returns all Comentario of database if this exist
     */
    getAllComentario() {
        return new Promise((resolve, reject) => {
            const resultOfOperation = comentariosModel.find({})
                .populate("menu", { comentarios: 0 })
            resultOfOperation.then((result) => {
                if (result.length <= 0) {
                    LogInfo("[GET ALL COMENTARIOS]: response when get all Comentarios is '[]'");
                    resolve({ status: 200, data: { message: "no hay Comentario" } });
                } else {
                    LogSuccess("[GET ALL COMENTARIOS]: response of geted all Comentarios perfect");
                    resolve({ status: 200, data: result });
                }
            }).catch((err) => {
                LogError("[GET ALL COMENTARIOS]:error on get all Comentarios");
                reject({ status: 500, data: err });
            });
        })
    }

    /**
     * this method is for create one Comentario on the database (mongoDB Atlas)
     * @param {*} comment 
     * @param {*} menuId
     * @returns the Comentario created
     */
    createOneComentario(comment, menuId) {
        LogInfo("[CREATE COMENTARIO]: comment of Comentario is " + comment);
        return new Promise((resolve, reject) => {
            if (comment, menuId) {
                menuModel.findById({ _id: menuId })
                    .then(responseOfMenu => {
                        comentariosModel.create({ comment: comment, menu: menuId })
                            .then(result => {
                                const comentarioId = result._id;
                                const commentForUpdate = [...responseOfMenu.comentarios, comentarioId];
                                LogInfo("[CREATE MENU]:  id of comentario is " + comentarioId);
                                LogInfo("[CREATE MENU]:   all comments of this menu are " + commentForUpdate);
                                menuModel.findByIdAndUpdate({ _id: menuId }, { comentarios: commentForUpdate })
                                    .then(res => {
                                        LogSuccess("[CREATE COMENTARIO]: response of created Comentario perfect");
                                        resolve({ status: 201, data: { created: true, message: "Comentario creado correctamente", Comentario: result } });
                                    })
                                    .catch(err => {
                                        LogError("[CREATE COMENTARIO]:cant add this comment in his menu");
                                        reject({ status: 502, data: err });
                                    })
                            })
                            .catch(err => {
                                LogError("[CREATE COMENTARIO]:error on create Comentario");
                                reject({ status: 502, data: err });
                            })

                    })
                    .catch(err => {
                        LogError("[CREATE COMENTARIO]:cant find the categoria");
                        reject({ status: 502, data: err });
                    })
            } else {
                LogError("[CREATE COMENTARIO]:comment or menuId is null");
                reject({ status: 406, data: { message: "comment or menuId is null" } });
            };
        })
    };


    /**
      * this method is for update one Comentario on the database (mongoDB Atlas)
     * @param {*} id 
     * @param {*} data 
     * @returns the Comentario updated
     */
    updateOneComentario(id, data) {
        LogInfo("[Data]: data COMENTARIO is " + data);
        return new Promise((resolve, reject) => {
            if (data) {
                comentariosModel
                    .findByIdAndUpdate({ _id: id }, data, { rawResult: true })
                    .then((result) => {
                        LogSuccess("[UPDATE COMENTARIO]: response of Update Comentario perfect");
                        resolve({ status: 200, data: result });
                    })
                    .catch((err) => {
                        LogError("[UPDATE COMENTARIO]:error of update Comentario");
                        reject({ status: 502, data: err });
                    });
            } else {
                LogError("[UPDATE COMENTARIO]:data is null");
                reject({ status: 406, data: { message: "data is null" } });
            };
        })
    };

    /**
     * this method is for delete one Comentario on the database (mongoDB Atlas)
     * @param {*} id 
     * @returns the Comentario eliminated
     */
    deleteOneComentario(id) {
        LogInfo("[DELETE COMENTARIO]: id Comentario is " + id);
        return new Promise((resolve, reject) => {
            comentariosModel.findByIdAndDelete({ _id: id }, { rawResult: true })
                .then((result) => {
                    LogSuccess("[DELETE COMENTARIO]: response of delete Comentario perfect");
                    resolve({ status: 200, data: { message: "Comentario eliminado correctamente" } });
                })
                .catch((err) => {
                    LogError("[DELETE COMENTARIO]:error of delete Comentario");
                    reject({ status: 502, data: err });
                });
        })
    };



}

const comentariosController = new ComentarioControllerClass();
module.exports = comentariosController;