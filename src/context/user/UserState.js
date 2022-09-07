import React,{useState} from 'react'
import userContext from './userContext'
//import Razorpay from 'razorpay'
const UserState = (props) => {
    const host = "http://localhost:5000";
    //const initialServices=[];
    const [user, setUser] = useState([]);
    const [userservice, setUserService] = useState([]);
    const [usersubscription, setUserSubscription] = useState([]);
    const [userorder,setUserOrder]=useState([]);
    const [myorders,setMyOrders]=useState([]);
    const [myservices,setMyServices]=useState([]);
    const [mysubscriptions,setMySubscriptions]=useState([]);
    //getmyorders
    const getMyOrders = async () => {
      //API call
      const response = await fetch(`${host}/api/cust/getmyorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")
        },
      });
      const json = await response.json();
      console.log(json);
      setMyOrders(json);
      console.log(myorders)
    };
    //getmyservices
    const getMyServices = async () => {
      //API call
      const response = await fetch(`${host}/api/cust/getmyservices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")
        },
      });
      const json = await response.json();
      console.log(json);
      setMyServices(json);
      console.log(myservices)
    };
    //getmysubscriptions
    const getMySubscriptions = async () => {
      //API call
      const response = await fetch(`${host}/api/cust/getmysubscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")
        },
      });
      const json = await response.json();
      console.log(json);
      setMySubscriptions(json);
      console.log(mysubscriptions)
    };
    //get user info
    const getUserInfo = async () => {
        //API call
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem("token")
          },
        });
        const json = await response.json();
        console.log(json);
        setUser(json);
        console.log(user)
      };
      //make order payment
     const makeOrderPayment=async(oid,mode)=>{
         //API call
         const response = await fetch(`${host}/api/bill/order_bill/${oid}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({mode}),
          });
          const json = await response.json();
          console.log(json);
        //  setUserOrder(json);
          //console.log(services);
    /*
        */
     }
    const purchaseProduct = async(pid,address) => {
        //API call
        const response = await fetch(`${host}/api/cust/buyproduct/${pid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({ address}),
        });
        const json = await response.json();
        console.log(json);
        setUserOrder(json);
        console.log(userorder);
      };
      const purchaseService = async(product_name,model_no,company,address,service_charge) => {
        //API call
        const response = await fetch(`${host}/api/cust/outservice`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({product_name,company,model_no,address,service_charge}),
        });
        const json = await response.json();
        console.log(json);
        setUserService(json);
        console.log(userservice);
      };
      const purchaseSubscription = async(product_name,model_no,company,address,subscription_fees) => {
        //API call
        const response = await fetch(`${host}/api/cust/subscription`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({product_name,model_no,company,subscription_fees,address}),
        });
        const json = await response.json();
        console.log(json);
        setUserSubscription(json);
        console.log(usersubscription);
      };
      const makeOutservicerPayment=async(outserviceid,mode)=>{
        //API call
        const response = await fetch(`${host}/api/bill/service_bill/${outserviceid}`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             "auth-token":localStorage.getItem('token')
           },
           body: JSON.stringify({mode}),
         });
         const json = await response.json();
         console.log(json);
       //  setUserOrder(json);
         //console.log(services);
       
    }
    const makeSubscriptionPayment=async(subid,mode)=>{
        //API call
        const response = await fetch(`${host}/api/bill/subscription_bill/${subid}`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             "auth-token":localStorage.getItem('token')
           },
           body: JSON.stringify({mode}),
         });
         const json = await response.json();
         console.log(json);
       //  setUserOrder(json);
         //console.log(services);
       
    }
  return (
    <userContext.Provider value={{purchaseProduct,getUserInfo,user,setUser,setUserOrder,userorder,makeSubscriptionPayment,makeOutservicerPayment,makeOrderPayment,usersubscription,userservice,purchaseSubscription,purchaseService,myorders,myservices,mysubscriptions,getMyOrders,getMyServices,getMySubscriptions}}>
    {props.children}
</userContext.Provider>
  )
}

export default UserState
