import React, { useState } from 'react';
import logo from './../img/login-logo.svg';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({});

    // Validate input fields
    if (username.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Username is required.' }));
      return;
    }

    if (password.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required.' }));
      return;
    }

    // Call the backend API to authenticate the user
    try {
      const response = await fetch('http://10.10.20.13:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {

        const data = await response.json();
        // Save the token in localStorage or sessionStorage
        localStorage.setItem('token', data.token);
        setToken(data.token);

        // Successful login, redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        // Handle login error
        console.log('Login failed.');
      }
    } catch (error) {
      console.log('Error:', error);
      
    }
  };

  return (
    <div>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div className="page-content-wrapper blank">
            {/* Begin Page Content */}
            <div className="container-fluid">
              <div className="text-center mt-5">
                <img src={logo} className="login-logo" alt="LOGO" />
              </div>
              <div className="row mt-4 justify-content-center">
                <div className="col-md-4">
                  <div className="card border-0 shadow-lg">
                    <div className="card-body login-page">
                      <h5>Sign In</h5>
                      <p>Welcome back to your account.</p>
                      <form onSubmit={handleLogin}>
                        <div className="form-group">
                          <div className="control has-icon">
                            <input
                              type="text"
                              placeholder="Username"
                              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                            <label className="label form-icon" htmlFor="usrName">
                              <i className="lnil lnil-user" />
                            </label>
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="control has-icon">
                            <input
                              type="password"
                              placeholder="Password"
                              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="label form-icon" htmlFor="pswd">
                              <i className="lnil lnil-lock-alt" />
                            </label>
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <div className="custom-control custom-switch">
                                <input type="checkbox" className="custom-control-input" id="customSwitch1" />
                                <label className="custom-control-label" htmlFor="customSwitch1">
                                  Remember
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 f-pswd"></div>
                        </div>
                        <button className="btn btn-primary" type="submit">
                          Sign In
                        </button>
                      </form>
                    </div>
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
    </div>
  );
};

export default Login;
