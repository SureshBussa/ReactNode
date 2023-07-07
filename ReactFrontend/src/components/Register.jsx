import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const nameChange = (e) => {
    namechange(e.target.value);
  };

  const emailChange = (e) => {
    emailchange(e.target.value);
  };

  const passwordChange = (e) => {
    passwordchange(e.target.value);
  };

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const empData = { name, email, password };
    await axios.post("http://localhost:8090/reguser", empData);
    alert("Registered Successfully!");
    navigate("/");
  };

  return (
    <div style={{backgroundImage:`url('https://c4.wallpaperflare.com/wallpaper/280/44/9/dark-black-cube-square-wallpaper-preview.jpg')`}}>
        <div className="Auth-form-container">
            <form onSubmit={handlesubmit}>
                <div className="Auth-form-content" style={{fontWeight:"bolder"}}>
                    <h1>Register</h1>
                    <div className="Auth-form-content">
                        <label className="label">User Name </label>
                        <input type="text" placeholder="Enter User_Name" required onChange={nameChange}></input>
                    </div>
                    <div>
                        <label className="label">Email_Id</label>
                        <input type="email" placeholder="Enter email_ID" required onChange={emailChange}></input>
                    </div>
                        <label className="label" required>Password</label>
                        <input type="password" placeholder="Enter Password" required onChange={passwordChange}></input>
                    <button type="submit" className="btn btn-success">Register </button>
                </div> 
                    <p>Have an account?</p>
                     <Link to={"/"}><button className="btn btn-info"> login</button></Link>
            </form>
        </div>
    </div>
  );
};
export default Register;
