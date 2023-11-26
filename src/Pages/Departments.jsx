import React, { useEffect, useState } from 'react';
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateData } from '../../redux/updateDataReducer';
import { showLoader, hideLoader, showToast } from "../../ValtioStore/utils"
import axios from "axios"

const Departments = () => {
  const [departmentData, setDepartmentData] = useState([]);

  const { updateName } = useSelector(state => state.updateData)

  const {authToken} = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleEdit = (department) => {

    dispatch(setUpdateData({ updateName: "department", updateData: { ...department } }))
  };

  const handleDelete = (id) => {
    
    const userConfirmation = confirm("Are you sure, you want to delete this?");

    if(!userConfirmation){
      return
    }
    showLoader()
    axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/deleteDepartment`, { id },{
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
        getDepartments()
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
        showToast(error.response.data.error || "Something went wrong...", true)
        hideLoader()
      });
  };

  const handleAddDepartment = () => {
    dispatch(setUpdateData({ updateName: "department", updateData: { departmentName: "" } }))
  }

  const getDepartments = () => {
    showLoader()
    axios.get(`${import.meta.env.VITE_SERVER_HOST}/api/getDepartments`,{
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
    if (updateName == "") {
      getDepartments()
    }
  }, [updateName])

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Departments</h2>
        <button className="btn btn-success mb-3 float-end" onClick={handleAddDepartment}>Add Department</button>
        <table className="table">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departmentData.length ? departmentData.map((department) => (
              <tr key={department.id}>
                <td>{department.departmentName}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(department)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(department._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) : <h2>No Data Found!</h2>}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Departments;
