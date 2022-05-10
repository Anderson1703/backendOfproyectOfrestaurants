const { Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    max: 15,
    min: 5,
    required: true,
    unique: true
  },
  rol: {
    type: String,
    max: 15,
    min: 5,
    required: true
  },
  password: {
    type: String,
    match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
    required: true,
    min: 8
  }
})

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete password
  }
})

module.exports = userSchema;