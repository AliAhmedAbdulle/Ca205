import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Memform from "../components/Memform";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function Member() {
  const [open, setOpen] = useState(false);
  const [hide, sethide] = useState(false);
  const [member, setmember] = useState([]);
  const [selectedrow, setselectedrow] = useState([]);

  const [memname, setmemname] = useState("");
  const [memsex, setmemsex] = useState("");
  const [Adress, setAdress] = useState("");
  const [tell, settell] = useState("");
  const [regdate, setregdate] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      const rptmember = await axios.get("/api/member/all");
      const resltdata = rptmember.data;
      setmember(resltdata);
    };
    fetchdata();
  }, []);

  const deletedata = async (e) => {
    await axios.delete("/api/member/" + selectedrow, {});
    alert("deleted");
  };

  const updatedata = async () => {
    await axios.put("/api/member/" + selectedrow, {
      memname,
      memsex,
      Adress,
      tell,
      regdate,
    });
    alert("Inserted");
  };

  const columns = [
    { name: "ID", label: "ID", options: { display: false } },
    "Member Name",
    "Gender",
    "Adress",
    "Tell",
    "Registration Date",
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          return (
            <form className="muifrom" action="" onSubmit={deletedata}>
              {/* update */}
              <button
                className="btn-up"
                aria-label="edit"
                onClick={(e) => {
                  e.preventDefault();
                  setselectedrow(member[dataIndex]._id);
                  setmemname(member[dataIndex].memname);
                  setmemsex(member[dataIndex].memsex);
                  setAdress(member[dataIndex].Adress);
                  settell(member[dataIndex].tell);
                  setregdate(member[dataIndex].regdate);
                  sethide(true);
                }}
              >
                <FaEdit />
              </button>
              {/* delete */}
              <button
                className="btn-del"
                aria-label="del"
                onClick={() => {
                  setselectedrow(member[dataIndex]._id);
                }}
              >
                <FaTrash />
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
    <div className="mcontainer">
      <div>
        <div className="title">
          <h1>Members</h1>
          <div className="button">
            <button className="btn" onClick={() => setOpen(true)}>
              <FaPlus />
            </button>
          </div>
        </div>
        {hide && (
          <div className="form-container">
            <form action="" onSubmit={updatedata}>
              <div className="form-reg">
                <div className="form-head">
                  <h1>Member Update</h1>
                </div>
                <div className="form-body">
                  <div className="container">
                    <div className="row">
                      <div className="col-4">
                        <div className="text-field">
                          <label>Name</label>
                          <input
                            type="text"
                            onChange={(e) => setmemname(e.target.value)}
                            placeholder="Enter Name"
                            required
                            value={memname}
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-field">
                          <label>gender</label>
                          <select
                            onChange={(e) => setmemsex(e.target.value)}
                            required
                            value={memsex}
                          >
                            <option value="" aria-disabled>
                              Enter your Sex
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
                            placeholder="Enter Address"
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
                    <button className="btn-clear" type="reset">
                      Clear
                    </button>
                    <button className="btn-update">Update</button>
                    <button
                      className="btn-back"
                      onClick={(e) => {
                        sethide(false);
                        e.preventDefault();
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
        {open && <Memform setOpen={setOpen} />}
        {!open && (
          <MUIDataTable
            className="muidata"
            title={"Member report"}
            data={member.map((member) => [
              member._id,
              member.memname,
              member.memsex,
              member.Adress,
              member.tell,
              member.regdate,
            ])}
            columns={columns}
            options={options}
          />
        )}
      </div>
    </div>
  );
}

export default Member;