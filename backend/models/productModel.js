const mongoose =require( "mongoose");
const Schema = mongoose.Schema
const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
    },
    sale:{
      type:Boolean
    },
    collections:{
      type:Schema.Types.ObjectId,
      ref:'collections'
    },
    comment: [{
      type:Schema.Types.ObjectId,
      ref:'comment'
    }],
    new:{
      type:Boolean
    },
    price:{
      type:String
    },
    discount:{
      type:String,
    },
    stock: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    shortDetails:{
      type:String
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    manufactureDate: {
      type: String,
    },
    colors:{
      type:Array,
    },
    tags:{
      type:[String],
    },
    variants:{
      type:Array
    },
    createAt: {
      type: String,
      required: true,
      default: "2020/01/01",
    },
  }
);
const ProductShop = mongoose.model("ProductShop", productSchema,'product');

module.exports= ProductShop;
