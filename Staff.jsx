import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Formstaff from "../components/Formstaff";
import {FaEdit,FaTrash,FaPlus} from 'react-icons/fa'

function Staff() {
  const [open, setOpen] = useState(false);
  const [hide, sethide] = useState(false);
  const [selectedrow, setselectedrow] = useState([]);
  const [staff, setstaff] = useState([]);

  const [staffname, setstaffname] = useState("");
  const [staffsex, setstaffsex] = useState("");
  const [Adress, setAdress] = useState("");
  const [tell, settell] = useState("");
  const [staffjob, setstaffjob] = useState("");
  const [regdate, setregdate] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      const rptstaff = await axios.get("/api/staff/all");
      const resltdata = rptstaff.data;
      setstaff(resltdata);
    };
    fetchdata();
  }, []);

  const deletedata = async (e) => {
    try {
      await axios.delete("/api/staff/" + selectedrow, {});
      alert("deleted");
    } catch (errr) {
      console.log("error jiro");
    }
  };

  const updatedata = async () => {
    try {
      await axios.put("/api/staff/" + selectedrow, {
        staffname,
        staffsex,
        Adress,
        tell,
        staffjob,
        regdate,
      });
    } catch (errr) {
      console.log("error jiro");
    }
  };

  const columns = [
    { name: "ID", label: "ID", options: { display: false } },
    { name: "Staff Name", label: "Staff Name" },
    { name: "Gender", label: "Gender" },
    { name: "Adress", label: "Adress" },
    { name: "Tell", label: "Tell" },
    { name: "Job", label: "Job" },
    { name: "Registration Date", label: "Registration Date" },
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          return (
            <form className="muifrom" action="" onSubmit={deletedata}>
              <button
                className="btn-up"
                aria-label="edit"
                onClick={(e) => {
                  e.preventDefault();
                  setselectedrow(staff[dataIndex]._id);
                  setstaffname(staff[dataIndex].staffname);
                  setstaffsex(staff[dataIndex].staffsex);
                  setAdress(staff[dataIndex].Adress);
                  settell(staff[dataIndex].tell);
                  setstaffjob(staff[dataIndex].staffjob);
                  setregdate(staff[dataIndex].regdate);
                  sethide(true);
                }}
              >
                <FaEdit/>
              </button>
              <button
                className="btn-del"
                aria-label="edit"
                onClick={() => {
                  setselectedrow(staff[dataIndex]._id);
                }}
              >
                <FaTrash/>
              </button>
            </form>
          );
        },
      },
    },
  ];

  const options = {
    download: true,
    viewColumns: false,
    print: true,
    filterTable: false,
    filter: false,
    search: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
  };

  return (
    <div className="scontainer">
      <div>
        <div className="title">
          <h1>Staffs</h1>
        </div>
        <div className="button">
          <button className="btn" onClick={() => setOpen(true)}><FaPlus/></button>
        </div>
        {hide && (
          <div className="form-container">
            <form action="" onSubmit={updatedata}>
              <div className="form-reg">
                <div className="form-head">
                  <h1>Staff Update</h1>
                </div>
                <div className="form-body">
                  <div className="container">
                    <div className="row">
                      <div className="col-4">
                        <div className="text-field">
                          <label>Name</label>
                          <input
                            type="text"
                            onChange={(e) => setstaffname(e.target.value)}
                            required
                            placeholder="Enter Name"
                            value={staffname}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-field">
                          <label>Sex</label>
                          <select
                            onChange={(e) => setstaffsex(e.target.value)}
                            required
                            value={staffsex}
                          >
                            <option value="" aria-disabled>
                              Enter yyour Sex
                            </option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-field">
                          <label>Adress</label>
                          <input
                            type="text"
                            onChange={(e) => setAdress(e.target.value)}
                            required
                            placeholder="Enter Sddress"
                            value={Adress}
                          />
                        </div>
                      </div>
                      <div id="line2" className="col-4">
                        <div className="text-field">
                          <label>Tell</label>
                          <input
                            type="text"
                            onChange={(e) => settell(e.target.value)}
                            required
                            placeholder="Enter Tell Number"
                            value={tell}
                          />
                        </div>
                      </div>
                      <div id="line2" className="col-4">
                        <div className="text-field">
                          <label>Job</label>
                          <select
                            onChange={(e) => setstaffjob(e.target.value)}
                            required
                            value={staffjob}
                          >
                            <option value="" aria-disabled>
                              Enter job type
                            </option>
                            <option value="Trainer">Trainer</option>
                            <option value="Cashier">Cashier</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div id="line2" className="col-4">
                        <div className="text-field">
                          <label>Date</label>
                          <input
                            type="date"
                            onChange={(e) => setregdate(e.target.value)}
                            required
                            value={regdate}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="form-foot">
                  <div className="btns">
                    <button className="btn-clear" type="reset"> Clear</button>
                    <button className="btn-update">Update</button>
                    <button className="btn-back" onClick={(e) => { sethide(false); e.preventDefault();}} >Close</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
        {open && <Formstaff setOpen={setOpen} />}
        {!open && (
          <MUIDataTable
            className="muidata"
            title={"Staff List"}
            data={staff.map((staff) => [
              staff._id,
              staff.staffname,
              staff.staffsex,
              staff.Adress,
              staff.tell,
              staff.staffjob,
              staff.regdate,
            ])}
            columns={columns}
            options={options}
          />
        )}
      </div>
    </div>
  );
}

export default Staff;
