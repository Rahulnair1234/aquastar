import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom' ;

import { Link } from 'react-router-dom';
const SignUp = () => {
    const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({email: "", password: "",name:"",mobile:"",confirm_password:""}) 
  const navigate = useNavigate();
 const check=()=>{
  if (document.getElementById('password').value ===  document.getElementById('cpassword').value) {
  document.getElementById('message').style.color = 'green';
  document.getElementById('message').innerHTML = '&#10004;';
} else {
  document.getElementById('message').style.color = 'red';
  document.getElementById('message').innerHTML = '&#10060;';
}
 }
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (document.getElementById('password').value !==  document.getElementById('cpassword').value) {
      navigate("/prosignup");
    } else {
    
    //API call
    const response = await fetch(`${host}/api/auth/registerUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credentials.name,
        email: credentials.email,
        mobile:credentials.mobile,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //redirect
      localStorage.setItem("token",json.authtoken)
      navigate("/");
    } else if(json.success===false){
      alert(json.error);
    }
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
  <input id="tab-1" type="radio" name="tab1" className="sign-in" checked/><label htmlFor="tab-1" className="tab">Sign Up</label>
    <input id="tab-2" type="radio" name="tab1" className="sign-up" /><label htmlFor="tab-2" className="tab"> </label>
    <div className="login-form">
      <form onSubmit={handlesubmit}>
      <div className="sign-in-htm"> 
        <div className="group">
          <label htmlFor="name" className="label">Name</label>
          <input type="text" className="input" id="name"onChange={onChange} name="name" pattern="^\D*" maxLength={30} title="Not a valid name"required minLength={3}/>
        </div>
        <div className="group">
          <label htmlFor="email" className="label">Email id</label>
          <input type="email" className="input" id="email"onChange={onChange}maxLength={40} name="email"/>
        </div>
        <div className="group">
          <label htmlFor="mobile" className="label">Mobile</label>
          <input type="text" className="input" id="mobile"onChange={onChange}  pattern="^\d{10}$" title="Must contain 10 digits"  name="mobile"/>
        </div>
        <div className="group">
          <label htmlFor="password" className="label">Password</label>
          <input id="password" type="password" className="input" onKeyUp={check}name="password"onChange={onChange} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required data-type="password"/>
        </div>
        <div className="group">
          <label htmlFor="cpassword" className="label">Repeat Password</label>
          <div className='d-flex'>
          <input type="password" className="input" id="cpassword"onKeyUp={check} onChange={onChange} name="cpassword" minLength={8} required data-type="password"/><span id='message'style={{align:"left"}}></span>
          </div>
        </div>
        <div className="group">
          <input type="submit" className="button" value="Sign Up"/>
        </div>
        <div className="foot-lnk">
          <Link to="/prologin">Already Member?</Link>
        </div>
        <div className="hr"></div>
       
      </div>
      </form>
    </div>
    </div>
  </div>
    </>
    </div>
  )
}

export default SignUp
