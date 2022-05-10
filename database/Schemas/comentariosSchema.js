const { Schema } = require("mongoose");

const comentariosSchema = new Schema({
  comment: {
    type: String,
    max: 200,
    min: 4,
    required: true
  },
  fecha: {
    type: Date,
    default: new Date()
  },
  total_likes: {
    type: Number,
    default: 0
  },
  menu:{
    type: Schema.Types.ObjectId,
    ref:"menus"
}
})

comentariosSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

module.exports = comentariosSchema;