const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const PrototypeSchema = mongoose.Schema({
  name: { type: String },
  created_at: { type: Date, default: Date.now },
  screens:[{
    _id: {type: Schema.Types.ObjectId}
  }]
})
module.exports = mongoose.model("prototypes",PrototypeSchema)