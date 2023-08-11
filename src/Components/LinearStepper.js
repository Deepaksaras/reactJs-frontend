import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
const EmployeForm = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [states1, setStates1] = useState([]);
  const [cities1, setCities1] = useState([]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');


  const [selectedState1, setSelectedState1] = useState('');
  const [selectedCity1, setSelectedCity1] = useState('');

  useEffect(() => {
    // Fetch states data from the API
    fetch('http://localhost:5000/states')
      .then((response) => response.json())
      .then((data) => setStates(data),(data) => setStates1(data))
      .catch((error) => console.log(error));
  }, []);

  const handleStateChange = (event) => {
    const stateId = event.target.value;
    setSelectedState(stateId);
    setSelectedState1(stateId);
  
    // Fetch cities data for the selected state from the API
    fetch(`http://localhost:5000/cities/${stateId}`)
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
          setCities(data); 
          setCities1(data);// Update cities state with the fetched data
        } else {
          // If the data is not an array, handle the error or invalid response
          console.log('Invalid data format: Expected an array');
          setCities([])
          setCities1([]); // Set cities to an empty array in case of an error or invalid response
        }
      })
      .catch((error) => {
        console.log('Error fetching cities:', error);
        setCities([]);
        setCities1([]) 
      });
  };
  

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    setSelectedCity1(cityId);
  };
 
  const [formData, setFormData] = useState({
    officeLocation:'',
    userType:'',
    EmployeeId:'',
    password:'',
    firstName: '',
    lastName: '',
    dob:'',
    emailId:'',
    mobileNumber:'',
    dl:'',
    education:'',
    maritalStatus:'',
    previousCompany:'', experience:'', designation:'', doj:'', workShift:'',bloodGroup:'',
    Address:'', states:'', cities:'', Country:'', pincode:'',
    Address1:'', states1:'', cities1:'', Country1:'', pincode1:'',
    
  });
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

  // Function to move to the next step
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Function to move to the previous step
  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

 
  const validateForm = () => {


 // Reset previous errors

 
 const errors = {};

 // Validate input fields
 
    
    if (!formData.officeLocation) {
      errors.officeLocation = 'Office Location is required.';
    }
    if (!formData.userType) {
        errors.userType = 'User Type is required.';
    }
    if (!formData.EmployeeId) {
        errors.EmployeeId = 'Employee Id is required.';
    }
    if (!formData.password) {
        errors.password = 'password is required.';
    }
    if (!formData.firstName) {
        errors.firstName = 'firstName  is required.';
    }
    if (!formData.lastName) {
        errors.lastName = 'lastName Id is required.';
    }
    if (!formData.dob) {
        errors.dob = 'dob Id is required.';
    }
    if (!formData.emailId) {
        errors.emailId = 'email Id is required.';
    }
    if (!formData.mobileNumber) {
        errors.mobileNumber = 'mobileNumber is required.';
    }
    if (!formData.dl) {
        errors.dl = 'Dl is required.';
    }
    if (!formData.education) {
        errors.education = 'education is required.';
    }
    if (!formData.maritalStatus) {
        errors.maritalStatus = 'maritalStatus is required.';
    }
    if (!formData.previousCompany) {
        errors.previousCompany = 'previousCompany is required.';
    }

    if (!formData.experience) {
        errors.experience = 'experience is required.';
    }
    if (!formData.designation) {
        errors.designation = 'designation is required.';
    }
    if (!formData.doj) {
        errors.doj = 'doj is required.';
    }
    if (!formData.workShift) {
        errors.workShift = 'workShift is required.';
    }
    if (!formData.bloodGroup) {
        errors.bloodGroup = 'bloodGroup is required.';
    }
    // if (!formData.Address) {
    //     errors.Address = 'Address is required.';
    // }
    // if (!formData.states) {
    //     errors.states = 'states is required.';
    // }
    // if (!formData.cities) {
    //     errors.cities = 'cities is required.';
    // }
    // if (!formData.Country) {
    //     errors.Country = 'Country is required.';
    // }
    // if (!formData.pincode) {
    //     errors.pincode = 'pincode is required.';
    // }
    // if (!formData.Address1) {
    //     errors.Address1 = 'Address1 is required.';
    // }
    // if (!formData.states1) {
    //     errors.states1 = 'states1 is required.';
    // }
    // if (!formData.cities1) {
    //     errors.cities1 = 'cities1 is required.';
    // }
    // if (!formData.Country1) {
    //     errors.Country1 = 'Country1 is required.';
    // }
    // if (!formData.pincode1) {
    //     errors.pincode1 = 'pincode1 is required.';
    // }
   


    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log(formData);

      fetch('http://localhost:5000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Data inserted successfully, handle success (e.g., show a success message)
          console.log('Data inserted successfully:', data);
        })
        .catch((error) => {
          // Error occurred during the request, handle error (e.g., show an error message)
          console.error('Error inserting data:', error);
        });

      setFormErrors({});
    } else {
      setFormErrors(errors);
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
                                                className={`form-control ${formErrors.officeLocation ? 'is-invalid' : ''}`}
                                                name="officeLocation"
                                                value={formData.officeLocation} 
                                                onChange={handleChange} 
                                            >   
                                                <option value="">Select Office </option>
                                                <option value="Noida">Noida</option>
                                                <option value="Mumbai">Mumbai</option>
                                        </select>
                                        {formErrors.officeLocation && <div className="invalid-feedback">{formErrors.officeLocation}</div>}
                                           
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>User Type</label>
                                        <select
                                                 className={`form-control ${formErrors.userType ? 'is-invalid' : ''}`}
                                                name="userType"
                                                value={formData.userType}
                                                onChange={handleChange} 
                                            >
                                                <option value="">Select User Type </option>
                                                <option value="Manager">Manager</option>
                                                <option value="Executive">Executive</option>
                                        </select>
                                        {formErrors.userType && <div className="invalid-feedback">{formErrors.userType}</div>}
                                           
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Employee ID</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.EmployeeId ? 'is-invalid' : ''}`}
                                            name="EmployeeId"
                                            value={formData.EmployeeId}
                                            onChange={handleChange}
                                            />
                                             {formErrors.EmployeeId && <div className="invalid-feedback">{formErrors.EmployeeId}</div>}
                                    </div>
                               
                                    <div className="form-group col-md-4">
                                        <label>Employee Password</label>
                                            <input
                                            type="text"
                                             className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            />
                                            {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>First Name</label>
                                            <input
                                            type="text"
                                             className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            />
                                             {formErrors.firstName && <div className="invalid-feedback">{formErrors.firstName}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Last Name</label>
                                            <input
                                            type="text"
                                             className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            />
                                            {formErrors.lastName && <div className="invalid-feedback">{formErrors.lastName}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Date of Birth</label>
                                            <input
                                            type="text"
                                             className={`form-control ${formErrors.dob ? 'is-invalid' : ''}`}
                                            name="dob"
                                            id="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            />
                                    </div>
                                
                                    <div className="form-group col-md-4">
                                        <label>Email ID</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.emailId ? 'is-invalid' : ''}`}
                                            name="emailId"
                                            value={formData.emailId}
                                            onChange={handleChange}
                                            />
                                            {formErrors.emailId && <div className="invalid-feedback">{formErrors.emailId}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Mobile Number</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.mobileNumber ? 'is-invalid' : ''}`}
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            />
                                            {formErrors.mobileNumber && <div className="invalid-feedback">{formErrors.mobileNumber}</div>}
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Driving Licence</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.dl ? 'is-invalid' : ''}`}
                                            name="dl"
                                            value={formData.dl}
                                            onChange={handleChange}
                                            />
                                            {formErrors.dl && <div className="invalid-feedback">{formErrors.dl}</div>}
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Education</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.education ? 'is-invalid' : ''}`}
                                            name="education"
                                            value={formData.education}
                                            onChange={handleChange}
                                            
                                            />
                                            {formErrors.education && <div className="invalid-feedback">{formErrors.education}</div>}
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Marital Status</label>
                                        <select
                                                 className={`form-control ${formErrors.maritalStatus ? 'is-invalid' : ''}`}
                                                name="maritalStatus"
                                                value={formData.maritalStatus} 
                                                onChange={handleChange} 
                                            > 
                                                <option value="">Select</option>
                                                <option value="Married">Married</option>
                                                <option value="Separated">Separated</option>
                                                <option value="Divorced">Divorced</option>
                                                <option value="Widowed">Widowed</option>
                                                <option value="Single">Single</option>
                                        </select>
                                        {formErrors.maritalStatus && <div className="invalid-feedback">{formErrors.maritalStatus}</div>}
                                           
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Previous Company</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.previousCompany ? 'is-invalid' : ''}`}
                                            name="previousCompany"
                                            value={formData.previousCompany}
                                            onChange={handleChange}
                                            />
                                            {formErrors.previousCompany && <div className="invalid-feedback">{formErrors.previousCompany}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Experience</label>
                                        <select
                                                 className={`form-control ${formErrors.experience ? 'is-invalid' : ''}`}
                                                name="experience"
                                                value={formData.experience} 
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
                                        {formErrors.experience && <div className="invalid-feedback">{formErrors.experience}</div>}
                                           
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Designation</label>
                                        <select
                                                 className={`form-control ${formErrors.designation ? 'is-invalid' : ''}`}
                                                name="designation"
                                                value={formData.designation} 
                                                onChange={handleChange} 
                                            >
                                            <option value="">Select Designation</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Developer">Developer</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Team Leader">Team Leader</option>
                                            <option value="Java Developer">Java Developer</option>
                                            <option value="Software Developer">Software Developer</option>
                                            <option value="Mobile App Developer">Mobile App Developer</option>
                                        </select>
                                        {formErrors.designation && <div className="invalid-feedback">{formErrors.designation}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Date of Joining</label>
                                        <input
                                            type="text"
                                             className={`form-control ${formErrors.doj ? 'is-invalid' : ''}`}
                                            name="doj"
                                            value={formData.doj}
                                            onChange={handleChange}
                                            />
                                             {formErrors.doj && <div className="invalid-feedback">{formErrors.doj}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Work Shift</label>
                                        <select
                                                 className={`form-control ${formErrors.workShift ? 'is-invalid' : ''}`}
                                                name="workShift"
                                                value={formData.workShift} 
                                                onChange={handleChange} 
                                            >
                                            <option value="9:30 A.M. - 6:00 P.M.">9:30 A.M. - 6:00 P.M.</option>
                                            <option value="6:00 P.M. - 2:30 A.M.">6:00 P.M. - 2:30 A.M.</option>
                                        </select>
                                        {formErrors.workShift && <div className="invalid-feedback">{formErrors.workShift}</div>}
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>Blood Group</label>
                                        <select
                                                 className={`form-control ${formErrors.bloodGroup ? 'is-invalid' : ''}`}
                                                name="bloodGroup"
                                                value={formData.bloodGroup} 
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
                                        {formErrors.bloodGroup && <div className="invalid-feedback">{formErrors.bloodGroup}</div>}
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
                                            
                                            <select name="states"  className={`form-control ${formErrors.states ? 'is-invalid' : ''}`} id="states" onChange={handleStateChange} value={selectedState}>
                                                <option value="">Select a State</option>
                                                {states.map((state) => (
                                                <option key={state.SrNo} value={state.SrNo}>
                                                    {state.StateName}
                                                </option>
                                                ))}
                                            </select>
                                            {formErrors.states && <div className="invalid-feedback">{formErrors.states}</div>}


                                        </div>

                                        <div className="form-group">
                                            <label>City</label>
                                        

                                            <select name="cities"  className={`form-control ${formErrors.cities ? 'is-invalid' : ''}`} id="cities" onChange={handleCityChange} value={selectedCity}>
                                            <option value="">Select a City</option>
                                            {cities.map((city) => (
                                                <option key={city.SrNo} value={city.SrNo}>
                                                {city.CityName}
                                                </option>
                                            ))}
                                            </select>
                                            {formErrors.cities && <div className="invalid-feedback">{formErrors.cities}</div>}

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
                                                 className={`form-control ${formErrors.pincode ? 'is-invalid' : ''}`}
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                            />
                                            {formErrors.pincode && <div className="invalid-feedback">{formErrors.pincode}</div>}
                                        </div>
                                        
                                    </div>
                                    <div className="col-md-6">
                                       
                                        <div className="card-header d-flex justify-content-between">
                                        <h5>Temporary Address</h5>
                                        <div className="custom-control custom-checkbox">
                                            <input id="chkPrompt" name="chkPrompt" type="checkbox" className="custom-control-input" />
                                            <label className="custom-control-label" htmlFor="chkPrompt">Same as permanent</label>
                                        </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label>Address</label>
                                            
                                            <input
                                                type="text"
                                                 className={`form-control ${formErrors.Address1 ? 'is-invalid' : ''}`}
                                                name="Address1"
                                                value={formData.Address}
                                                onChange={handleChange}
                                            />
                                            {formErrors.Address1 && <div className="invalid-feedback">{formErrors.Address1}</div>}
                                        </div>

                                        <div className="form-group">
                                            <label>State</label>
                                            
                                            <select name="states1"  className={`form-control ${formErrors.states1 ? 'is-invalid' : ''}`} id="states1" onChange={handleStateChange} value={selectedState1}>
                                                <option value="">Select a State</option>
                                                {states1.map((state) => (
                                                <option key={state.SrNo} value={state.SrNo}>
                                                    {state.StateName}
                                                </option>
                                                ))} 
                                            </select>
                                            {formErrors.states1 && <div className="invalid-feedback">{formErrors.states1}</div>}


                                        </div>

                                        <div className="form-group">
                                            <label>City</label>
                                        

                                            <select name="cities1"  className={`form-control ${formErrors.cities1 ? 'is-invalid' : ''}`} id="cities1" onChange={handleCityChange} value={selectedCity1}>
                                            <option value="">Select a City</option>
                                            {cities1.map((city) => (
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
                                                value={formData.Country}
                                                onChange={handleChange}
                                            />
                                            {formErrors.Country1 && <div className="invalid-feedback">{formErrors.Country1}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Pin Code</label>
                                            <input
                                                type="text"
                                                 className={`form-control ${formErrors.pincode1 ? 'is-invalid' : ''}`}
                                                name="pincode1"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                            />
                                            {formErrors.pincode1 && <div className="invalid-feedback">{formErrors.pincode1}</div>}
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
                                Submit
                            </button>
                            )}
                            
                        </form>
                    </div>
                </div>
            </div>
          </div>
          </div>
          </div>
    </div>
  );
};

export default EmployeForm;
