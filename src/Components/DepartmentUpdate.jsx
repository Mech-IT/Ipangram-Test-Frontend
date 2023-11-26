import React, { useState } from 'react';

import { showLoader, hideLoader, showToast } from "../../ValtioStore/utils"
import axios from "axios"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetUpdateData } from '../../redux/updateDataReducer';
const DepartmentUpdate = () => {


  const { updateData } = useSelector(state => state.updateData)

  const {authToken} = useSelector(state=>state.user)

  const [formData, setFormData] = useState(updateData)

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
    const apiUrl = !updateData._id ? `${import.meta.env.VITE_SERVER_HOST}/api/createDepartment` : `${import.meta.env.VITE_SERVER_HOST}/api/updateDepartment`;


    // Make a POST request using Axios
    axios.post(apiUrl, formData,{
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      }
    })
      .then(response => {
        // Handle success
        console.log('Response:', response.data);
        hideLoader()
        showToast(response.data.success, false)
        dispatch(resetUpdateData())
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
        showToast(error.response.data.error || "Something went wrong...", true)
        hideLoader()
      });

  }
  return (
    <div className="col-md-12 d-flex align-items-center" >
      <div className="mx-auto" style={{ width: "100%" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Department Name
            </label>
            <input type="text" className="form-control" id="firstName" style={{ width: '100%' }} name="departmentName" value={formData.departmentName} onChange={handleChange} required />
          </div>
          <button type="submit" id="departmentFormBtn" className="btn btn-primary d-none" style={{ width: '30%' }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default DepartmentUpdate