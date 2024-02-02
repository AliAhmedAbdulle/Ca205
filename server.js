import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import MemRouters from "./Router/MemRouter.js";
import StaffRouters from "./Router/StaffRouter.js";
import PayRouters from "./Router/PayRouter.js";
import SalaryRouters from "./Router/SalaryRouter.js";

const app = express();

dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/member/', MemRouters)
app.use('/api/staff/', StaffRouters)
app.use('/api/payment/', PayRouters)
app.use('/api/salary/', SalaryRouters)

mongoose.connect('mongodb://127.0.0.1/gym', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB!');
}).catch((err) => {
  console.log(err.message);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});