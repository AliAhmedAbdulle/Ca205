import mongoose from "mongoose";

const MemSchema = mongoose.Schema(
  {
    memname: { type: String, require: true },
    memsex: { type: String, require: true },
    Adress: { type: String, require: true },
    tell: { type: Number, require: true },
    regdate: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const members = mongoose.model("members", MemSchema);
export default members;
