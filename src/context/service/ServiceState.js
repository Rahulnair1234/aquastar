import React ,{ useState } from "react";
import serviceContext from "./serviceContext"

const ServiceState = (props) => {
    const host = "http://localhost:5000";
    const initialServices=[];
    const [services, setServices] = useState(initialServices);
    //get all services
    const getAllServices = async () => {
        //API call
        const response = await fetch(`${host}/api/admin_controls/view_service_req`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const json = await response.json();
        console.log(json);
        setServices(json);
        console.log(services);
      };
      //update service
  const updateService = async (id,status,description) => {
    //API call
    const response = await fetch(`${host}/api/admin_controls/updateServices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ status,description}),
    });
    const json = await response.json();
    console.log(json);
    const newService = JSON.parse(JSON.stringify(services));
    //Frontend
    for (let index = 0; index < newService.length; index++) {
      const element = newService[index];
      if (element.outsid === id) {
        newService[index].status = status;
        newService[index].description =description;
        
        break;
      }
    }
    setServices(newService);
  };
  return (
    
      <serviceContext.Provider value={{services,setServices,getAllServices,updateService}}>
            {props.children}
        </serviceContext.Provider>
  )
}

export default ServiceState
