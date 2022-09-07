import React ,{ useState } from "react";
import subscriptionContext from "./subscriptionContext"
const SubscriptionState = (props) => {
    const host = "http://localhost:5000";
    const initialSubscriptions=[];
    const initialInservices=[];
    const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
    const [inservices, setInservices] = useState(initialInservices);
    //get all services
    const getAllSubscriptions = async () => {
        //API call
        const response = await fetch(`${host}/api/admin_controls/view_subscriptions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const json = await response.json();
        console.log(json);
        setSubscriptions(json);
        console.log(subscriptions);
      };
    //update inservices 
  const updateInservice = async (id,status,description) => {
    //API call
    const response = await fetch(`${host}/api/admin_controls/updateSubscription/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ status,description}),
    });
    const json = await response.json();
    console.log(json);
    const newInservice = JSON.parse(JSON.stringify(inservices));
    //Frontend
    for (let index = 0; index < newInservice.length; index++) {
      const element = newInservice[index];
      if (element.insid === id) {
        newInservice[index].status = status;
        newInservice[index].description =description;
        
        break;
      }
    }
    setInservices(newInservice);
  };
      //get all inservice requests
      const getAllInservice = async () => {
        //API call
        const response = await fetch(`${host}/api/admin_controls/view_inservices`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const json = await response.json();
        console.log(json);
        setInservices(json);
        console.log(inservices);
      };
  return (
        <subscriptionContext.Provider value={{subscriptions,setSubscriptions,getAllSubscriptions,inservices,setInservices,getAllInservice,updateInservice}}>
            {props.children}
        </subscriptionContext.Provider>
  )
}

export default SubscriptionState
