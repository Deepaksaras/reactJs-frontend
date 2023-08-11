import React ,{ useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
const ViewEmployee = () => {

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    useEffect(() => {
      fetchEmployees();
    }, []);
  
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employees/');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    const handleEditClick = (employee) => {
        console.log(employee);
        setSelectedEmployee(employee);
      };
    

  return (
    <div>
        
   
      <Sidebar/>
      <div id="wrapper">
            <div id="content-wrapper" className="d-flex flex-column"> 
                {/* Main Content */}
                <div id="content" className="page-content-wrapper"> 
                {/* Begin Page Content */}
                <div className="container-fluid">
                    <div className="page-title justify-content-between">
                    <div className="title-wrap"><h1 className="title is-4">View Employee</h1></div>
                    <div className="balance-strip">
                        <div className="card shadow-primary bg-primary text-white rounded">
                        <div className="d-flex">
                            <div className="id-bal">
                            <i className="lnil lnil-user-alt-2" />
                            <span><strong>ID :</strong> <span>usd</span></span>
                            </div>
                            <div className="id-bal">
                            <i className="lnil lnil-laptop-alt-switch" />
                            <span><strong>Last Login :</strong> <span>02:58 PM 12 Jul 2023</span></span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="card mb-3">
                    <div className="card-body d-flex justify-content-between">
                        <form className="form-inline">
                        <div className="form-group">
                            <input className="form-control" placeholder="Search.." id />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-icon"><i className="lnil lnil-search-alt" /></button>
                        </div>
                        <div className="form-group">
                            <select className="form-control">
                            <option>Entries</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            </select>
                        </div>
                        </form>
                        <button type="button" className="btn btn-outline-dark"><i className="lnil lnil-plus icon" />Add Employee</button>	
                    </div>
                    </div>
                    <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                        <table className="table table-hover">
                            <tbody><tr>
                                <th>No</th>
                                <th>User Name</th>
                                <th>Employee Name</th>
                                <th>Designation</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Join</th>
                                <th>Shift</th>
                                <th>Tools</th>
                            </tr>
                           
                            {employees.map((employee) => (
                                    <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.EmployeeUserName}</td>
                                    <td>{employee.Name}</td>
                                    <td>{employee.Designation}</td>
                                    <td>{employee.Mobile}</td>
                                    <td>{employee.Email}</td>
                                    <td>{employee.DateOfJoining}</td>
                                    <td>{employee.WorkShift}</td>
                                    <td>
                                        <div className="buttons">
                                        <button
                                            type="button" 
                                            className="button tooltip-top"
                                            data-tooltip="Edit"
                                             data-toggle="modal"
                                             data-target="#Modal"
                                            onClick={() => handleEditClick(employee)}
                                        >
                                            <i className="lnil lnil-pencil" />
                                        </button>
                                        <button
                                            type="button"
                                            className="button tooltip-top"
                                            data-tooltip="Delete"
                                           
                                        >
                                            <i className="lnil lnil-trash" />
                                        </button>
                                        </div>
                                    </td>
                                    </tr>
                                ))}
                           
                            </tbody>
                        </table>
                    </div>
                    </div>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                    <div className="table-page">Showing 1 to 10 of 16 entries</div>
                    {/* <ul className="pagination">
                        <li className="page-item disabled">
                        <a className="page-link" href="#">←</a>
                        </li>
                        <li className="page-item active">
                        <a className="page-link" href="#">1</a>
                        </li>
                        <li className="page-item">
                        <a className="page-link" href="#">2</a>
                        </li>
                        <li className="page-item">
                        <a className="page-link" href="#">3</a>
                        </li>
                        <li className="page-item">
                        <a className="page-link" href="#">→</a>
                        </li>
                    </ul> */}
                    </div>
                </div>
                {/* /.container-fluid */} 
                </div>
                {/* End of Main Content */} 
            </div>

      </div>

      
       



       {/* Edit Modal */}
       
        <div className="modal" id="Modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Employee</h5>
               
                 
              </div>
              <div className="modal-body">
                {/* Display the form to edit the employee details */}
                
                <p>Name: {selectedEmployee['SrNo']}</p>
                <p>Designation: </p>
                {/* Add more input fields for other details to be edited */}
              </div>
              <div className="modal-footer">
              
              </div>
            </div>
          </div>
        </div> 
        



      </div>
  )
}

export default ViewEmployee
