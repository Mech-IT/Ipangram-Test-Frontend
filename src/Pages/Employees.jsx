import React, { useEffect, useState } from 'react';
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateData } from '../../redux/updateDataReducer';
import { showLoader, hideLoader, showToast } from "../../ValtioStore/utils"
import axios from "axios"
import EmployeeFilter from '../Components/EmployeeFilter';
import Pagination from '../Components/Pagination';

const Employees = () => {
  const [employeeData, setEmployeeData] = useState([]);

  const [employeeCount, setEmployeeCount] = useState(0)

  const [finalFilters, setFinalFilters] = useState({
    searchTerm:"",
    filterOption:"name",
    sortOrder:"asc",
  })

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const nPages = employeeCount && Math.ceil(employeeCount / recordsPerPage)

  
  const dispatch = useDispatch()

  const { updateName } = useSelector(state => state.updateData)

  const {authToken,currentUser} = useSelector(state=>state.user)

  const handleEdit = (employee) => {
    dispatch(setUpdateData({ updateName: "employee", updateData: { ...employee } }))
  };

  const handleDelete = (id) => {
    
    const userConfirmation = confirm("Are you sure, you want to delete this?");

    if(!userConfirmation){
      return
    }
    showLoader()
    axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/deleteEmployee`, { id },{
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
        handleGetEmployee()
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
        showToast(error.response.data.error || "Something went wrong...", true)
        hideLoader()
      });
  };


  const handleGetEmployee = ()=>{
    showLoader()
    axios.post(`${import.meta.env.VITE_SERVER_HOST}/api/getEmployee`,{...finalFilters,indexOfFirstRecord,indexOfLastRecord},{
      headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
      }
    })
      .then(response => {
        // Handle the successful response
        console.log(response.data);
        hideLoader()
        setEmployeeData(response.data.userArray)
        setEmployeeCount(response.data.userArray.length)
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
        showToast(error.response.data.error || "Something went wrong...", true)
        hideLoader()
      });
  }

  useEffect(() => {
    if(updateName == ""){
      handleGetEmployee()
    }
  }, [updateName,finalFilters,currentPage])


   const handleFilterChange = (filters) => {
      
    // console.log("lll**+++",filters , indexOfFirstRecord , indexOfLastRecord)
    
    setFinalFilters(filters)

   }
  
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2>Employees</h2>
        <EmployeeFilter onFilterChange={handleFilterChange}/>
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Job Position</th>
              <th>Department</th>
              {currentUser.role == "manager" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.location}</td>
                <td>{employee.jobPosition}</td>
                <td>{employee.department}</td>
                {currentUser.role == "manager" &&<td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
        <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

        </div>
      </div>
    </>
  );
};

export default Employees;
