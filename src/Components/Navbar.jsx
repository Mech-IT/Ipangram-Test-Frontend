import React from 'react'
import { useSelector} from "react-redux"
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../../redux/userReducer';
const Navbar = () => {

    const { currentUser } = useSelector(state => state.user);

    const dispatch = useDispatch()

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">IPangram</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li  className="nav-item" ><a className="nav-link active" href="/employees">Employees</a></li>
                            {currentUser.role == "manager" ? <li  className="nav-item" ><a className="nav-link active" href="/departments">Departments</a></li>:null}
                        </ul>
                    </div>
                    <div style={{color:"white",cursor:"pointer"}} onClick={()=>{dispatch(logoutSuccess())}}>
                        Logout
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar