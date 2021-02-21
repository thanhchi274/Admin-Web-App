const mongoose =require( "mongoose");
const collectionSchema = new mongoose.Schema(
  {
    type_collection:{
      type:String,
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:'ProductShop'
    }]
  }
);
const Collections = mongoose.model("collections", collectionSchema,'collections');

module.exports= Collections;
