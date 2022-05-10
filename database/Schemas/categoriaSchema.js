const { Schema } = require("mongoose");

const categoriaSchema = new Schema({
  name: {
    type: String,
    max: 15,
    min: 5,
    required: true,
    unique: true
  },
  menus:[{
    type: Schema.Types.ObjectId,
    ref:"menus"
  }]
})

categoriaSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

module.exports = categoriaSchema;