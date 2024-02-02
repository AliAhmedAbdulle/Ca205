import axios from "axios";
import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Formstaff = ({setOpen}) => {
  const [memname, setmemname] = useState("");
  const [price, setprice] = useState("");
  const [regdate, setregdate] = useState("");
  

  const handler = async () => {
    try {
      const num=/^[0-9\b]+$/;
      if(!num.test(price))
      {
        alert("Price text-flied only allawed for number ")
      }
      else{
        await axios.post("/api/payment/add", {
          memname,
          price,
          regdate,
        });
      }
    } catch (errr) {
      console.log("error jiro");
    }
  };

  return (
    <div className="form-container">
      <form action="" onSubmit={handler}>
        <div className="form-reg">
          <div className="form-head">
            <h1>Payment Registration</h1>
          </div>
          <div className="form-body">
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <div className="text-field">
                    <label>Name</label>
                    <input type="text" onChange={(e)=>setmemname(e.target.value)} required  placeholder="Enter Name"/>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-field">
                    <label>Price</label>
                    <input type="text" onChange={(e)=>setprice(e.target.value)} required placeholder="Enter Price"/>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-field">
                    <label>Date</label>
                    <input type="date" onChange={e => setregdate(e.target.value)} required/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="form-foot">
            <div className="btns">
              <button className="btn-clear" type="reset">{" "}Clear{" "}</button>
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
