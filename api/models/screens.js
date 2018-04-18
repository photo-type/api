const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const ScreensModel = mongoose.Schema(
  {

    _id: { type: Schema.Types.ObjectId, auto: true },
    // Double keying, prototype model is saving keys for screens and screens for prototypes that it belongs to 
    // but we may need it in some case
    // making life easier, optimize later
    _prototype: { type: Schema.Types.ObjectId, ref: "prototypes" },
    path: { type: String },
    actions: [
      {
        description: { type: String },
        _id: { type: Schema.Types.ObjectId, auto: true },
        dimensions: {
          x: { type: Number },
          y: { type: Number },
          height: { type: Number },
          width: { type: Number },
          color: { type: String }
        },
        link: {
          type: Schema.Types.ObjectId, ref: "screens"
        },
        text: {
          type: String
        },
        type: {
          type: String
        }
      }
    ]
  },
  {
    usePushEach: true
  })

module.exports = mongoose.model("screens", ScreensModel);
