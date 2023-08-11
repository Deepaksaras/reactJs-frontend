import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Pagination from './Pagination';
const ViewEmployee = () => {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://10.10.20.13:5000/employees/');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  //Pagination concept
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  // Logic to calculate the current slice of data to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);
 //Pagination concept Ends

  // Delete HAndle 
  const [showModalFailure, setShowModalFailure] = useState(false);
  const failureModalClose = () => setShowModalFailure(false);

  const [showMessage, setShowMessage] = useState('');

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const modalClose = () => setShowConfirmModal(false);

  const [showModalSuceess, setshowModalSuceess] = useState(false);
  const successModalClose = () => setshowModalSuceess(false);

  const [emplyeeID, setEmployeeId] = useState('');

  const handleDelete = async (e) => {
    setShowConfirmModal(true);
    setEmployeeId(e);

  }


  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`http://10.10.20.13:5000/employees/${id}`);
      if (response) {
        setShowConfirmModal(false);
        setshowModalSuceess(true);
        setShowMessage(response.data.message)
      } else {
        setShowConfirmModal(false);
        setShowModalFailure(true);
        setShowMessage(response.data.message)
      }
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
      setShowConfirmModal(false);
      setShowModalFailure(true);
      setShowMessage(error)
    }
  };


 


  let serialNumber = 1;
  return (
    <div>


      <Sidebar />
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
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Designation</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Join</th>
                        <th>Shift</th>
                        <th>Tools</th>
                      </tr>


                        {currentItems.map((employee, i) => (
                          <tr key={employee.i}>
                            <td>{serialNumber++}</td>
                            <td>{employee.EmployeeId}</td>
                            <td>{employee.Name}</td>
                            <td>{employee.Designation}</td>
                            <td>{employee.Mobile}</td>
                            <td>{employee.Email}</td>
                            <td>{employee.DateOfJoining}</td>
                            <td>{employee.WorkShift}</td>
                            <td>
                              <div className="buttons">
                                 <Link to={`/editEmployee/${employee.EmployeeId}`}> <button type="button" className="button tooltip-top"><i className="lnil lnil-pencil" /></button></Link>
                                 <button
                                  type="button"
                                  className="button tooltip-top"
                                  data-tooltip="Delete"
                                  onClick={() => handleDelete(employee.EmployeeId)}

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
                      <div className="table-page">Showing page {currentPage} of {totalPages}&nbsp;(Total {employees.length} Records)</div>
                         <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            />
                    </div>
                 
                </div>
              {/* /.container-fluid */} 
            </div>
            {/* End of Main Content */} 
          </div>
          {/* End of Content Wrapper */} 
        </div>



      {/* Sucess Modal  */}
      <Modal show={showModalSuceess} onHide={successModalClose} className="modal fade">

        <Modal.Header className="modal-header">

          <Modal.Title >
            Confirms
          </Modal.Title>
          <button className="close" type="button" onClick={successModalClose}>
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body animate-check text-center">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" width={40}>
              <circle className="path circle" fill="none" stroke="#f82a5e" strokeWidth={6} strokeMiterlimit={10} cx="65.1" cy="65.1" r="62.1" />
              <line className="path line" fill="none" stroke="#f82a5e" strokeWidth={6} strokeLinecap="round" strokeMiterlimit={10} x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
              <line className="path line" fill="none" stroke="#f82a5e" strokeWidth={6} strokeLinecap="round" strokeMiterlimit={10} x1="95.8" y1={38} x2="34.4" y2="92.2" />
            </svg>
            <div className="mt-3 text-danger">{showMessage}</div>
            {/* <input type="hidden" value={setvalues} /> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary" type="button" onClick={successModalClose}>
            Ok
          </Button>

        </Modal.Footer>
      </Modal>
      {/* Sucess MOdal Ends */}


      {/* Failure Modal  */}
      <Modal show={showModalFailure} onHide={failureModalClose} className="modal fade">
        <Modal.Header className="modal-header">
          <Modal.Title >
            Confirms
          </Modal.Title>
          <button className="close" type="button" onClick={failureModalClose}>
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body animate-check text-center">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" width={40}>
              <circle className="path circle" fill="none" stroke="#f82a5e" strokeWidth={6} strokeMiterlimit={10} cx="65.1" cy="65.1" r="62.1" />
              <line className="path line" fill="none" stroke="#f82a5e" strokeWidth={6} strokeLinecap="round" strokeMiterlimit={10} x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
              <line className="path line" fill="none" stroke="#f82a5e" strokeWidth={6} strokeLinecap="round" strokeMiterlimit={10} x1="95.8" y1={38} x2="34.4" y2="92.2" />
            </svg>
            <div className="mt-3 text-danger">{showMessage}</div>
            {/* <input type="hidden" value={setvalues} /> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary" type="button" onClick={failureModalClose}>
            Ok
          </Button>

        </Modal.Footer>
      </Modal>
      {/* Failure MOdal Ends */}




      <Modal show={showConfirmModal} onHide={modalClose} className="modal fade">
        <Modal.Header className="modal-header">
          <Modal.Title >
            Confirm
          </Modal.Title>
          <button className="close" type="button" onClick={modalClose}>
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body animate-check text-center">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" width={40}>
              <circle className="path circle" fill="none" stroke="#f82a5e" strokeWidth={6} strokeMiterlimit={10} cx="65.1" cy="65.1" r="62.1" />
              <line className="path line" fill="none" stroke="#f82a5e" strokeWidth={6} strokeLinecap="round" strokeMiterlimit={10} x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
              <line className="path line" fill="none" stroke="#f82a5e" strokeWidth={6} strokeLinecap="round" strokeMiterlimit={10} x1="95.8" y1={38} x2="34.4" y2="92.2" />
            </svg>
            <div className="mt-3 text-danger">Are you sure to delete this Record permanently.</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-outline-dark" type="button" data-dismiss="modal" onClick={modalClose}>
            No
          </Button>
          <Button className="btn btn-primary" type="button" onClick={() => deleteEmployee(emplyeeID)}>
            yes
          </Button>
        </Modal.Footer>
      </Modal>





    </div>
  )
}

export default ViewEmployee
