const jwt = require("jsonwebtoken");
const userModel = require("../database/models/userModel");
const { encriptarPassword, comparePassword } = require("../utils/bcryptManager");
const { LogError, LogSuccess, LogInfo } = require("../utils/logger");


class userControllerClass {

  /**
   * this method is for get one user of the database (mongoDB Atlas)
   * @param {*} id 
   * @returns one user of database if this exist
   */
  getUser(id) {
    LogInfo("[GET USER]: id user is " + id);
    return new Promise((resolve, reject) => {
      if (id) {
        userModel.findById({ _id: id }, { password: 0 })
          .then((result) => {
            if (result === null || result === {}) {
              LogInfo("[GET USER]: response when get user is '{}`");
              resolve({ status: 200, data: { message: "El usuario no existe" } });
            } else {
              LogSuccess("[GET USER]: response of geted user perfect")
              resolve({ status: 200, data: result });
            }
          }).catch((err) => {
            LogError("[GET USER]:error on get user");
            reject({ status: 500, data: err });
          });
      }
    })
  };

  /**
   * this method is for get All user of the database (mongoDB Atlas)
   * @returns all user of database if this exist
   */
  getAllUsers() {
    return new Promise((resolve, reject) => {
      userModel.find({}, { password: 0 })
        .then((result) => {
          if (result.length <= 0) {
            LogInfo("[GET ALL USERS]: response when get all users is '[]'");
            resolve({status: 200, data:{message: "no hay usuarios" }});
          } else {
            LogSuccess("[GET ALL USERS]: response of geted all users perfect")
            resolve({ status: 200, data: result });
          }
        }).catch((err) => {
          LogError("[GET ALL USERS]:error on get all users");
          reject({ status: 500, data: err });
        });
    })
  }

  /**
   * this method is for create one user on the database (mongoDB Atlas)
   * @param {*} name 
   * @param {*} password 
   * @param {*} rol 
   * @returns the user created
   */
  createUser(name, password, rol) {
    LogInfo("[CREATE USER]: name user is " + name);
    LogInfo("[CREATE USER]: password user is " + password);
    return new Promise((resolve, reject) => {
      if (name && password && rol) {
        encriptarPassword(password)
          .then((passwordEncripted) => {
            userModel.create({ name, password: passwordEncripted, rol: rol })
              .then((result) => {
                LogSuccess("[CREATE USER]: response of created user perfect");
                resolve({ status: 201, data: { resgisted: true, message: "registrado correctamente", userId: result.id } });
              })
              .catch(err => {
                LogError("[CREATE USER]:error on create user");
                reject({ status: 502, data: err });
              })
          })
          .catch((err) => {
            LogError("[CREATE USER]:cant encrite password of user");
            reject({ status: 500, data: err });
          });
      } else {
        LogError("[CREATE USER]:password or name or rol are null");
        reject({ status: 406, data: { message: "password or name or rol are null" } });
      };
    })
  };


  /**
    * this method is for update one user on the database (mongoDB Atlas)
   * @param {*} id 
   * @param {*} data 
   * @returns the user updated
   */
  updateUser(id, data) {
    LogInfo("[Data]: data user is " + data);
    return new Promise((resolve, reject) => {
      if (data) {
        userModel
          .findByIdAndUpdate({ _id: id }, data, { rawResult: true, password: 0 })
          .then((result) => {
            LogSuccess("[UPDATE USER]: response of Update user perfect");
            resolve({ status: 200, data: result });
          })
          .catch((err) => {
            LogError("[UPDATE USER]:error of update user");
            reject({ status: 502, data: err });
          });
      } else {
        LogError("[UPDATE USER]:data is null");
        reject({ status: 406, data: { message: "data is null" } });
      };
    })
  };

  /**
   * this method is for delete one user on the database (mongoDB Atlas)
   * @param {*} id 
   * @returns the user eliminated
   */
  deleteUser(id) {
    LogInfo("[DELETE USER]: id user is " + id);
    return new Promise((resolve, reject) => {
      userModel.findByIdAndDelete({ _id: id }, { rawResult: true, password: 0 })
        .then((result) => {
          LogSuccess("[DELETE USER]: response of delete user perfect");
          resolve({ status: 200, data: { message: "usuario eliminado correctamente" } });
        })
        .catch((err) => {
          LogError("[DELETE USER]:error of delete user");
          reject({ status: 502, data: err });
        });
    })
  };


  /**
   * this method has the responsabliliy of create one token for de acces of user
   * @param {*} name 
   * @param {*} password 
   * @returns one token for the acces of user
   */
  loginUser(name, password) {
    LogInfo("[LOGIN USER]: name user is " + name);
    LogInfo("[LOGIN USER]: password user is " + password);
    return new Promise((resolve, reject) => {
      if (name && password) {
        userModel.findOne({ name: name })
          .then(response => {
            if (response) {
              LogInfo("[LOGIN USER]:  user is " + response._id);
              comparePassword(password, response.password)
                .then(isPassword => {
                  if (isPassword) {
                    LogInfo("[LOGIN USER]: isPasswor is true");
                    jwt.sign({ id: response._id }, process.env.SECRETKEY, { expiresIn: "7d" },
                      (err, tok) => { tok ? resolve({ status: 200, data: { auth: true, token: tok } }) : reject({ err }) })
                  } else {
                    LogError("[LOGIN USER]: isPasswor is false");
                    reject({ status: 400, data: { message: "password is incorrect" } });
                  }
                }).catch(err => {
                  LogError("[LOGIN USER]:error comparating password");
                  reject({ status: 500, data: err });
                })
            } else {
              LogError("[LOGIN USER]:  user is " + response);
              reject({ status: 400, data: { message: "name is incorrect" } });
            }
          })
          .catch(err => {
            LogError("[LOGIN USER]:error on find user with name");
            reject({ status: 502, data: err });
          })
      } else {
        LogError("[LOGIN USER]:password or name are null");
        reject({ status: 406, data: { message: "password or name are null" } });
      };
    })
  };
}
const userController = new userControllerClass();
module.exports = userController;