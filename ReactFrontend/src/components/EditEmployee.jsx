import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const emailState = {
    emailId: '',
    error: ''
}
const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export function withRouter(Children){
    return(props)=>{
        const match={params:useParams()};
        return  <Children{...props} match={match}/>
    }
}

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
          
            id:this.props.match.params.id,
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
        this.updateEmployee = this.updateEmployee.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
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

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res)=>{
            let employee =res.data[0];
            this.setState({...this.state,firstName:employee.first_name,
            lastName:employee.last_name,
             emailId:employee.email_id,
             department:employee.department,
             salary:employee.salary,
             gender:employee.gender,
             dob:employee.dob,
             image:employee.image
    });
});
    }
    handleHomePage=() =>{
        window.location.href="/employee";
     }
    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId,department :this.state.department,salary:this.state.salary,gender:this.state.gender,dob:this.state.dob,image:this.state.image};
        console.log('employee => ' + JSON.stringify(employee));

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

        else if(window.confirm("Do you want to save ?"))
        { EmployeeService.updateEmployee(employee,this.state.id)
            .then(res =>{
            <Link to='/employee'> this.props.history.push('/employees');</Link>
                window.location.replace("/employee");
            });

            }
    }
    addEmployee(){
        this.props.history.push('/add-employee');
    }
    handleAdd=() =>{
        window.location.href="/add-employee"
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
    cancel(){
        this.props.history.push('/employee');
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
    handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
      
        reader.onload = (event) => {
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
            />
          );
        }
        return null;
      };
    render(){
        return(
             <div>
                
               <div style={{backgroundImage:`url('https://static.vecteezy.com/system/resources/previews/021/748/720/original/dynamic-abstract-gray-white-diagonal-shape-light-and-shadow-wavy-background-eps10-vector.jpg')`,fontWeight:"bold",fontFamily:"revert",height:'1000px'}}>
                    <div className = "container"> <br/><br/>
                    <div className='btn-group btn-group-lg d-flex' style={{fontWeight:"bold"}} role="group" aria-label="....">
                        <Link to='/employee'> <button className="btn btn-outline-dark" size="xl" style={{marginLeft: "10px",size:'xl', height: "50px"}}>{"<<Back"}</button></Link>
                        <button type="button" className="btn btn-outline-dark w-100" onClick={() =>this.handleHomePage()}>Home Page</button>
                        <button type="button" className="btn btn-outline-dark w-100 active">Edit Employee Details</button>
                        <button type="button" className="btn btn-outline-dark w-100" onClick={() =>this.handleAdd()}>Add New Employee</button>
                    </div>
                            <div className = "d-flex" >
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control" 
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control" 
                                            value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Email Id: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control" type="email" 
                                            value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label>Department</label>
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
                                            value={this.state.salary} onChange={this.changeSalaryHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label>Gender: </label>
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
                                            value={this.state.dob} onChange={this.changeDobHandler}/>
                                    </div>
                                    <div className="form-group">
                                          <label>Image</label>
                                          <input type="file"  accept="image/*"   onChange={this.handleImageChange}  className="form-control"  required />
                                             {this.renderUserImage()}
                                          <small className="form-text">Upload a profile picture for the user.</small>
                                    </div>
                                    <Link to='/employee'><button  onClick={this.updateEmployee}  className="btn btn-success"  >Update</button></Link>
                                    <Link to='/employee'> <button className="btn btn-danger"  style={{marginLeft: "10px"}}>Cancel</button></Link>
                                </form>
                            </div>
                        </div>
                    </div>
               </div>
        </div>
    )
}
        
    }
export default withRouter(UpdateEmployeeComponent)
