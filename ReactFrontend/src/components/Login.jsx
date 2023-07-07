import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");

  const emailChange = (e) => {
    emailchange(e.target.value);
  };

  const passwordChange = (e) => {
    passwordchange(e.target.value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8090/login`,{email,password})
      .then(res => {
        if(res.data === "Success") {
          alert("Login Successfully");
          navigate('/employee');
        }
        else{
          alert("please provide correct details");
        }
      })
      .catch(err => console.log(err));
  }

  const registerPage = () => {
    navigate("/register");
  };

  return (
    <div style={{backgroundImage:`url('https://wallpaperaccess.com/full/1642306.jpg')`}}>
        <div className="Auth-form-container" >
            <form onSubmit={handlesubmit}>
                <div className="Auth-form-content" style={{fontWeight:"bolder"}}>
                    <h1 >LogIn</h1>
                    <label className="label">Email </label>
                    <input type="email" placeholder="Enter emailID" required onChange={emailChange}></input>
                    <label className="label" required>Password</label><br></br>
                    <input type="password" placeholder="Enter Password" required onChange={passwordChange}></input>
                    <button type="submit" className="btn btn-success">Login</button>  
                </div>
                <p>Don't have an account ?</p>
                <button className="btn btn-info" onClick={registerPage}> Create Account</button>
            </form>
        </div>
    </div>
  );
};
export default Login;
