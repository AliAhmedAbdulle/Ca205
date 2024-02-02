import mongoose from "mongoose";

const PaySchema = mongoose.Schema(
  {
    memname: { type: String, require: true },
    price: { type: Number, require: true },
    regdate: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const payment = mongoose.model("payment", PaySchema);
export default payment;
