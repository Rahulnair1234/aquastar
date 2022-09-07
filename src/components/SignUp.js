import React,{useState} from "react";
import { useNavigate } from 'react-router-dom' ;
const SignUp = () => {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({email: "", password: "",name:"",mobile:"",confirm_password:""}) 
  const navigate = useNavigate();
  

  const handlesubmit = async (e) => {
    e.preventDefault();
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
    } else {
      alert("Invalid credentials");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name"onChange={onChange} name="name" minLength={3}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email"onChange={onChange} name="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile No
          </label>
          <input type="number" className="form-control" id="mobile"onChange={onChange} name="mobile" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" onChange={onChange} name="password" minLength={8} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
           confirm  Password
          </label>
          <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" minLength={8} required/>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div> 
  );
};

export default SignUp;
