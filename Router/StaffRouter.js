import express from "express";
import staff from "../models/Staffmodel.js";

const StaffRouters = express.Router();

//reading data

StaffRouters.get("/all", async (req, res) => {
  const sogali = await staff.find();

  res.send(sogali);
});

//post

StaffRouters.post("/add", async (req, res) => {
  const kudar = new staff({
    staffname: req.body.staffname,
    staffsex: req.body.staffsex,
    Adress: req.body.Adress,
    tell: req.body.tell,
    staffjob: req.body.staffjob,
    regdate: req.body.regdate,
  });

  await kudar.save();
  res.send("saved success");
});

StaffRouters.delete("/:id", async (req, res) => {
  try {
    const result = await staff.findOneAndDelete({ _id: req.params.id });
    if (!result) {
      // If no matching document was found
      return res.status(404).json({
        message: "Data not found for deletion",
      });
    }
    res.status(200).json({
      message: "Data deleted",
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

//update

StaffRouters.put("/:id", async (req, res) => {
  console.log(req.params.id);
  staff.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          staffname: req.body.staffname,
          staffsex: req.body.staffsex,
          Adress: req.body.Adress,
          tell: req.body.tell,
          staffjob: req.body.staffjob,
          regdate: req.body.regdate,
        },
      }
    )
    .then((result) => {
      res.status(200).json({
        update: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        Error: err,
      });
    });
});

export default StaffRouters;
