import axios from "axios";
import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Formstaff = ({ setOpen ,setlogin}) => {
  const [staffname, setstaffname] = useState("");
  const [staffsex, setstaffsex] = useState("");
  const [Adress, setAdress] = useState("");
  const [tell, settell] = useState("");
  const [staffjob, setstaffjob] = useState("");
  const [regdate, setregdate] = useState("");
  

  const handler = async (e) => {
    try {
      const num=/^[0-9\b]+$/;
      if(!num.test(tell))
      {
        alert("Tell text-flied only allawed for number ")
      }else{
        await axios.post("/api/staff/add", {
          staffname,
          staffsex,
          Adress,
          tell,
          staffjob,
          regdate
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
            <h1>Staff Registration</h1>
          </div>
          <div className="form-body">
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <div className="text-field">
                    <label>Name</label>
                    <input type="text" onChange={(e)=>setstaffname(e.target.value)} required  placeholder="Enter Name"/>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-field">
                    <label>Sex</label>
                    <select onChange={(e)=>setstaffsex(e.target.value)} required>
                      <option value="" aria-disabled>Enter yyour Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-field">
                    <label>Adress</label>
                    <input type="text" onChange={(e)=>setAdress(e.target.value)} required placeholder="Enter Sddress"/>
                  </div>
                </div>
                <div id="line2" className="col-4">
                  <div className="text-field">
                    <label>Tell</label>
                    <input type="text" onChange={(e)=>settell(e.target.value)} required placeholder="Enter Tell Number"/>
                  </div>
                </div>
                <div id="line2" className="col-4">
                  <div className="text-field">
                    <label>Job</label>
                    <select onChange={(e)=>setstaffjob(e.target.value)} required>
                      <option value="" aria-disabled>Enter job type</option>
                      <option value="Trainer">Trainer</option>
                      <option value="Cashier">Cashier</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div id="line2" className="col-4">
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
