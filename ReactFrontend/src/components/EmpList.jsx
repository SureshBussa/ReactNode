import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }
    deleteEmployee(id) {
        const conf = window.confirm("Do you want to delete ?");

        if (conf) {
            EmployeeService.deleteEmployee(id)
                .then(res => {
                    this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
                    window.location.reload();

                });
        }

    }
    renderUserImage = (employee) => {
        if (employee.image && typeof employee.image === 'string') {
            const blobData = atob(employee.image);
            const arrayBuffer = new ArrayBuffer(blobData.length);
            const uintArray = new Uint8Array(arrayBuffer);
            for (let i = 0; i < blobData.length; i++) {
                uintArray[i] = blobData.charCodeAt(i);
            }
            const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

            const base64String = URL.createObjectURL(blob);
            return (
                <img
                    src={base64String}
                    alt="User"
                    style={{ height: 50, width: 50, borderRadius: 50 }}
                />
            );
        } else if (employee.image && Array.isArray(employee.image)) {
            const base64String = btoa(String.fromCharCode.apply(null, employee.image));
            return (
                <img
                    src={`data:image/jpeg;base64,${base64String}`}
                    alt="User"
                    style={{ height: 50, width: 50, borderRadius: 50 }}
                />
            );
        }
        return null;
    };

    handleLogout = () => {
        const confirm = window.confirm("Are you sure ?");
        if (confirm) {
            window.location.href = "/";
        }
        else {
            window.location.href = "/employee";
        }
    }
    handleAdd = () => {
        window.location.href = "/add-employee"
    }

    viewEmployee(id) {
        <Link to={`/view-employee/${id}`}>this.props.history.push(`/view-employee/${id}`);</Link>
    }
    editEmployee(id) {
        <Link to={`/update-employee/${id}`}>this.props.history.push(`/update-employee/${id}`);</Link>
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    addEmployee() {

        this.props.history.push('/add-employee');
    }

    render() {
        return (

            <div style={{ backgroundImage: `url('https://www.pixelstalk.net/wp-content/uploads/2016/06/Desktop-Light-Blue-Wallpaper-HD.jpg')`, height: '1000px', fontWeight: "bold", color: "white" }}>
                <div className='container'><br /><br />
                    <div className='btn-group btn-group-lg d-flex' role="group" aria-label="....">
                        <button type="button" className="btn btn-outline-dark w-100 active">Home Page</button>
                        <button type="button" className="btn btn-outline-dark w-100" onClick={() => this.handleAdd()} >Add New Employee</button>
                        <button type="button" className="btn btn-outline-dark w-100 ">Edit Employee Details</button>
                        <button type="button" className="btn btn-outline-dark w-100" onClick={() => this.handleLogout()}>{"LOGOUT"}</button>
                    </div>
                    <br></br><br></br>
                    <div className="row">
                        <table className="table table-striped table-bordered table-hover table-light" >

                            <thead class="thead-dark">
                                <tr>
                                    <th>Image</th>
                                    <th>  First Name</th>
                                    <th> Last Name</th>
                                    <th>  Email Id</th>
                                    <th>  Department</th>
                                    <th>  Salary</th>
                                    <th>  Gender</th>
                                    <th>  DateOfBirth</th>
                                    <th style={{ width: "170px", textAlign: "center" }}> Actions</th>
                                </tr>
                            </thead>
                            <tbody className='text-dark'>
                                {
                                    this.state.employees.map(
                                        employee =>
                                            <tr key={employee.id}>
                                                <td>{this.renderUserImage(employee)}</td>
                                                <td> {employee.first_name} </td>
                                                <td> {employee.last_name}</td>
                                                <td> {employee.email_id}</td>
                                                <td> {employee.department}</td>
                                                <td> {employee.salary}</td>
                                                <td> {employee.gender}</td>
                                                <td> {employee.dob}</td>
                                                <td>
                                                    <Link to={`/update-employee/${employee.id}`}><button onClick={() => this.editEmployee(employee.id)} className="btn btn-success" >Edit </button></Link>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListEmployeeComponent
