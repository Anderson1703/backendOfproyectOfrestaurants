const { Schema } = require("mongoose");

const menuSchema = new Schema({
    name: {
        type: String,
        max: 15,
        min: 5,
        required: true,
        unique: true
    },
    total_likes: {
        type: Number,
        default: 0
    },
    precio: {
        type: Number,
        required: true,
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref:"categorias"
    },
    comentarios:[{
        type: Schema.Types.ObjectId,
        ref:"comentarios"
    }]
})

menuSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

module.exports = menuSchema;