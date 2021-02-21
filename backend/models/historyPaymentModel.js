const mongoose =require( "mongoose");
const Schema = mongoose.Schema
const historyPaymentModel = Schema(
  {
    transactions_id: {
      type: String
    },
    createAt:{
      type:String
    },
    userID:{
      type:String
    },
    status:{
      type:String
    },
    boughtProducts:[{
      productId:{
        type:Schema.Types.ObjectId,
        ref:"productShop"
      },
      quantity:{
        type:String
      },
      amount:{
        type:String
      }
    }]
})
const HistoryPayment = mongoose.model("HistoryPayment", historyPaymentModel,'history_payment');

module.exports= HistoryPayment;
