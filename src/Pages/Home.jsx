import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Components/Navbar';
import { useDispatch } from 'react-redux';
import { setUpdateData } from '../../redux/updateDataReducer';

const Home = () => {
  
  const { currentUser } = useSelector((state) => state.user);

  const dispatch=useDispatch();

  const handleEditClick = () => {
   
    dispatch(setUpdateData({ updateName: "userInfo", updateData: currentUser}))

  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="card border-0 bg-light shadow">
        <div className="card-body text-center">
          <h1 className="display-4 text-primary mb-4">Welcome, {currentUser.firstName}!</h1>
          <hr className="my-4" />
          <p className="lead mb-4">Your details:</p>
          <ul className="list-group text-left mb-4">
            <li className="list-group-item border-0">
              <strong>First Name:</strong> {currentUser.firstName}
            </li>
            <li className="list-group-item border-0">
              <strong>Last Name:</strong> {currentUser.lastName}
            </li>
            <li className="list-group-item border-0">
              <strong>Location:</strong> {currentUser.location}
            </li>
            <li className="list-group-item border-0">
              <strong>Role:</strong>{' '}
              {currentUser.role === 'employee' ? 'Employee' : 'Manager'}
            </li>
            <li className="list-group-item border-0">
              <strong>Email:</strong> {currentUser.email}
            </li>
            <li className="list-group-item border-0">
              <strong>Department:</strong> {currentUser.department}
            </li>
            <li className="list-group-item border-0">
              <strong>Job Position:</strong> {currentUser.jobPosition}
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleEditClick}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
