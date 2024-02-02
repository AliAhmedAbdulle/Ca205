import express from "express";
import members from "../models/Memmodel.js";

const MemRouters = express.Router();

//reading data

MemRouters.get("/all", async (req, res) => {
  const sogali = await members.find();

  res.send(sogali);
});

//post

MemRouters.post("/add", async (req, res) => {
  const kudar = new members({
    memname: req.body.memname,
    memsex: req.body.memsex,
    Adress: req.body.Adress,
    tell: req.body.tell,
    regdate: req.body.regdate,
  });

  await kudar.save();
  res.send("saved success");
});

MemRouters.delete("/:id", async (req, res) => {
  try {
    const result = await members.findByIdAndDelete(req.params.id);
    if (result === null) {
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

MemRouters.put("/:id", async (req, res) => {
  console.log(req.params.id);
  members.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          memname: req.body.memname,
          memsex: req.body.memsex,
          Adress: req.body.Adress,
          tell: req.body.tell,
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

export default MemRouters;
