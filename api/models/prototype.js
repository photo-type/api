const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const PrototypeSchema = mongoose.Schema({
  _id: { type: Schema._id, unique: true },  
  user : {type: Schema.Types.ObjectId},
  name: { type: String },
  created_at: { type: Date, default: Date.now },
  screens:[{
    _id: {type: Schema.Types.ObjectId, default: []}
  }]
})
module.exports = mongoose.model("prototypes",PrototypeSchema)