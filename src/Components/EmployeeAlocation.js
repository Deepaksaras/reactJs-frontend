import React, { useState, useEffect } from 'react';

import Sidebar from './Sidebar';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Pagination from './Pagination';
const EmployeeAlocation = () => {


  const [showModalFailure, setShowModalFailure] = useState(false);
  const failureModalClose = () => setShowModalFailure(false);

  const [showMessage, setShowMessage] = useState('');


  const [showModalSuceess, setshowModalSuceess] = useState(false);
  const successModalClose = () => setshowModalSuceess(false);


  const [showAllocateEmployeeModal, setshowAllocateEmployeeModal] = useState(false);
  const allocateEmployeeModalClose = () => setshowAllocateEmployeeModal(false);




  // Fetch employeeallocation data from the API
  const [employeeAllocatons, setEmployeeAllocatons] = useState([]);

  useEffect(() => {
    fetchEmployeesAllocation();
  }, []);

  const fetchEmployeesAllocation = async () => {
    try {
      const response = await axios.get('http://10.10.20.13:5000/employeeallocation/');
      setEmployeeAllocatons(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };






  // Fetch employeeallocation data from the API
  const [managerLists, setManagerList] = useState([]);
  useEffect(() => {
    axios.get('http://10.10.20.13:5000/managerlist')
      .then((response) => {
        setManagerList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  // Fetch employeeallocation data from the API
  const [emplyeeslists, setEmployeelist] = useState([]);
  useEffect(() => {
    axios.get('http://10.10.20.13:5000/emplyeeslist')
      .then((response) => {
        setEmployeelist(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const [formData, setFormData] = useState({
    AllocatedEmployeeId: '', EmployeeId: '',
    AllocationDateTime: currentDateTime,
    AllocatedBy: '414153',
  });



  const handleAllocateEmp = async (e) => {
    e.preventDefault();

    const errors = validateForm(); // Make sure validateForm() returns validation errors
    if (Object.keys(errors).length === 0) {
        try {
            const response = await axios.post('http://10.10.20.13:5000/allocateemployee', formData);

            console.log('API response:', response.data);
            setshowAllocateEmployeeModal(false);
            setshowModalSuceess(true);
            setShowMessage(response.data.message);
        } catch (error) {
            console.error('API error:', error);
            setshowAllocateEmployeeModal(false);
            setShowModalFailure(true);
            setShowMessage(error.message || 'An error occurred.');
        }
        setFormErrors({});
      } else {
        setFormErrors(errors);
      }

    fetchEmployeesAllocation(); // Make sure this function is appropriately defined
};



  const AddEmployeeAllocation = () => {
    setshowAllocateEmployeeModal(true);
  }

  // Pagination Concept Starts
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(employeeAllocatons.length / itemsPerPage);

  // Logic to calculate the current slice of data to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employeeAllocatons.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination Concept Ends



  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const modalClose = () => setShowConfirmModal(false);
  const [emplyeeID, setEmployeeIdDel] = useState('');

  const handleDelete = async (e) => {
    setShowConfirmModal(true);
    setEmployeeIdDel(e);

  }


  //edit modal 
  const [showEditModal, setShowEditModal] = useState(false);
  const editModalClose = () => setShowEditModal(false);

  const handleEdit = async (e) => {
    setShowEditModal(true);

  }

  const validateForm = () => {
    // Reset previous errors
    const errors = {};
    // Validate input fields for Step 1

    if (!formData.AllocatedEmployeeId) {
      errors.AllocatedEmployeeId = ' is required.';
    }

    if (!formData.EmployeeId) {
      errors.EmployeeId = ' is required.';
    }

    return errors;

  }

  const [formErrors, setFormErrors] = useState({});
  // Handlers to update the form data for each step
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

 






  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`http://10.10.20.13:5000/employeeallocation/${id}`);
      if (response) {
        setShowConfirmModal(false);
        setshowModalSuceess(true);
        setShowMessage(response.data.message)
      } else {
        setShowConfirmModal(false);
        setShowModalFailure(true);
        setShowMessage(response.data.message)
      }
      fetchEmployeesAllocation();
    } catch (error) {
      console.error('Error deleting Data:', error);
      setShowConfirmModal(false);
      setShowModalFailure(true);
      setShowMessage(error)
    }
  };





  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    console.log(query);
    // If the search query is empty, show complete data
    if (!query.trim()) {
      setEmployeeAllocatons(currentItems);
      return;
    }

    // Create copy of item list
    var updatedList = [...currentItems];

    // Include all elements which include the search query in any property
    updatedList = updatedList.filter((item) => {
      // Convert each property value to lowercase and check if it includes the query
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      );
    });

    // Set the filtered list to state
    setEmployeeAllocatons(updatedList);
  };




  return (
    <div>


      <Sidebar />
      <div id="wrapper">
        {/* Sidebar */}

        {/* End of Sidebar */}
        <div className="sub-sidebar">
          <div className="account-tab">
            <div className="title">Manage Employee</div>

            <span>Add Employee</span>
            <span className="end"><i aria-hidden="true" className="lnil lnil-arrow-right" /></span>


          </div>
        </div>
        {/* End of sub Sidebar */}
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content" className="page-content-wrapper">
            {/* Begin Page Content */}
            <div className="container-fluid">
              <div className="page-title justify-content-between">
                <div className="title-wrap"><h1 className="title is-4">Employee Allocation</h1></div>
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
                  <form className="form-inline" >
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Search.."
                        onChange={filterBySearch}
                      />
                    </div>
                    <div className="form-group">

                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary btn-icon">
                        <i className="lnil lnil-search-alt" />
                      </button>
                    </div>
                  </form>
                  <button
                    type="button"
                    className="btn btn-outline-dark"

                    onClick={AddEmployeeAllocation}

                  >
                    <i className="lnil lnil-plus icon" />Allocate Employee
                  </button>


                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <tbody><tr>
                        <th>Sr no</th>
                        <th>Allocated By</th>
                        <th>Employee Name</th>
                        <th>Date &amp; Time</th>
                        <th>Allocated Emp Name</th>
                        <th>Status</th>
                        <th>Tools</th>

                      </tr>


                        {currentItems.map((employeeAllocaton, i) => (


                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{employeeAllocaton.AllocatedEmployeeId}</td>
                            <td>{employeeAllocaton.EmployeeId}</td>
                            <td>{employeeAllocaton.AllocationDateTime}</td>
                            <td>{employeeAllocaton.AllocatedBy}</td>
                            <td>
                              {employeeAllocaton.AllocationStatus === 1 ? (
                                <span className="tag is-success">Active</span>
                              ) : (
                                <span className="tag is-danger">Inactive</span>
                              )}
                            </td>
                            <td>
                              <div className="buttons">

                                <button

                                  type="button"
                                  className="button tooltip-top"
                                  data-tooltip="Delete"
                                  onClick={() => handleEdit(employeeAllocaton)}
                                >

                                  <i className="lnil lnil-pencil" />

                                </button>

                                <button
                                  type="button"
                                  className="button tooltip-top"
                                  data-tooltip="Delete"
                                  onClick={() => handleDelete(employeeAllocaton.SrNo)}
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
                <div className="table-page">Showing page {currentPage} of {totalPages}&nbsp;(Total {employeeAllocatons.length} Records)</div>
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







      {/* Edit Employee Modal */}
      <Modal show={showEditModal} onHide={editModalClose} className="modal fade">
        <Modal.Header className="modal-header">
          <Modal.Title >
            Edit Modal Data
          </Modal.Title>
          <button className="close" type="button" onClick={editModalClose}>
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>

        <Modal.Body>
          <div className="modal-body">
            <div className="form-group">
              {/* <input type="hidden" name="srNo" value={srNo} /> */}
              <label>Manager ID</label>
              <select
                className={`form-control ${formErrors.AllocatedEmployeeId ? 'is-invalid' : ''}`}
                name="AllocatedEmployeeId"
                value={formData.AllocatedEmployeeId}
                onChange={handleChange}
              >
                <option value="">Select Manager</option>
                {managerLists.map((managerList, i) => (
                  <option key={i} value={managerList.EmployeeId}>
                    {managerList.Name}
                  </option>
                ))}
              </select>
              {formErrors.AllocatedEmployeeId && <div className="invalid-feedback">{formErrors.AllocatedEmployeeId}</div>}

            </div>



            <div className="form-group">
              <label>Select Employee</label>


              <select
                className={`form-control ${formErrors.EmployeeId ? 'is-invalid' : ''}`}
                name="EmployeeId"
                value={formData.EmployeeId}
                onChange={handleChange}
              >
                <option value="">Select Employee</option>
                {emplyeeslists.map((emplyeeslist, i) => (
                  <option key={i} value={emplyeeslist.EmployeeId}>
                    {emplyeeslist.Name}
                  </option>
                ))}
              </select>
              {formErrors.EmployeeId && <div className="invalid-feedback">{formErrors.EmployeeId}</div>}



            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-outline-dark" type="button" data-dismiss="modal" onClick={editModalClose}>
            Cancel
          </Button>
          <Button className="btn btn-primary" type="submit" >
            Update Employee
          </Button>

        </Modal.Footer>

      </Modal>
      {/* Edit Employee Modal Ends */}








      {/* Add Employee Modal  */}
      <Modal show={showAllocateEmployeeModal} onHide={allocateEmployeeModalClose} className="modal fade">

        <Modal.Header className="modal-header">

          <Modal.Title >
            Confirms
          </Modal.Title>
          <button className="close" type="button" onClick={allocateEmployeeModalClose}>
            <span aria-hidden="true">×</span>
          </button>
        </Modal.Header>

        <Modal.Body>

          <div className="modal-body">
            <div className="form-group">
              {/* <input type="hidden" name="srNo" value={srNo} /> */}
              <label>Manager ID</label>
              <select
                className={`form-control ${formErrors.AllocatedEmployeeId ? 'is-invalid' : ''}`}
                name="AllocatedEmployeeId"
                value={formData.AllocatedEmployeeId}
                onChange={handleChange}
              >
                <option value="">Select Manager</option>
                {managerLists.map((managerList, i) => (
                  <option key={i} value={managerList.EmployeeId}>
                    {managerList.Name}
                  </option>
                ))}
              </select>
              {formErrors.AllocatedEmployeeId && <div className="invalid-feedback">{formErrors.AllocatedEmployeeId}</div>}

            </div>



            <div className="form-group">
              <label>Select Employee</label>


              <select
                className={`form-control ${formErrors.EmployeeId ? 'is-invalid' : ''}`}
                name="EmployeeId"
                value={formData.EmployeeId}
                onChange={handleChange}
              >
                <option value="">Select Employee</option>
                {emplyeeslists.map((emplyeeslist, i) => (
                  <option key={i} value={emplyeeslist.EmployeeId}>
                    {emplyeeslist.Name}
                  </option>
                ))}
              </select>
              {formErrors.EmployeeId && <div className="invalid-feedback">{formErrors.EmployeeId}</div>}



            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-outline-dark" type="button" data-dismiss="modal" onClick={allocateEmployeeModalClose}>
            Cancel
          </Button>
          <Button className="btn btn-primary" type="submit"   onClick={handleAllocateEmp}>
            Allocate Employee
          </Button>

        </Modal.Footer>

      </Modal>
      {/* Add Employee Modal Ends */}



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
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
              <circle className="path circle" fill="none" stroke="#05d69e" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
              <polyline className="path check" fill="none" stroke="#05d69e" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
            </svg>
            <div className="mt-3 text-success">{showMessage}</div>
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

export default EmployeeAlocation
