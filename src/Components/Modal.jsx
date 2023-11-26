import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import UserInfoUpdate from './UserInfoUpdate'
import { resetUpdateData } from '../../redux/updateDataReducer'
import DepartmentUpdate from './DepartmentUpdate'
import EmployeeUpdate from "./EmployeeUpdate"

const Modal = () => {
    
    
    const {isUpdate,updateName,updateData}=useSelector(state=>state.updateData)
    
    // const [openModal, setOpenModal] = useState(isUpdate)

    const dispatch = useDispatch()

    const handleCloseModal=()=>{
       dispatch(resetUpdateData())
    }

    const handleUpdate=()=>{
        {updateName == "department" && document.getElementById("departmentFormBtn").click()}
        {updateName == "userInfo" && document.getElementById("userInfoBtn").click()}
        {updateName == "employee" && document.getElementById("employeeUpdateBtn").click()}
    }
    return (
        <div class={`modal fade ${isUpdate?"show":""}`} id="exampleModalCenteredScrollable" tabindex="-1" aria-labelledby="exampleModalCenteredScrollableTitle" style={{display: isUpdate?"block":"none"}} aria-modal="true" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        {updateData._id && <h1 class="modal-title fs-5" id="exampleModalLabel">{`Update ${updateName}`}</h1>}
                        {!updateData._id && <h1 class="modal-title fs-5" id="exampleModalLabel">{`Add ${updateName}`}</h1>}
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                    </div>
                    <div class="modal-body">
                        {updateName == "userInfo" && <UserInfoUpdate/>}
                       {updateName == "department" && <DepartmentUpdate/>}
                       {updateName == "employee" && <EmployeeUpdate/>}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                        {updateData._id && <button type="button" class="btn btn-primary" onClick={handleUpdate}>{`Update ${updateName}`}</button>}
                        {!updateData._id && <button type="button" class="btn btn-primary" onClick={handleUpdate}>{`Add ${updateName}`}</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal