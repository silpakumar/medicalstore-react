import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import React, { useState } from "react"; 
import { removeUser } from "./store/authSlice";



function Navbar(){
    var user=useSelector(store=>store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchKey, setSearchKey] = useState("");
        

        const handleChange =  (e) => {
            setSearchKey(e.target.value);
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            if(searchKey.trim() !== ""){
                navigate (`/search/${searchKey}`);
            }
        };
        
    function logout(){
        if(user){
            axios.post('https://medicalstore.mashupstack.com/api/logout',{},{
                headers:{'Authorization':"Bearer " +user.token}
            });
            dispatch(removeUser());
            navigate('/login');
        }
    }
    return (<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="navbar-brand">
            <h4>Medical Store</h4>
        </div>
        <button className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse mr-auto" id="navbarNav" style={{ float: "left"}}>
            <ul className="navbar-nav ml-auto" style={{ color:"#ffffff"}}>

                <li className="nav-item">
                    <form className="form-inline" onSubmit={handleSubmit}>
                        <input type="text" placeholder="search"
                        name="key" value={searchKey} onChange={handleChange}
                        className="form-control mr-sm-2"></input>

                        <button type="submit" className="btn btn-outline-light">Search</button>
                    </form>
                </li>

                <li className="nav-item">
                    <NavLink to ={"/"} className={'nav-link '+ (({isActive}) => (isActive? 'active' : ''))}>
                        Home
                    </NavLink>
                </li>

                <li className="nav-item">
                <NavLink 
                to={"/blog/medicines"} 
                className={
                    'nav-link '+
                    (status => status.isActive ? 'active' : '')
                } 
                >
                    Medicines
                </NavLink>
                    
                </li>
                <li className="nav-item">
                <NavLink 
                to={"/register"} 
                className={
                    'nav-link '+
                    (status => status.isActive ? 'active' : '')
                } 
                >
                    Register
                </NavLink>
                </li>
            {user ?
            <li className="nav-item">
                <span className="nav-link" onClick={logout}>Logout</span>
            </li>:
            <li className="nav-item">
                <NavLink to={"/login"}
                className={
                    'nav-link ' +
                    (status => status.isActive ? 'active' :'')
                }>

                    Login

                </NavLink>
            </li>
            }
            

            </ul>

        </div>

        
    </nav>);
    
};
export default Navbar;