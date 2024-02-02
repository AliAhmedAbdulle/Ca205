import mongoose from "mongoose";

const StaffSchema = mongoose.Schema(
  {
    staffname: { type: String, require: true },
    staffsex: { type: String, require: true },
    Adress: { type: String, require: true },
    tell: { type: String, require: true },
    staffjob: { type: String, require: true },
    regdate: { type: String, require: true }
  },
  {
    timestamps: true,
  }
);

const staff = mongoose.model("staff", StaffSchema);
export default staff;
