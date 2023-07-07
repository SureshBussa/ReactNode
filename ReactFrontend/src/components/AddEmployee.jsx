import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';
const emailState = {
    emailId: '',
    error: ''
}
const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            emailId: '',
            department:'',
            salary:'',
            gender:'',
            image:'',
            dob:''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }
    emailValidation(){
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!this.state.emailId || regex.test(this.state.emailId) === false){
            this.setState({
                error: alert( "Email is not valid")
            });
            return false;
        }
        return true;
    }
    saveEmployee = (event) => {
        event.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId,department :this.state.department,salary:this.state.salary,gender:this.state.gender,dob:this.state.dob, image:this.state.image};
        console.log('employee => ' + JSON.stringify(employee));
        // const conf= window.confirm("Do you want to save ?");

        if (this.state.firstName.length === 0) {
            alert("firstName field is Empty");
          }
         else if (this.state.lastName.length === 0) {
            alert("lastName field is Empty");
          }
          else if(!this.state.emailId || regex.test(this.state.emailId) === false){
            this.setState({
                error: alert( "email format is incorrect"),
                emailState
            });
            return false;
         }
          else if (this.state.department.length === 0) {
            alert("Department field is Empty");
          }
          else if (this.state.salary.length === 0) {
            alert("salary field is Empty");
          }
          else if (this.state.gender.length === 0) {
            alert("gender field is Empty");
          }
          else if (this.state.dob.length === 0) {
            alert("dob field is Empty");
          }
          
        else if(window.confirm("Do you want to save ?")){
            EmployeeService.createEmployee(employee)
            .then(res =>{
                <Link to='/employee'> this.props.history.push('/employees');</Link>
                window.location.replace("/employee");
                
            });

            }

    }
    handleLogout= () =>{
        const confirm= window.confirm("Are you sure ?");
        if(confirm){
                window.location.href="/";
            }
            else{
                window.location.href="/add-employee"
            }
     }
     handleHomePage=() =>{
        window.location.href="/employee";
     }
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});

    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }
    changeDepartmentHandler= (event) => {
        this.setState({department: event.target.value});
    }
    changeSalaryHandler= (event) => {
        this.setState({salary: event.target.value});
    }
    changeGenderHandler= (event) => {
        this.setState({gender: event.target.value});
    }
    changeDobHandler= (event) => {
        this.setState({dob: event.target.value});
    }

    cancel(){
        this.props.history.push('/employee');
    }
    handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
      
        reader.onload = (event) => {
            // this.setState({ base64String : event.target.result.split(",")[1]});
            const base64String = event.target.result.split(",")[1];
           this.setState({image:base64String});
         
        };
      
        reader.onerror = (error) => {
          console.log("Error: ", error);
        };
      
        if (file) {
          reader.readAsDataURL(file);
        }
      };  
       renderUserImage = () => {
        if (this.state.image) {
          return (
            <img
              src={`data:image/jpeg;base64,${this.state.image}`}
              alt="User"
              style={{height:70, width:70, borderRadius:50}}
              className="user-image"
            />
          );
        }
        return null;
    }
    render(){
        return(
        <div style={{backgroundImage:`url('https://wallpaperset.com/w/full/8/3/7/492402.jpg')`, height: '1000px'}}>
               <div className = "container"><br></br><br></br>
                        <div className='btn-group btn-group-lg d-flex ' role="group" aria-label="....">
                            <button type="button" className="btn btn-outline-dark w-100" onClick={()=>this.handleHomePage()}>Home Page</button>
                            <button type="button" className="btn btn-outline-dark w-100 active" >Add New Employee</button>
                            <button type="button" className="btn btn-outline-dark w-100" onClick={()=>this.handleLogout()}>{"LOGOUT"}</button>
                        </div>
                        <div className = "row">
                            <div className = " w-100 ">
                                <div className = "card-body" style={{fontWeight:"bolder"}}>
                                    <form>
                                        <div className = "form-group" >
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                            value={this.state.firstName}  required="required" onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label  required="required"> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                            value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" type="email" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label > Department: </label>
                                            <select placeholder="Department" name="department" className="form-control" 
                                                value={this.state.department} required onChange={this.changeDepartmentHandler}>
                                                <option>None</option>
                                                <option>Sales</option>
                                                <option>HR</option>
                                                <option>Accounts</option>
                                            </select>
                                        </div>
                                        <div className = "form-group">
                                            <label > Salary: </label>
                                            <input type='number' placeholder="salary" name="salary" className="form-control" 
                                            value={this.state.salary} required onChange={this.changeSalaryHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label > Gender: </label>&emsp;
                                        <div>
                                            <label>
                                                <input type="radio" name="gender" value="Male" 
                                                onChange={this.changeGenderHandler} required />Male
                                            </label>
                                            <label style={{marginLeft: "30px"}}>
                                                <input type="radio" name="gender" value="Female"
                                                onChange={this.changeGenderHandler} />Female
                                            </label>
                                            </div>
                                        </div>
                                        <div className = "form-group">
                                            <label > DateofBirth: </label>
                                            <input placeholder="dob" name="dob" className="form-control"  type='date'
                                            value={this.state.dob} required onChange={this.changeDobHandler}/>
                                        </div>     
                                        <div className="form-group" >
                                          <label>Image</label>
                                          <input type="file"  accept="image/*"    onChange={this.handleImageChange}  className="form-control"  required  />
                                                     {this.renderUserImage()}
                                       <small className="form-text ">Upload a profile picture for the user.</small>
                                    </div>                  
                                            <Link to='/employee'><button className="btn btn-success" onClick={this.saveEmployee} >Add</button></Link>
                                            <Link to='/employee'> <button className="btn btn-danger"  style={{marginLeft: "10px"}}>Cancel</button></Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                </div>
        </div>
    )}
        
}


export default CreateEmployeeComponent
