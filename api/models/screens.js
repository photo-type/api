const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const ScreensModel = mongoose.Schema(
  {

    _id: { type: Schema._id, unique: true },
    // Double keying, prototype model is saving keys for screens and screens for prototypes that it belongs to 
    // but we may need it in some case
    // making life easier, optimize later
    prototype: { type: Schema.Types.ObjectId },
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
          type: Schema.Types._id
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
