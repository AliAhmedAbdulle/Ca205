import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import Payform from "../components/Payform";
import {FaEdit,FaTrash,FaPlus} from 'react-icons/fa'

function Staff() {
  const [open, setOpen] = useState(false);
  const [hide, sethide] = useState(false);
  const [selectedrow, setselectedrow] = useState([]);

  const [memname, setmemname] = useState("");
  const [price, setprice] = useState("");
  const [regdate, setregdate] = useState("");

  const [payment, setpayment] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const rptpayment = await axios.get("/api/payment/all");
      const resltdata = rptpayment.data;
      setpayment(resltdata);
    };
    fetchdata();
  }, []);

  const deletedata = async (e) => {
    try {
      await axios.delete("/api/payment/"+selectedrow,{});
      alert("deleted");
    } catch (errr) {
      console.log("error jiro");
    }
  };

  const updatedata = async () => {
    try {
      await axios.put("/api/payment/"+selectedrow, {
        memname,
        price,
        regdate,
      });
    } catch (errr) {
      console.log("error jiro");
    }
  };

  const columns = [
    { name: "ID", label: "ID", options: { display: false } },
    "Member Name","Price","Registration Date",

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
                  setselectedrow(payment[dataIndex]._id);
                  setmemname(payment[dataIndex].memname);
                  setprice(payment[dataIndex].price);
                  setregdate(payment[dataIndex].regdate);
                  sethide(true);
                }}
              >
                <FaEdit/>
              </button>
              <button
                className="btn-del"
                aria-label="edit"
                onClick={() => {
                  setselectedrow(payment[dataIndex]._id);
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
          <h1>Payments</h1>
        </div>
        <div className="button">
          <button className="btn" onClick={() => setOpen(true)}><FaPlus/></button>
        </div>
        {hide &&
        <div className="form-container">
          <form action="" onSubmit={updatedata}>
            <div className="form-reg">
              <div className="form-head">
                <h1>Payment Update</h1>
              </div>
              <div className="form-body">
                <div className="container">
                  <div className="row">
                    <div className="col-4">
                      <div className="text-field">
                        <label>Name</label>
                        <input type="text" onChange={(e)=>setmemname(e.target.value)} value={memname} required  placeholder="Enter Name"/>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="text-field">
                        <label>Price</label>
                        <input type="text" onChange={(e)=>setprice(e.target.value)} value={price} required placeholder="Enter Price"/>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="text-field">
                        <label>Date</label>
                        <input type="date" onChange={e => setregdate(e.target.value)} value={regdate} required/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="form-foot">
                <div className="btns">
                  <button className="btn-clear" type="reset">{" "}Clear{" "}</button>
                  <button className="btn-update">Update</button>
                  <button className="btn-back" onClick={(e) => { sethide(false); e.preventDefault();}} >Close</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        }
        {open && <Payform setOpen={setOpen} />}
        {!open && (
          <MUIDataTable
            className="muidata"
            title={"payment List"}
            data={payment.map((payment) => [
              payment._id,
              payment.memname,
              payment.price,
              payment.regdate,
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
