  import React, { useState } from "react";
import "../css/login.css";
import { Link } from "react-router-dom";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [login,setlogin]=useState("")
  const [err, seterr] = useState("");

  var user = "admin";
  var pass = "1234";

  const logining=(e)=>{
    if(username===user&&password===pass)
    {
      setlogin('Home');
    }else{
      seterr("waa qalad passawor ama magaca")
    }
  }


  return (
    <div className="lpgin-container">
      <div className="loginform">
        <h1>Login</h1>
        <form action="">
          <div className="txt">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Geli magacaaaga"
              required
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className="txt">
            <label>Password</label>
            <input
  type="number"
  name="password"
  placeholder="Geli password-kaaga"
  required
  onChange={(e) => setpassword(e.target.value)}
/>
            <p>{err}</p>
          </div>
            <Link to={login} onClick={logining}><button className="btn-login">Login</button></Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
