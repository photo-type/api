const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const ScreensModel = mongoose.Schema(
  {

    _id: { type: Schema.Types.ObjectId, auto:true },
    // Double keying, prototype model is saving keys for screens and screens for prototypes that it belongs to 
    // but we may need it in some case
    // making life easier, optimize later
    createdBy: { type: Schema.Types.ObjectId , ref:"prototype"},
    path: { type: String },
    actions: [
      {
        dimensions: {
          x: { type: Number },
          y: { type: Number },
          height: { type: Number },
          width: { type: Number },
          color: { type: String }
        },
        link: {
          type: Schema.Types.ObjectId
        },
        text: {
          type: String
        },
        type: {
          type: String
        }
      }
    ]
  })

  module.exports = mongoose.model("screens", ScreensModel);
