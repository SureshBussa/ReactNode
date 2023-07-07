import EmpList from "./components/EmpList";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import { Routes } from "react-router-dom";
import "../src/styling/Login.css";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  return ( 
    <div>
      <Router>
        <div className="contain">
          <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path='/register' element={<Register/>} />
             <Route  path="/employee"  element={<EmpList />}></Route>
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path ="/update-employee/:id" element={<EditEmployee/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;