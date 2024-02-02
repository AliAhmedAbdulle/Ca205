import mongoose from "mongoose";

const SalarySchema = mongoose.Schema(
  {
    staffname: { type: String, require: true },
    salprice: { type: String, require: true },
    regdate: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const salary = mongoose.model("salary", SalarySchema);
export default salary;
