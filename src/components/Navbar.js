import React, { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import productContext from "../context/product/productContext";
const Navbar = () => {
  let navigate=useNavigate();
  const context=useContext(productContext);
  const {roles,setRoles}=context;
  const handleLogout=()=>{
    localStorage.removeItem('token');
    setRoles({roles:false});
    navigate("/prologin")
   }
  return (
    <div>
      {<nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          {roles.role?<Link className="navbar-brand" to="/admin_home">
            Anjali-Sales And Services-admin page
          </Link>:<Link className="navbar-brand" to="/">
            Anjali-Sales And Services
          </Link>}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                {roles.role?<Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>:<Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>}
              </li>
              <li className="nav-item">
                {roles.role?<Link className="nav-link active" aria-current="page" to="/admin_home">
                  Products
                </Link>:<Link className="nav-link active" aria-current="page" to="/products">
                  Products
                </Link>}
              </li>
              <li className="nav-item">
                {roles.role &&<Link className="nav-link" to="/admin_orders">
                  Order Requests
                </Link>}
              </li>
              <li className="nav-item">
                {roles.role?<Link className="nav-link" to="/admin_services">
                  Services Requests
                </Link>:<Link className="nav-link" to={localStorage.getItem('token')?"/services":"/prologin"}>
                  Book Services
                </Link>}
              </li>
              <li className="nav-item">
                {roles.role&&<Link className="nav-link" to="/viewSubscriptions">
                  Active Subscriptions
                </Link>}
              </li>
              <li><Link className="nav-link" to={localStorage.getItem('token')?"/profile":"/prologin"}>
                  Profile
                </Link></li>
                <li className="nav-item">
                {roles.role&&<Link className="nav-link" to="/reports">
                  Reports
                </Link>}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
            </ul>
            
              {!localStorage.getItem("token") ? (
                <form className="d-flex" role="search">
                  <Link
                    className="btn btn-primary mx-1"
                    to="/prologin"
                    role="button"
                  >
                    Sign In
                  </Link>
                </form>
              ) : (
               <button button className="btn btn-primary mx-1" onClick={handleLogout}>
                  Sign Out
                </button>
              )}

          </div>
        </div>
      </nav>}
    </div>
  );
};

export default Navbar;
