import React, { useEffect, useState } from 'react';

import { showLoader, hideLoader, showToast } from "../../ValtioStore/utils"
import axios from "axios"
import { useSelector,useDispatch } from 'react-redux';
import { resetUpdateData } from '../../redux/updateDataReducer';


const EmployeeUpdate = () => {


    const { updateData } = useSelector(state => state.updateData)

    const { authToken,currentUser } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({jobPosition: updateData.jobPosition, department: updateData.department })

    const [departmentData, setDepartmentData] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        showLoader()
        const apiUrl = `${import.meta.env.VITE_SERVER_HOST}/api/updateEmployee`;


        // Make a POST request using Axios
        axios.post(apiUrl, { _id: updateData._id, ...formData }, {
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

    const getDepartments = () => {
        showLoader()
        axios.get(`${import.meta.env.VITE_SERVER_HOST}/api/getDepartments`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': authToken
            }
        })
            .then(response => {
                // Handle the successful response
                console.log(response.data);
                hideLoader()
                setDepartmentData(response.data.departmentArray)
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
                showToast(error.response.data.error || "Something went wrong...", true)
                hideLoader()
            });
    }

    useEffect(() => {
        if(currentUser.role == "manager"){
            getDepartments()
        }
    }, [])

    return (
        <div className="col-md-12 d-flex align-items-center" >
            <div className="mx-auto" style={{ width: "100%" }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="jobPosition" className="form-label">
                            Job Position
                        </label>
                        <input type="text" className="form-control" id="jobPosition" style={{ width: '100%' }} name='jobPosition' value={formData.jobPosition} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="department" className="form-label">
                            Department
                        </label>
                        <select className="form-select" id="department" style={{ width: '100%' }} name='department' value={formData.department} onChange={handleChange} required>
                            <option value="" disabled>Select a department</option>
                            {
                                departmentData?.map((department) => {
                                    return <option value={department.departmentName}>{department.departmentName}</option>
                                })
                            }
                        </select>
                    </div>
                    <button type="submit" id="employeeUpdateBtn" className="btn btn-primary d-none" style={{ width: '30%' }}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EmployeeUpdate