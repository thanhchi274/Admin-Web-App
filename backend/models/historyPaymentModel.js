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
    product:{
      type:Array
    },
    client_secret:{
      type:String
    },
    payment_status:{
      type:String
    },
    currency:{
      type:String
    },
    amount:{
      type:String
    }
})
const HistoryPayment = mongoose.model("HistoryPayment", historyPaymentModel,'history_payment');

module.exports= HistoryPayment;
