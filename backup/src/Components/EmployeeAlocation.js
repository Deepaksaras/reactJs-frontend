import React,{ useState} from 'react';

import Sidebar from './Sidebar';
const EmployeeAlocation = () => {

  const [managerId, setManagerId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [errors, setErrors] = useState({});

  const handleAllocateEmp = (e) => {
    e.preventDefault();

    // Form validation
    const newErrors = {};
    if (!managerId) {
      newErrors.managerid = 'Please select a manager';
    }
    if (!employeeId) {
      newErrors.employeeid = 'Please select an employee';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }

    
    console.log(managerId);
    console.log(employeeId);
    
     
  };
  return (
    <div>
        
   
      <Sidebar/>
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
                    <form className="form-inline">
                      <div className="form-group">
                        <input className="form-control" placeholder="Search.." id />
                      </div>
                      <div className="form-group">
                        <select className="form-control">
                          <option>Manager</option>
                          <option value={10}>yasmin</option>
                          <option value={25}>rahul</option>
                          <option value={50}>raj</option>
                          <option value={100}>jack</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-icon"><i className="lnil lnil-search-alt" /></button>
                      </div>
                      <div className="form-group">
                        <select className="form-control record">
                          <option>Entries</option>
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>
                    </form>
                    <button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#allocateEmp"><i className="lnil lnil-plus icon" />Allocate Employee</button>	
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <tbody><tr>
                            <th>Allocated By</th>
                            <th>Employee Name</th>
                            <th>Date &amp; Time</th>
                            <th>Allocated Emp Name</th>
                            <th>Status</th>
                            <th>Tools</th>
                          </tr>
                          <tr>
                            <td>opt1</td>
                            <td>Rakesh</td>
                            <td>2016-06-25 17:49</td>
                            <td>Mohit</td>
                            <td><span className="tag is-success">Active</span></td>
                            <td>
                              <div className="buttons">
                                <button type="button" className="button tooltip-top" data-tooltip="Delete" data-toggle="modal" data-target="#Modal"><i className="lnil lnil-trash" /></button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>opt1</td>
                            <td>Rakesh</td>
                            <td>2016-06-25 17:49</td>
                            <td>Mohit</td>
                            <td><span className="tag is-success">Active</span></td>
                            <td>
                              <div className="buttons">
                                <button type="button" className="button tooltip-top" data-tooltip="Delete" data-toggle="modal" data-target="#Modal"><i className="lnil lnil-trash" /></button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>opt1</td>
                            <td>Rakesh</td>
                            <td>2016-06-25 17:49</td>
                            <td>Mohit</td>
                            <td><span className="tag is-success">Active</span></td>
                            <td>
                              <div className="buttons">
                                <button type="button" className="button tooltip-top" data-tooltip="Delete" data-toggle="modal" data-target="#Modal"><i className="lnil lnil-trash" /></button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>opt1</td>
                            <td>Rakesh</td>
                            <td>2016-06-25 17:49</td>
                            <td>Mohit</td>
                            <td><span className="tag is-success">Active</span></td>
                            <td>
                              <div className="buttons">
                                <button type="button" className="button tooltip-top" data-tooltip="Delete" data-toggle="modal" data-target="#Modal"><i className="lnil lnil-trash" /></button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>opt1</td>
                            <td>Rakesh</td>
                            <td>2016-06-25 17:49</td>
                            <td>Mohit</td>
                            <td><span className="tag is-success">Active</span></td>
                            <td>
                              <div className="buttons">
                                <button type="button" className="button tooltip-top" data-tooltip="Delete" data-toggle="modal" data-target="#Modal"><i className="lnil lnil-trash" /></button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>opt1</td>
                            <td>Rakesh</td>
                            <td>2016-06-25 17:49</td>
                            <td>Mohit</td>
                            <td><span className="tag is-success">Active</span></td>
                            <td>
                              <div className="buttons">
                                <button type="button" className="button tooltip-top" data-tooltip="Delete" data-toggle="modal" data-target="#Modal"><i className="lnil lnil-trash" /></button>
                              </div>
                            </td>
                          </tr>
                        </tbody></table>
                    </div>
                  </div>
                </div>
                
              </div>
              {/* /.container-fluid */} 
            </div>
            {/* End of Main Content */} 
          </div>
          {/* End of Content Wrapper */} 
        </div>
       



        <div className="modal fade" id="allocateEmp" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" data-keyboard="false" data-backdrop="static" aria-hidden="true" style={{ display: 'none' }}>
      <div className="modal-dialog modal-sm" role="document">
        <form onSubmit={handleAllocateEmp}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Allocate Employee</h5>
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Manager ID</label>
                <select
                  className={`form-control ${errors.managerid ? 'is-invalid' : ''}`}
                  onChange={(e) => setManagerId(e.target.value)}
                  value={managerId}
                >
                  <option value="">Manager</option>
                  <option value={10}>yasmin</option>
                  <option value={25}>rahul</option>
                  <option value={50}>raj</option>
                  <option value={100}>jack</option>
                </select>
                {errors.managerid && <div className="invalid-feedback">{errors.managerid}</div>}
              </div>
              <div className="form-group">
                <label>Manager ID</label>
                <input className="form-control" defaultValue={36} disabled />
              </div>
              <div className="form-group">
                <label>Manager Name</label>
                <input className="form-control" defaultValue="otp1" disabled />
              </div>
              <div className="form-group">
                <label>Select Employee</label>
                <select
                  className={`form-control ${errors.employeeid ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  value={employeeId}
                >
                  <option value="">Siraj</option>
                  <option value={10}>Zaheer</option>
                  <option value={25}>Rakesh</option>
                  <option value={50}>Zahoor</option>
                  <option value={100}>Mohit</option>
                </select>
                {errors.employeeid && <div className="invalid-feedback">{errors.employeeid}</div>}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline-dark" type="button" data-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Allocate Employee
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
       
       



      </div>
  )
}

export default EmployeeAlocation
