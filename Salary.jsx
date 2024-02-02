import React, { useEffect, useState } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Salform from "../components/Salform";
import {FaEdit,FaTrash,FaPlus} from 'react-icons/fa'


function User() {
  const [open, setOpen] = useState(false);
  const [hide, sethide] = useState(false);
  const [selectedrow, setselectedrow] = useState([]);
  const [salary, setsalary] = useState([]);

  const [staffname, setstaffname] = useState("");
  const [salprice, setsalprice] = useState("");
  const [regdate, setregdate] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      const rptuser = await axios.get("/api/salary/all");
      const resltdata = rptuser.data;
      setsalary(resltdata);
    };
    fetchdata();
  }, []);

  const deletedata = async (e) => {
      await axios.delete("/api/salary/" + selectedrow,{});
      alert("deleted");
  };

  const updatedata = async (e) => {
      await axios.put("/api/salary/"+selectedrow, {
        staffname,
        salprice,
        regdate
      });
  };

  const columns = [
    { name: "ID", label: "ID", options: { display: false } },
    "Staff Name","Salary","Registration Date",
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
                  setselectedrow(salary[dataIndex]._id);
                  setstaffname(salary[dataIndex].staffname);
                  setsalprice(salary[dataIndex].salprice);
                  setregdate(salary[dataIndex].regdate);
                  sethide(true);
                }}
              >
                <FaEdit/>
              </button>
              <button
                className="btn-del"
                aria-label="edit"
                onClick={() => {
                  setselectedrow(salary[dataIndex]._id);
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
    viewColumns:false,
    print: true,
    filterTable: false,
    filter:false,
    search: true,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
  };

  return (
    <div className="scontainer">
      <div>
        <div className="title">
          <h1>Salaries</h1>
        </div>
        <div className="button">
          <button className="btn" onClick={() => setOpen(true)}><FaPlus/></button>
        </div>
        {hide && 
          <div className="form-container">
            <form onSubmit={updatedata}>
              <div className="form-reg">
                <div className="form-head">
                  <h1>Salary Update</h1>
                </div>
                <div className="form-body">
                  <div className="container">
                    <div className="row">
                      <div className="col-4">
                        <div className="text-field">
                          <label>StaffName</label>
                          <input type="text" required placeholder="Enter Name" value={staffname} onChange={(e) => setstaffname(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-field">
                          <label>Salary</label>
                          <input type="text" required placeholder="Enter Password" value={salprice} onChange={(e) => setsalprice(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-field">
                          <label>Regdate</label>
                          <input type="date" required placeholder="Enter Password" value={regdate} onChange={(e) => setregdate(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="form-foot">
                  <div className="btns">
                    <button className="btn-clear" type="reset">  Clear </button>
                    <button className="btn-update">Update</button>
                    <button className="btn-back" onClick={(e) => { sethide(false); e.preventDefault();}} >Close</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        }
        {open && <Salform setOpen={setOpen} />}
        {!open && (
          <MUIDataTable
            className="muidata"
            title={"Salary List"}
            data={salary.map((salary) => [salary._id, salary.staffname, salary.salprice , salary.regdate])}
            columns={columns}
            options={options}
          />
        )}
      </div>
    </div>
  );
}

export default User;
