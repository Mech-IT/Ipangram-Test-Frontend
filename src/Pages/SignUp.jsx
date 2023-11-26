import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {showLoader,hideLoader,showToast} from "../../ValtioStore/utils"
import axios from "axios"
const SignUp = () => {

  const [formData, setFormData] = useState({ firstName: "", lastName: "", location: "", email: "", role: "employee", password: "" })

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    showLoader()
    const apiUrl = `${import.meta.env.VITE_SERVER_HOST}/api/signupUser`;


    // Make a POST request using Axios
    axios.post(apiUrl, formData)
      .then(response => {
        // Handle success
        console.log('Response:', response.data);
        hideLoader()
        showToast("Signup successful...",false)
        navigate("/login")
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
        showToast(error.response.data.error || "Something went wrong...", true)
        hideLoader()
      });

  }
  return (
    <div className="container-fluid">
      <style>
        {`
          .form-label:after {
            content:" *";
            color: red;
          }
        `}
      </style>
      <div className="row">
        <div className="col-md-6" style={{ backgroundImage: 'url("https://img.lovepik.com/photo/45009/7677.jpg_wh860.jpg")', backgroundSize: '100%,100%', backgroundRepeat: "no-repeat", minHeight: '100vh', }}>
          {/* You can add additional styling or content to the left side if needed */}
        </div>
        <div className="col-md-6 d-flex align-items-center" >
          <div className="mx-auto" style={{ maxWidth: '400px' }}>
            <h1 className="text-center mb-4">Sign Up to IPangram</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input type="text" className="form-control" id="firstName" style={{ width: '100%' }} name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input type="text" className="form-control" id="lastName" style={{ width: '100%' }} name='lastName' value={formData.lastName} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input type="text" className="form-control" id="location" style={{ width: '100%' }} name='location' value={formData.location} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input type="email" className="form-control" id="email" style={{ width: '100%' }} name='email' value={formData.email} onChange={handleChange} required />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    checked={formData.role == "employee"}
                    onChange={handleChange}
                    id="employee"
                    value="employee"
                  />
                  <label className="form-check-label" htmlFor="employee">
                    Employee
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="manager"
                    checked={formData.role == "manager"}
                    onChange={handleChange}
                    value="manager"
                  />
                  <label className="form-check-label" htmlFor="manager">
                    Manager
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control" id="password" style={{ width: '100%' }} name='password' value={formData.password} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '30%' }}>
                Submit
              </button>
              <p className="mt-3 text-center">
                Already have an account? <a href="/login">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
