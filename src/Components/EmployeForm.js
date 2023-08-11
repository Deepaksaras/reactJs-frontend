import React, {useState,useEffect} from 'react';
import Sidebar from './Sidebar';
import DatePicker from "react-datepicker";  
  
import "react-datepicker/dist/react-datepicker.css";  

const EmployeForm = () => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
  
    const [startDate, setStartDate] = useState(new Date());  
    const [sameAsPermanent, setSameAsPermanent] = useState(false); // State to manage checkbox

  const [formData, setFormData] = useState({
    OfficeNumber:'',
    UserType:'',
    EmployeeId:'',
    EmployeePassword:'',
    Name:'',
    LastName:'',

    DateOfBirth:'',
    Email:'',
    Mobile:'',
    DrivingLicence:'',
    Education:'',
    MaritalStatus:'',
    PreviousCompany:'', Experience:'', Designation:'', DateOfJoining:'', WorkShift:'',BloodGroup:'',
    Address: '',
    states: '',
    cities: '',
    Country: '',
    Pincode: '',
    Address1: '',
    states1: '',
    cities1: '',
    Country1: '',
    Pincode1: '',
  });

  useEffect(() => {
    // Fetch states data from the API
    fetch('http://localhost:5000/states')
      .then((response) => response.json())
      .then((data) => setStates(data))
      .catch((error) => console.log(error));
  }, []);

  const handleStateChange = (event) => {
    const stateId = event.target.value;
    setSelectedState(stateId);
    ;
  
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
          if (!formData.EmployeePassword) {
            errors.EmployeePassword = 'EmployeePassword is required.';
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
    alert('das');
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log(formData);

      fetch('http://localhost:5000/emp', {
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


  // Handler to handle checkbox change
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
                                                <option value="Manager">Manager</option>
                                                <option value="Executive">Executive</option>
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
                                        <label>Employee EmployeePassword</label>
                                            <input
                                            type="text"
                                            className={`form-control ${formErrors.EmployeePassword ? 'is-invalid' : ''}`}
                                            name="EmployeePassword"
                                            value={formData.EmployeePassword}
                                            onChange={handleChange}
                                            />
                                            {formErrors.EmployeePassword && <div className="invalid-feedback">{formErrors.EmployeePassword}</div>}
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
                                            <option value="Admin">Admin</option>
                                            <option value="Developer">Developer</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Team Leader">Team Leader</option>
                                            <option value="Java Developer">Java Developer</option>
                                            <option value="Software Developer">Software Developer</option>
                                            <option value="Mobile App Developer">Mobile App Developer</option>
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
                                                <option value="">Select</option>
                                            <option value="9:30 A.M. - 6:00 P.M.">9:30 A.M. - 6:00 P.M.</option>
                                            <option value="6:00 P.M. - 2:30 A.M.">6:00 P.M. - 2:30 A.M.</option>
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
                                            
                                            <select name="State"  className={`form-control ${formErrors.states ? 'is-invalid' : ''}`} id="State" onChange={handleStateChange} value={selectedState}>
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
                                        

                                            <select name="City"  className={`form-control ${formErrors.cities ? 'is-invalid' : ''}`} id="City" onChange={handleCityChange} value={selectedCity}>
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
    </div>
  );
};

export default EmployeForm;


