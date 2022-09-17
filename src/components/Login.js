import React from 'react'
import { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom' ;
import productContext from "../context/product/productContext";
import { Link } from 'react-router-dom';
const Login = () => {
    const context = useContext(productContext);
  const{setRoles}=context;
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({email: "", password: ""}) 
  
  const navigate = useNavigate();
  
  const handlesubmit = async (e) => {
    e.preventDefault();
    //API call
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect
      
      localStorage.setItem("token",json.authtoken);
      if(json.role){ 
        setRoles({role:true});
        navigate("/admin_home");
      }
      else{
        setRoles({role:false});
        navigate("/");
      }
     // localStorage.setItem('role',json.role);
      
      alert(json.role);
    } else {
      alert("Invalid credentials");
    }
  };
  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
 
  return (
    <div>
      <>
      <div className="login-wrap my-5">
  <div className="login-html">
    <input id="tab-1" type="radio"checked name="tab" className="sign-in"  /><label htmlFor="tab-1" className="tab">Sign In</label>
    <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab"> </label>
    <div className="login-form">
    <form onSubmit={handlesubmit}>
      <div className="sign-in-htm">
        <div className="group">
          <label htmlFor="email" className="label">Email id</label>
          <input type="email"
              className="input"
              value={credentials.email}
              onChange={onChange}
              id="email"
              maxLength={50}
              name="email"/>
        </div>
        <div className="group">
          <label htmlFor="password" className="label">Password</label>
          <input  type="password" className="input" data-type="password" value={credentials.password}
              onChange={onChange} id="password"
              name="password"/>
        </div>
       
        <div className="group">
          <input type="submit" className="button" value="Sign In" />
        </div>
        <div className="hr"></div>
        <div className="foot-lnk">
          <Link to="/prosignup">Sign Up</Link>
        </div>
      </div>
      </form>
     
    </div>
  </div>
</div>
    </>
    </div>
  )
}

export default Login
