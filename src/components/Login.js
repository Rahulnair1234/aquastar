
import { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom' ;
import productContext from "../context/product/productContext";
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
    <>
      <div className="container my-3">
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              onChange={onChange}
              id="email"
              name="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              id="password"
              name="password"
              
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        </div>
    </>
  );
};

export default Login;
