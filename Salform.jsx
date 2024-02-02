import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const Formstaff = ({ setOpen,setlogin}) => {

  const [staffname, setstaffname] = useState("");
  const [salprice, setsalprice] = useState("");
  const [regdate, setregdate] = useState("");

  const usehandler = async (e) => {
    try {
      const num=/^[0-9\b]+$/;
      if(!num.test(salprice))
      {
        alert("Salary Price text-flied only allawed for number ")
      }
      else{
        await axios.post("/api/salary/add", {
          staffname,
          salprice,
          regdate
        });
      }
      toast.success("xogta waa la");
    } catch (errr) {
      console.log("error jiro");
    }
  };

  return (
    <div className="form-container">
      <form className="" onSubmit={usehandler}>
        <div className="form-reg">
          <div className="form-head">
            <h1>Salary Registration</h1>
          </div>
          <div className="form-body">
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <div className="text-field">
                    <label>Name</label>
                    <input type="text" required placeholder="Enter Name" onChange={(e) => setstaffname(e.target.value)} />

                  </div>
                </div>
                <div className="col-4">
                  <div className="text-field">
                    <label>Salary</label>
                    <input type="text" required placeholder="price" onChange={(e) => setsalprice(e.target.value)} />
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-field">
                    <label>Regdate</label>
                    <input type="date" required placeholder="price" onChange={(e) => setregdate(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="form-foot">
            <div className="btns">
              <button className="btn-clear" type="reset">Clear</button>
              <button className="btn-save">Save</button>
              <button className="btn-back" onClick={(e) => { setOpen(false); e.preventDefault();}} >Close</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Formstaff;
