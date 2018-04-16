const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const PrototypeSchema = mongoose.Schema({
  _id: { type: Schema.Types.ObjectId , auto:true},  
  user : {type: Schema.Types.ObjectId , ref :"users"},
  name: { type: String },
  created_at: { type: Date, default: Date.now },
  screens:[
    {type: Schema.Types.ObjectId, default: [], ref:"screens"}
  ]
},{
  usePushEach: true
})
module.exports = mongoose.model("prototypes",PrototypeSchema)