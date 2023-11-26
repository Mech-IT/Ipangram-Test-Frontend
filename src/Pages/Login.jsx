import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {showLoader,hideLoader,showToast} from "../../ValtioStore/utils"
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/userReducer';

const Login = () => {

  const [formData, setFormData] = useState({ email: "",  password: "" })

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    showLoader()
    // Replace the URL with the endpoint you want to send the POST request to
    const apiUrl = `${import.meta.env.VITE_SERVER_HOST}/api/loginUser`;;


    // Make a POST request using Axios
    axios.post(apiUrl, formData)
      .then(response => {
        // Handle success
        console.log('Response:', response.data);
        dispatch(loginSuccess({...response.data}))
        hideLoader()
        showToast("Login successful...",false)
        navigate("/")
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
        hideLoader()
        showToast(error.response.data.error || "Something went wrong...", true)
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
            <h1 className="text-center mb-4">Login to IPangram</h1>
            <form onSubmit={handleSubmit}>
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
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control" id="password" style={{ width: '100%' }} name='password' value={formData.password} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '30%' }}>
                Submit
              </button>
              <p className="mt-3 text-center">
                Don't have an account? <a href="/signup">Sign Up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
