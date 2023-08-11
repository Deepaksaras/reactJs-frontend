import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';

const DateRange = () => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
  };
  return (
    <div>
        
        <div id="wrapper"> 
          {/* Sidebar */}
         
          {/* End of Sidebar */} 
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column"> 
            {/* Main Content */}
            <div id="content" className="page-content-wrapper fullwidth"> 
              {/* Begin Page Content */}
              <div className="container-fluid">
                <div className="page-title justify-content-between">
                  <div className="title-wrap"><h1 className="title is-4">Admin Dashboard</h1></div>
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
                <div className="card-primary light Attendance mb-3 bg-transparent border-0 mt-3">
                  <a href="#" className="db-card">
                    <div className="light-icons primary-light rounded-circle m-auto">
                      <i className="lnil lnil-barrier" />
                    </div>
                    <span><strong>Enter / Exit</strong></span>
                  </a>
                  <a href="#" className="db-card">
                    <div className="light-icons purple-light rounded-circle m-auto">
                      <i className="lnil lnil-calender-alt-4" />
                    </div>
                    <span><strong>Working Days</strong></span>
                  </a>
                  <a href="#" className="db-card">
                    <div className="light-icons warning-light rounded-circle m-auto">
                      <i className="lnil lnil-bar-check" />
                    </div>
                    <span><strong>Performance</strong></span>
                  </a>
                  <a href="#" className="db-card">
                    <div className="light-icons success-light rounded-circle m-auto">
                      <i className="lnil lnil-notification" />
                    </div>
                    <span><strong>Notifications</strong></span>
                  </a>
                  <a href="#" className="db-card">
                    <div className="light-icons danger-light rounded-circle m-auto">
                      <i className="lnil lnil-user" />
                    </div>
                    <span><strong>My Profile</strong></span>
                  </a>
                  <a href="#" className="db-card">
                    <div className="light-icons info-light rounded-circle m-auto">
                      <i className="lnil lnil-suitcase-alt" />
                    </div>
                    <span><strong>Apply Leave</strong></span>
                  </a>
                  
                  <div className="control has-icon mt-2">
                          <DateRangePicker
                            ranges={[dateRange]}
                            onChange={handleSelect}
                          />
                          <label className="label form-icon" htmlFor="dates">
                            <i className="lnil lnil-calendar-alt-1"></i>
                          </label>
                        </div>


                </div>
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="card-header"><h5>Pending Leave Status</h5></div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <tbody><tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Leave Type</th>
                            <th>Leave Start</th>
                            <th>Leave End</th>
                            <th>Total Leave</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Tools</th>
                          </tr>
                          <tr>
                            <td>Altaf</td>
                            <td>Altaf</td>
                            <td>Other</td>
                            <td>21-09-2017</td>
                            <td>30-09-2017</td>
                            <td>9</td>
                            <td><small className="tag is-warning">Pending</small></td>
                            <td>leaving</td>
                            <td>
                              <div className="buttons">
                                <button type="button" className="button tooltip-top" data-tooltip="View" data-toggle="modal" data-target="#pendingLeave"><i className="lnil lnil-eye" /></button>
                                <button type="button" className="button tooltip-top" data-tooltip="Approved" data-toggle="modal" data-target="#approveLeave"><i className="lnil lnil-checkmark" /></button>
                                <button type="button" className="button tooltip-top" data-tooltip="Reject" data-toggle="modal" data-target="#rejectLeave"><i className="lnil lnil-close" /></button>
                              </div>
                            </td>
                          </tr>
                        </tbody></table>
                    </div>
                  </div>
                </div>	
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="card-header"><h5>Cancel Leave Status</h5></div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <tbody><tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Leave Type</th>
                            <th>Leave Start</th>
                            <th>Leave End</th>
                            <th>Total Leave</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Tools</th>
                          </tr>
                          <tr>
                            <td>Altaf</td>
                            <td>Altaf</td>
                            <td>Other</td>
                            <td>21-09-2017</td>
                            <td>30-09-2017</td>
                            <td>9</td>
                            <td><small className="tag is-danger">Cancel Request</small></td>
                            <td>leaving</td>
                            <td>
                              <div className="buttons">
                                <button type="button" className="button tooltip-top" data-tooltip="Cancel" data-toggle="modal" data-target="#approveLeave"><i className="lnil lnil-cross-circle" /></button>
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
        {/* End of Page Wrapper */} 
        {/* Pending Leave Status*/}
        <div className="modal fade" id="pendingLeave" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id>Altaf</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <tbody><tr>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Leave Type</th>
                        <th>Leave Start</th>
                        <th>Leave End</th>
                        <th>Total Leave</th>
                        <th>Status</th>
                        <th>Description</th>
                      </tr>
                      <tr>
                        <td>Altaf</td>
                        <td>Altaf</td>
                        <td>Other</td>
                        <td>21-09-2017</td>
                        <td>30-09-2017</td>
                        <td>9</td>
                        <td><small className="tag is-warning">Pending</small></td>
                        <td>leaving</td>
                      </tr>
                    </tbody></table>
                </div>  
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-dark" type="button" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        {/* Approve Leave*/}
        <div className="modal fade" id="approveLeave" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id>Leave Approval</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody><tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                      </tr>
                      <tr>
                        <td>Altaf</td>
                        <td>Altaf</td>
                        <td>westwireless@yahoo.com</td>
                        <td>8800733326</td>
                      </tr>
                    </tbody></table>
                </div>
                <div className="bg-light p-3 mt-3 rounded">
                  <div className="form-group">
                    <label>Leave Duration</label>
                    <input type="text" className="form-control" name="dates" id="dates" />
                  </div>
                  <div className="form-group">
                    <label>Approval Remarks</label>
                    <textarea className="form-control" placeholder="Message can be maximum 459 characters long." defaultValue={""} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-dark" type="button" data-dismiss="modal">Cancel</button>
                <button className="btn btn-primary">Approve</button>
              </div>
            </div>
          </div>
        </div>
        {/* Reject Leave*/}
        <div className="modal fade" id="rejectLeave" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id>Reject Leave Request</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="alert alert-danger mb-2">Rejecting Leave Request will be permanent. Are you sure want to reject ?</div>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody><tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                      </tr>
                      <tr>
                        <td>Altaf</td>
                        <td>Altaf</td>
                        <td>westwireless@yahoo.com</td>
                        <td>8800733326</td>
                      </tr>
                    </tbody></table>
                </div>
                <div className="bg-light p-3 mt-3 rounded">
                  <div className="form-group">
                    <label>Leave Duration</label>
                    <input type="text" className="form-control" name="dates1" id="dates1" />
                  </div>
                  <div className="form-group">
                    <label>Approval Remarks</label>
                    <textarea className="form-control" placeholder="Message can be maximum 459 characters long." defaultValue={""} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-dark" type="button" data-dismiss="modal">Cancel</button>
                <button className="btn btn-danger">Reject</button>
              </div>
            </div>
          </div>
        </div>
        {/* Bootstrap core JavaScript*/} 
        {/* Core plugin JavaScript*/} 
      </div>
  )
}

export default DateRange
