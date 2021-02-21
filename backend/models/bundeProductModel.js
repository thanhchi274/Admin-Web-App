const mongoose =require( "mongoose");
const Schema = mongoose.Schema
const bundleProductModel = new Schema(
  {
    productId:{
              type:String
    },
    bundleItem:{
              type:Schema.Types.ObjectId,
              ref:"productShop"
    },
    discount:{
              type:String
    },
    createAt:{
      type:String
    },
    startTime:{
      type:String
    },
    endTime:{
      type:String
    },

})
const bundleProduct = mongoose.model("HistoryPayment", bundleProductModel,'history_payment');
module.exports= bundleProduct;
