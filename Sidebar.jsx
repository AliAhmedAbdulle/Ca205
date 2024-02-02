import React, { useState } from "react";
import { FaHome, FaUsersCog, FaUserPlus, FaPaypal, FaBars, FaDoorOpen, FaFileInvoice } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import "../css/sidebar.css";

const Sidebar = ({ children, setlogin }) => {
  const [isOpen, SetisOpen] = useState(false);
  const toggle = () => SetisOpen(!isOpen);

  const menuItems = [
    {
      path: "/Home",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/Member",
      name: "Member",
      icon: <FaUserPlus />,
    },
    {
      path: "/Staff",
      name: "Staff",
      icon: <FaUsersCog />,
    },
    {
      path: "/Payment",
      name: "Payment",
      icon: <FaPaypal />,
    },
    {
      path: "/Salary",
      name: "Salary",
      icon: <FaFileInvoice />,
    },
  ];

  return (
    <div className="containera">
      <div style={{ width: isOpen ? "230px" : "70px" }} className="sidebar">
        <div className="top-section">
          <div style={{ marginLeft: isOpen ? "10px" : "0px", float: isOpen ? "right" : "none" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
          <div style={{ display: isOpen ? "block" : "none" }} className="logo">
            <h1>GYM</h1>
            <p>Dashboard</p>
          </div>
        </div>
        {menuItems.map((item, index) => (
          <NavLink to={item.path} key={index} className="link" activeClassName="Active">
            <div className="icons">{item.icon}</div>
            <div style={{ display: isOpen ? "block" : "none" }} className="linktext">
              {item.name}
            </div>
          </NavLink>
        ))}
        <Link to={"/"} className="logoutlink">
          <button className="btn-logout">
            <i>
              <FaDoorOpen />
            </i>
            <p style={{ display: isOpen ? "block" : "none" }}>Logout</p>
          </button>
        </Link>
      </div>
      <main style={{ marginLeft: isOpen ? "230px" : "70px" }}>{children}</main>
    </div>
  );
};

export default Sidebar;