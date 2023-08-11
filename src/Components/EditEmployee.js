import React, {useState,useEffect} from 'react';
import Sidebar from './Sidebar';
import DatePicker from "react-datepicker";  
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
const EditEmployee = () => {

    const [showModalFailure, setShowModalFailure] = useState(false);
    const failureModalClose = () => setShowModalFailure(false);
  
    const [showMessage, setShowMessage] = useState('');
  
  
    const [showModalSuceess, setshowModalSuceess] = useState(false);
    const successModalClose = () => setshowModalSuceess(false);



   //get ID from URL
    const { id } = useParams();
    useEffect(() => {
        // Fetch employee data based on the ID
        axios.get(`http://10.10.20.13:5000/employees/${id}`)
          .then(response => {
            const employeeData = response.data;
            setSelectedState(employeeData.State); 
            
            // Fetch cities data for the selected state from the API
            fetch(`http://10.10.20.13:5000/cities/${employeeData.State}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then((data) => {
                // Check if the data is an array before setting the cities state
                if (Array.isArray(data)) {
                  setCities(data);
                  // Set the selected city based on the employee data
                  setSelectedCity(employeeData.City);
                } else {
                  // If the data is not an array, handle the error or invalid response
                  console.log('Invalid data format: Expected an array');
                  setCities([]);
                }
              })
              .catch((error) => {
                console.log('Error fetching cities:', error);
                setCities([]);
              });

            
            
            setFormData({
                OfficeNumber:response.data.OfficeNumber,
                UserType:response.data.UserType,
                EmployeeId:response.data.EmployeeId,
                Name:response.data.Name,
                LastName:response.data.LastName,
                DateOfBirth:response.data.DateOfBirth,
                Email:response.data.Email,
                Mobile:response.data.Mobile,
                DrivingLicence:response.data.DrivingLicence,
                Education:response.data.Education,
                MaritalStatus:response.data.MaritalStatus,
                PreviousCompany:response.data.PreviousCompany,
                Experience:response.data.Experience,
                Designation:response.data.Designation,
                DateOfJoining:response.data.DateOfJoining,
                WorkShift:response.data.WorkShift,
                BloodGroup:response.data.BloodGroup,
                Address:response.data.Address,
                State: response.data.State,
                City: response.data.City,
                Country:response.data.Country,
                Pincode:response.data.Pincode,
                Address1:response.data.Address1,
                State1: response.data.State1,
                City1: response.data.City1,
                Country1:response.data.Country1,
                Pincode1:response.data.Pincode1,
            });
          })
          .catch(error => {
            console.error(error);
          });
      }, [id]);
      
  
  const [formData, setFormData] = useState({
    OfficeNumber:'',UserType:'',EmployeeId:'',Name:'', LastName:'',DateOfBirth:'',Email:'',Mobile:'',DrivingLicence:'',Education:'', MaritalStatus:'',
    PreviousCompany:'', Experience:'', Designation:'', DateOfJoining:'', WorkShift:'',BloodGroup:'',
    Address: '', State: '',City: '',Country: '',Pincode: '',
    Address1: '', State1: '',City1: '',Country1: '', Pincode1: '',
  });




// Fetch states data from the API
const [states, setStates] = useState([]);
useEffect(() => {
  axios.get('http://10.10.20.13:5000/states')
    .then((response) => {
      setStates(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);


// Fetch Designation data from the API
const [designations, setDesignations] = useState([]);
useEffect(() => {
    axios.get('http://10.10.20.13:5000/designation')
      .then((response) => {
        setDesignations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
// Fetch WorkShift data from the API
const [workshifts, setWorkshifts] = useState([]);
useEffect(() => {
    axios.get('http://10.10.20.13:5000/workshift')
      .then((response) => {
        setWorkshifts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


     // Fetch Cities data from the API
     const [cities, setCities] = useState([]);
     const [selectedState, setSelectedState] = useState('');

        const handleStateChange = (event) => {
            const stateId = event.target.value;
            setSelectedState(stateId);
            
            // Fetch cities data for the selected state from the API
            fetch(`http://10.10.20.13:5000/cities/${stateId}`)
            .then((response) => {
                
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            
            })
            .then((data) => {
                console.log(data);
                // Check if the data is an array before setting the cities state
                if (Array.isArray(data)) {
                if (stateId === selectedState) {
                    setSelectedCity(formData.City);
                } else {
                    setSelectedCity('');
                }
                setCities(data); 
                // Update cities state with the fetched data
                } else {
                // If the data is not an array, handle the error or invalid response
                console.log('Invalid data format: Expected an array');
                setCities([])
                // Set cities to an empty array in case of an error or invalid response
                }
            })
            .catch((error) => {
                console.log('Error fetching cities:', error);
                setCities([]);
                
            });

        };

  
  
//handle SelectedCity
const [selectedCity, setSelectedCity] = useState('');
  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
  
  };


  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState({});
  // Handlers to update the form data for each step
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const [startDate, setStartDate] = useState(new Date()); 
  const handleDateChange = (date) => {
    setStartDate(date);
    setFormData((prevFormData) => ({
      ...prevFormData,
      DateOfBirth: date, // Update the DateOfBirth field in the form data
    }));
  };


//   accounts@telogo.in
//   TeloGoMeta@1100
  

  const validateForm = () => {
    // Reset previous errors
    const errors = {};
    // Validate input fields for Step 1
    if (currentStep === 1) {
        if (!formData.OfficeNumber) {
            errors.OfficeNumber = 'Office Location is required.';
          }
          if (!formData.UserType) {
            errors.UserType = 'User Type is required.';
          }
          if (!formData.EmployeeId) {
            errors.EmployeeId = 'Employee Id is required.';
          }
          if(formData.EmployeeId){


          }
         

          if (!formData.Name) {
            errors.Name = 'Name  is required.';
        }
        if (!formData.LastName) {
            errors.LastName = 'LastName Id is required.';
        }
        if (!formData.DateOfBirth) {
            errors.DateOfBirth = 'DateOfBirth Id is required.';
        } 
        if (!formData.Email) {
            errors.Email = 'Email Id is required.';
        }
        if (!formData.Mobile) {
            errors.Mobile = 'mobileNumber is required.';
        }
        if (!formData.DrivingLicence) {
            errors.DrivingLicence = 'DrivingLicence is required.';
        }
        if (!formData.Education) {
            errors.Education = 'Education is required.';
        }
        if (!formData.MaritalStatus) {
            errors.MaritalStatus = 'MaritalStatus is required.';
        }
        if (!formData.PreviousCompany) {
            errors.PreviousCompany = 'PreviousCompany is required.';
        }
    
        if (!formData.Experience) {
            errors.Experience = 'Experience is required.';
        }
        if (!formData.Designation) {
            errors.Designation = 'Designation is required.';
        }
        if (!formData.DateOfJoining) {
            errors.DateOfJoining = 'DateOfJoining is required.';
        }
        if (!formData.WorkShift) {
            errors.WorkShift = 'WorkShift is required.';
        }
        if (!formData.BloodGroup) {
            errors.BloodGroup = 'BloodGroup is required.';
        }
    }

    // Validate input fields for Step 2
    if (currentStep === 2) {
  

      if (!formData.Address) {
        errors.Address = 'Address is required.';
      }
      if (!selectedState) {
        errors.State = 'State is required.';
      }
      if (!selectedCity) {
        errors.City = 'City is required.';
      }
      if (!formData.Country) {
        errors.Country = 'Country is required.';
      }
      if (!formData.Pincode) {
        errors.Pincode = 'Pin Code is required.';
      }
    }

    return errors;
  };

  const handleNext = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setCurrentStep((prevStep) => prevStep + 1);
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setFormErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      console.log(formData);
  
      axios.put(`http://10.10.20.13:5000/employees/${id}`, formData) // Assuming you have an update API endpoint for employees
        .then((response) => {
          // Data updated successfully, handle success (e.g., show a success message)
            console.log(response.data);
            setshowModalSuceess(true);
            setShowMessage(response.data.message)
        })
        .catch((error) => {
          // Error occurred during the request, handle error (e.g., show an error message)
          console.error('Error updating data:', error);
          setShowModalFailure(true);
          setShowMessage(error)
        });
  
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };





  


  // Handler to handle checkbox change
  const [sameAsPermanent, setSameAsPermanent] = useState(false); // State to manage checkbox
  const handleCheckboxChange = (e) => {
    e.preventDefault();
    setSameAsPermanent(e.target.checked);

    console.log(e.target.checked);

    if (e.target.checked) {
      // Set temporary address fields to permanent address fields
      setFormData((prevFormData) => ({
        ...prevFormData,
        Address1: formData.Address,
        states1: formData.states,
        cities1: formData.cities,
        Country1: formData.Country,
        Pincode1: formData.Pincode,
      }));
    } else {
      // Clear temporary address fields if the checkbox is unchecked
      setFormData((prevFormData) => ({
        ...prevFormData,
        Address1: '',
        states1: '',
        cities1: '',
        Country1: '',
        Pincode1: '',
      }));
    }
  };


  return (
    <div>

<div id="wrapper"> 
     <Sidebar/>

          {/* End of sub Sidebar */} 
          {/* Content Wrapper */}
          <div id="content-wrapper" className="d-flex flex-column"> 
            {/* Main Content */}
            <div id="content" className="page-content-wrapper"> 
              {/* Begin Page Content */}
              <div className="container-fluid">
                <div className="page-title justify-content-between">
                  <div className="title-wrap"><h1 className="title is-4">Add Employee</h1></div>
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
                <div className="card">
                    <div className="card-body">
                        <form>
                            {/* Render different sections of the form based on the current step */}
                            {currentStep === 1 && (
                            <div>
                                
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <label>Office Location</label>
                                        
                                        <select
                                                className={`form-control ${formErrors.OfficeNumber ? 'is-invalid' : ''}`}
                                                name="OfficeNumber"
                                                value={formData.OfficeNumber} 
                                                onChange={handleChange} 
                                            >   
                                                <option value="">Select Office </option>
                                                <option value="1">Noida</option>
                                                <option value="2">Mumbai</option>
                                        </select>
                                        {formErrors.OfficeNumber && <div className="invalid-feedback">{formErrors.OfficeNumber}</div>}
                                           
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>User Type</label>
                                        <select
                                                
                                                className={`form-control ${formErrors.UserType ? 'is-invalid' : ''}`}
                                                name="UserType"
                                                value={formData.UserType}
                                                onChange={handleChange} 
                                            >
                                                <option value="">Select User Type </option>
                                                <option value="ADM">Manager</option>
                                                <option value="MAN">Manager</option>
                                                <option value="EXE">Executive</option>
                                                <option value="EMP">Employee</option>
                                        </select>
                                        {formErrors.UserType && <div className="invalid-feedback">{formErrors.UserType}</div>}
                                           
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Employee ID</label>
                                        <input
                                            type="text"
                                            className={`form-control ${formErrors.EmployeeId ? 'is-invalid' :  ''}`}
                                            name="EmployeeId"
                                            value={formData.EmployeeId}
                                            onChange={handleChange}
                                            />
                                             {formErrors.EmployeeId && <div className="invalid-feedback">{formErrors.EmployeeId}</div>}
                                    </div>
                               
                                  


                                    <div className="form-group col-md-4">
                                        <label>First Name</label>
                                            <input
                                            type="text"
                                             className={`form-control ${formErrors.Name ? 'is-invalid' : ''}`}
                                            name="Name"
                                            value={formData.Name}
                                            onChange={handleChange}
                                            />
                                             {formErrors.Name && <div className="invalid-feedback">{formErrors.Name}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Last Name</label>
                                            <input
                                            type="text"
                                             className={`form-control ${formErrors.LastName ? 'is-invalid' : ''}`}
                                            name="LastName"
                                            value={formData.LastName}
                                            onChange={handleChange}
                                            />
                                            {formErrors.LastName && <div className="invalid-feedback">{formErrors.LastName}</div>}
                                    </div>
                                    

                                    <div className="form-group col-md-4">
                                        <label>Date of Birth</label>
                                        <DatePicker
                                            name="DateOfBirth"
                                            className={`form-control ${formErrors.DateOfBirth ? 'is-invalid' : ''}`}
                                            selected={startDate}
                                            onChange={(date) => handleDateChange(date)} // Use the new handler for date changes
                                            value={formData.DateOfBirth}
                                        />
                                        </div>
                                        {formErrors.DateOfBirth && <div className="invalid-feedback">{formErrors.DateOfBirth}</div>}

                               
                                    <div className="form-group col-md-4">
                                        <label>Email ID</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.Email ? 'is-invalid' : ''}`}
                                            name="Email"
                                            value={formData.Email}
                                            onChange={handleChange}
                                            />
                                            {formErrors.Email && <div className="invalid-feedback">{formErrors.Email}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Mobile Number</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.Mobile ? 'is-invalid' : ''}`}
                                            name="Mobile"
                                            value={formData.Mobile}
                                            onChange={handleChange}
                                            />
                                            {formErrors.Mobile && <div className="invalid-feedback">{formErrors.Mobile}</div>}
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Driving Licence</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.DrivingLicence ? 'is-invalid' : ''}`}
                                            name="DrivingLicence"
                                            value={formData.DrivingLicence}
                                            onChange={handleChange}
                                            />
                                            {formErrors.DrivingLicence && <div className="invalid-feedback">{formErrors.DrivingLicence}</div>}
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Education</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.Education ? 'is-invalid' : ''}`}
                                            name="Education"
                                            value={formData.Education}
                                            onChange={handleChange}
                                            
                                            />
                                            {formErrors.Education && <div className="invalid-feedback">{formErrors.Education}</div>}
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Marital Status</label>
                                        <select
                                                 className={`form-control ${formErrors.MaritalStatus ? 'is-invalid' : ''}`}
                                                name="MaritalStatus"
                                                value={formData.MaritalStatus} 
                                                onChange={handleChange} 
                                            > 
                                                <option value="">Select</option>
                                                <option value="Married">Married</option>
                                                <option value="Separated">Separated</option>
                                                <option value="Divorced">Divorced</option>
                                                <option value="Widowed">Widowed</option>
                                                <option value="Single">Single</option>
                                        </select>
                                        {formErrors.MaritalStatus && <div className="invalid-feedback">{formErrors.MaritalStatus}</div>}
                                           
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Previous Company</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.PreviousCompany ? 'is-invalid' : ''}`}
                                            name="PreviousCompany"
                                            value={formData.PreviousCompany}
                                            onChange={handleChange}
                                            />
                                            {formErrors.PreviousCompany && <div className="invalid-feedback">{formErrors.PreviousCompany}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Experience</label>
                                        <select
                                                 className={`form-control ${formErrors.Experience ? 'is-invalid' : ''}`}
                                                name="Experience"
                                                value={formData.Experience} 
                                                onChange={handleChange} 
                                            >
                                                <option value="">Select Year</option>
                                                <option value={0}>0</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                                <option value={9}>9</option>
                                                <option value={10}>10</option>
                                        </select>
                                        {formErrors.Experience && <div className="invalid-feedback">{formErrors.Experience}</div>}
                                           
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Designation</label>
                                        <select
                                            className={`form-control ${formErrors.Designation ? 'is-invalid' : ''}`}
                                            name="Designation"
                                            value={formData.Designation} 
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Designation</option>
                                            {designations.map((designation) => (
                                            <option key={designation.DesignationId} value={designation.DesignationCode}>
                                                {designation.DesignationCode}
                                            </option>
                                            ))}
                                        </select>
                                        {formErrors.Designation && <div className="invalid-feedback">{formErrors.Designation}</div>}
                                        </div>


                                    <div className="form-group col-md-4">
                                        <label>Date of Joining</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.DateOfJoining ? 'is-invalid' : ''}`}
                                            name="DateOfJoining"
                                            value={formData.DateOfJoining}
                                            onChange={handleChange}
                                            />
                                             {formErrors.DateOfJoining && <div className="invalid-feedback">{formErrors.DateOfJoining}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Work Shift</label>
                                        <select
                                                 className={`form-control ${formErrors.WorkShift ? 'is-invalid' : ''}`}
                                                name="WorkShift"
                                                value={formData.WorkShift} 
                                                onChange={handleChange} 
                                            >
                                                
                                                    <option value="">Select Shift</option>
                                                        {workshifts.map((workshift) => (
                                                        <option key={workshift.SrNo} value={workshift.WorkShiftFrom + ' - ' + workshift.WorkShiftTo}>
                                                            {workshift.WorkShiftFrom + ' - ' + workshift.WorkShiftTo}
                                                        </option>
                                                        ))}

                                        </select>
                                        {formErrors.WorkShift && <div className="invalid-feedback">{formErrors.WorkShift}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Blood Group</label>
                                        <select
                                                 className={`form-control ${formErrors.BloodGroup ? 'is-invalid' : ''}`}
                                                name="BloodGroup"
                                                value={formData.BloodGroup} 
                                                onChange={handleChange} 
                                            >
                                                <option value>Select Blood Group</option>
                                                <option value="A+">A+</option>
                                                <option value="B+">B+</option>
                                                <option value="O+">O+</option>
                                                <option value="AB+">AB+</option>
                                                <option value="A-">A-</option>
                                                <option value="B-">B-</option>
                                                <option value="O-">O-</option>
                                                <option value="AB-">AB-</option>
                                        </select>
                                        {formErrors.BloodGroup && <div className="invalid-feedback">{formErrors.BloodGroup}</div>}
                                    </div>
                                   
                                
                                   
                                    
                                
                                </div>
                            </div>

                            )}
                            {currentStep === 2 && (
                            <div>
                                 <div className="row">
                                    <div className="col-md-6">
                                        <div className="card-header">
                                        <h5>Permanent Address</h5>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label>Address</label>
                                            
                                            <input
                                                type="text"
                                                className={`form-control ${formErrors.Address ? 'is-invalid' : ''}`}
                                                name="Address"
                                                value={formData.Address}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {formErrors.Address && <div className="invalid-feedback">{formErrors.Address}</div>}


                                        <div className="form-group">
                                            <label>State</label>
                                            
                                            <select name="State"  className={`form-control ${formErrors.State ? 'is-invalid' : ''}`} id="State" onChange={handleStateChange} value={selectedState}>
                                                <option value="">Select a State</option>
                                                {states.map((state) => (
                                                <option key={state.SrNo} value={state.SrNo}>
                                                    {state.StateName}
                                                </option>
                                                ))}
                                            </select>
                                            {formErrors.State && <div className="invalid-feedback">{formErrors.State}</div>}


                                        </div>

                                        <div className="form-group">
                                            <label>City</label>
                                        

                                            <select name="City"  className={`form-control ${formErrors.City ? 'is-invalid' : ''}`} id="City" onChange={handleCityChange} value={selectedCity}>
                                            <option value="">Select a City</option>
                                            {cities.map((city) => (
                                                <option key={city.SrNo} value={city.SrNo}>
                                                {city.CityName}
                                                </option>
                                            ))}
                                            </select>
                                            {formErrors.City && <div className="invalid-feedback">{formErrors.City}</div>}

                                        </div>

                                        <div className="form-group">
                                            <label>Country</label>
                                            <input
                                                type="text"
                                                 className={`form-control ${formErrors.Country ? 'is-invalid' : ''}`}
                                                name="Country"
                                                value={formData.Country}
                                                onChange={handleChange}
                                            />
                                            {formErrors.Country && <div className="invalid-feedback">{formErrors.Country}</div>}
                                        </div>
                                        
                                        <div className="form-group">
                                            <label>Pin Code</label>
                                            <input
                                                type="text"
                                                 className={`form-control ${formErrors.Pincode ? 'is-invalid' : ''}`}
                                                name="Pincode"
                                                value={formData.Pincode}
                                                onChange={handleChange}
                                            />
                                            {formErrors.Pincode && <div className="invalid-feedback">{formErrors.Pincode}</div>}
                                        </div>
                                        
                                    </div>

                                    <div className="col-md-6">
                                       
                                       <div className="card-header d-flex justify-content-between">
                                       <h5>Temporary Address</h5>
                                       <div className="custom-control custom-checkbox">
                                       <input
                                            id="chkPrompt"
                                            name="chkPrompt"
                                            type="checkbox"
                                            className="custom-control-input"
                                            checked={sameAsPermanent}
                                            onChange={handleCheckboxChange}
                                          />
                                           <label className="custom-control-label" htmlFor="chkPrompt">Same as permanent</label>
                                       </div>
                                       </div>
                                       
                                       <div className="form-group">
                                            <label>Address</label>
                                            <input
                                              type="text"
                                              className={`form-control ${formErrors.Address1 ? 'is-invalid' : ''}`}
                                              name="Address1"
                                              value={formData.Address1}
                                              onChange={handleChange}
                                              disabled={sameAsPermanent} 
                                            />
                                            {formErrors.Address1 && <div className="invalid-feedback">{formErrors.Address1}</div>}
                                          </div>

                                       <div className="form-group">
                                           <label>State</label>
                                           
                                           <select name="states1"  className={`form-control ${formErrors.states1 ? 'is-invalid' : ''}`} id="states1" onChange={handleStateChange} value={selectedState} disabled={sameAsPermanent}> 
                                               <option value="">Select a State</option>
                                               {states.map((state) => (
                                               <option key={state.SrNo} value={state.SrNo}>
                                                   {state.StateName}
                                               </option>
                                               ))} 
                                           </select>
                                           {formErrors.states1 && <div className="invalid-feedback">{formErrors.states1}</div>}


                                       </div>

                                       <div className="form-group">
                                           <label>City</label>
                                       

                                           <select name="cities1"  className={`form-control ${formErrors.cities1 ? 'is-invalid' : ''}`} id="cities1" onChange={handleCityChange} value={selectedCity} disabled={sameAsPermanent}  >
                                           <option value="">Select a City</option>
                                           {cities.map((city) => (
                                               <option key={city.SrNo} value={city.SrNo}>
                                               {city.CityName}
                                               </option>
                                           ))}
                                           </select>
                                           {formErrors.cities1 && <div className="invalid-feedback">{formErrors.cities1}</div>}

                                       </div>
                                       
                                       <div className="form-group">
                                           <label>Country</label>
                                           <input
                                               type="text"
                                                className={`form-control ${formErrors.Country1 ? 'is-invalid' : ''}`}
                                               name="Country1"
                          

                                               value={formData.Country1}
                                               onChange={handleChange}
                                               disabled={sameAsPermanent} 
                                           />
                                           {formErrors.Country1 && <div className="invalid-feedback">{formErrors.Country1}</div>}
                                       </div>
                                       <div className="form-group">
                                           <label>Pin Code</label>
                                           <input
                                               type="text"
                                                className={`form-control ${formErrors.Pincode1 ? 'is-invalid' : ''}`}
                                               name="Pincode1"
                                               value={formData.Pincode1}
                                               onChange={handleChange}
                                               disabled={sameAsPermanent} // Disable if sameAsPermanent is true
                                           />
                                           {formErrors.Pincode1 && <div className="invalid-feedback">{formErrors.Pincode1}</div>}
                                       </div>
                                       
                                   </div>
                                  
                                    
                                    </div>
                            </div>
                            )}

                            {/* Step navigation buttons */}
                            {currentStep > 1 && (
                            <button type="button" className='btn btn-outline-primary' onClick={handlePrev}>
                                Previous
                            </button>
                            )}
                            {currentStep < 2 && (
                            <button type="button" className='btn btn-outline-primary' onClick={handleNext}>
                                Next
                            </button>
                            )}
                            {currentStep === 2 && (
                            <button type="button" className='btn btn-primary' onClick={handleSubmit}>
                                Add Employee
                            </button>
                            )}
                            
                        </form>
                    </div>
                </div>
            </div>
          </div>
          </div>
          </div>


                    {/* Sucess Modal  */}
                    <Modal show={showModalSuceess} onHide={successModalClose} className="modal fade">

                    <Modal.Header class="modal-header">

                    <Modal.Title >
                        Confirms
                    </Modal.Title>
                    <button class="close" type="button" onClick={successModalClose}>
                        <span aria-hidden="true">×</span>
                    </button>
                    </Modal.Header>
                    <Modal.Body>
                   <div class="modal-body animate-check text-center">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                        <circle class="path circle" fill="none" stroke="#05d69e" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                        <polyline class="path check" fill="none" stroke="#05d69e" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                        </svg>
                        <div class="mt-3 text-success">{showMessage}</div>
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
                    <Modal.Header class="modal-header">
                    <Modal.Title >
                        Confirms
                    </Modal.Title>
                    <button class="close" type="button" onClick={failureModalClose}>
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


                   




    </div>
  );
};

export default EditEmployee;


