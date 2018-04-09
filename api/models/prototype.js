const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const PrototypeSchema = mongoose.Schema({
  name: { type: String },
  created_at: { type: Date, default: Date.now },
  screens: [{
    _id: { type: Schema._id, unique: true },
    path: { type: String },
    actions: [
      {
        dimensions: {
          x: { type: Number },
          y: { type: Number },
          height: { type: Number },
          width: { type: Number },
          color: {type:String}
        },
        link: {
          type: Schema._id
        },
        text: {
          type: String
        },
        type: {
          type: String
        }
      }
    ]
  }]
})
module.exports = mongoose.model("prototypes",PrototypeSchema)