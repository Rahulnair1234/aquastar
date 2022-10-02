import React from 'react'
import { useRef,useState } from 'react'
import { useContext } from 'react'
import userContext from '../context/user/userContext'

const Services = () => {
  const refService=useRef(null);
  const refSubs=useRef(null);


  const refClose = useRef(null);
  const context1=useContext(userContext)
  const[outservice,setOutservice]=useState({sproduct_name:"water purifier",smodel_no:"",scompany:"",saddress:"",scharge:0})
  const [subs,setSubs]=useState({subproduct_name:"water purifier",submodel_no:"",subcompany:"",subaddress:"",subcharge:0})
  const [mode, setMode] = useState({ modes: "cod" });
  const{userservice,usersubscription,purchaseService,purchaseSubscription,getUserInfo,user,makeSubscriptionPayment,makeOutservicerPayment}=context1;
  const onchange=(e)=>{
    setOutservice({ ...outservice, [e.target.name]: e.target.value });
  }
  const onchange3=(e)=>{//subscription 
    setSubs({ ...subs, [e.target.name]: e.target.value });
  }

  const createOutservice=()=>{
     purchaseService(outservice.sproduct_name,outservice.smodel_no,outservice.scompany,outservice.saddress,outservice.scharge);
   
    }
  const createSubscription=()=>{
    purchaseSubscription(subs.subproduct_name,subs.submodel_no,subs.subcompany,subs.subaddress,subs.subcharge);
    }
  const onclickhandler=()=>{
    getUserInfo();
    if(outservice.sproduct_name==="water purifier"){
        setOutservice({...outservice,scharge:550})
    }
    else if(outservice.sproduct_name==="chimney"){
      setOutservice({...outservice,scharge:500})
    }
    else if(outservice.sproduct_name==="chakki"){
      setOutservice({...outservice,scharge:450})
    }
    refService.current.click();
  }
  const onclickhandler2=()=>{//subscription
    getUserInfo();
    if(subs.subproduct_name==="water purifier"){
        setSubs({...subs,subcharge:1500})
    }
    else if(subs.subproduct_name==="chimney"){
      setSubs({...subs,subcharge:1800})
    }
    else if(subs.subproduct_name==="chakki"){
      setSubs({...subs,subcharge:1200})
    }
    refSubs.current.click();
  }
  const onchange2 = () => {
    var element = document.getElementById("mode");
    var selectedValue = element.options[element.selectedIndex].value;
    setMode({ modes: selectedValue });
    console.log(mode);
  };
  const onchange4 = () => {
    var element = document.getElementById("mode2");
    var selectedValue = element.options[element.selectedIndex].value;
    setMode({ modes: selectedValue });
    console.log(mode);
  };
 
    const displayRazorpay = async (amount,description,id,name,email,mobile) => {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
  
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      let options = {
        key: process.env.REACT_APP_RAZORPAY_APIKEY, // Enter the Key ID generated from the Dashboard
        amount: amount* 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Anjali Sales and services",
        description: description,
        image:
          "https://imgs.search.brave.com/cigCAgaCM43NRlpvKjL3rGqPofxHXl-mC4_7x0li3Zc/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9sb2dv/c2FuZHR5cGVzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MC8xMi9BY3Jpc3Vy/ZS5wbmc",
        order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {},
        prefill: {
          name: name,
          email: email,
          contact: mobile,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var paymentObject = new window.Razorpay(options);
      paymentObject.open();
    };
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };
    const onSubmiter=(e)=>{
      e.preventDefault();
      onclickhandler();
    }
    const onSubmiter2=(e)=>{
      e.preventDefault();
      onclickhandler2();
    }
    const doOutservicePayment=()=>{
      if (mode.modes === "cod") {
        makeOutservicerPayment(userservice["savedOutservice"].outsid, mode.modes);
        setOutservice({sproduct_name:"",smodel_no:"",scompany:"",saddress:"",scharge:0});

      }
      else{
        makeOutservicerPayment(userservice["savedOutservice"].outsid, mode.modes);
        displayRazorpay(outservice.scharge,"Test Transaction for Servicing module",userservice._id,user.name,user.email,user.mobile);
        setOutservice({sproduct_name:"",smodel_no:"",scompany:"",saddress:"",scharge:0});
      }
  } 
  const doSubscriptionPayment=()=>{
    if (mode.modes === "cod") {
   
      makeSubscriptionPayment(usersubscription["savedSubscription"].subid, mode.modes);
      setSubs({subproduct_name:"",submodel_no:"",subcompany:"",subaddress:"",subcharge:0})
    } else if (mode.modes === "online") {
      makeSubscriptionPayment(usersubscription["savedSubscription"].subid, mode.modes);
      displayRazorpay(subs.subcharge,"Test Transaction for Subscription module",usersubscription.subid,user.name,user.email,user.mobile);
      setSubs({subproduct_name:"",submodel_no:"",subcompany:"",subaddress:"",subcharge:0})

    }
} 
  return (
    <>
    {/**modal for service request review */}
    <button
        ref={refService}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalToggle1"
      ></button>
    <div
        className="modal fade"
        id="exampleModalToggle1"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel1"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel1">
                Review your service
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <label
                  type="text"
                  className="form-control"
                  value={user.name}
                  // onChange={onChange}
                >
                  {user.name}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="Mobile" className="form-label">
                  Mobile:
                </label>
                <label
                  type="text"
                  className="form-control"
                  value={user.mobile}
                  // onChange={onChange}
                >
                  {user.mobile}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="saddress" className="form-label">
                  address:
                </label>
                <label
                  type="text"
                  className="form-control"
                
                  // onChange={onChange}
                >
                  {outservice.saddress}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="product_name" className="form-label">
                  Product Name:
                </label>
                <label
                  type="text"
                  className="form-control"
                  value={outservice.sproduct_name}
                  // onChange={onChange}
                >
                  {outservice.sproduct_name}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="model_no" className="form-label">
                  Model No:
                </label>
                <label
                  type="text"
                  className="form-control"
                 
                  // onChange={onChange}
                >
                  {outservice.smodel_no}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="company" className="form-label">
                  Company:
                </label>
                <label
                  type="text"
                  className="form-control"
               
                  // onChange={onChange}
                >
                  {outservice.scompany}
                </label>
              </div>

              <div className="mb-3">
                <label htmlFor="selling_price" className="form-label">
                  service charge
                </label>
                <label
                  type="text"
                  className="form-control"

                  // onChange={onChange}
                >
                  <span>&#8377;</span>
                  {outservice.scharge} + extra any parts replacement
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={createOutservice}
                data-bs-toggle="modal"
                data-bs-target="#exampleModalToggle2"
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>
      {/** payment mode modal*/}
      <div className="modal" id="exampleModalToggle2" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Mode of payment</h5>
             
            </div>
            <div className="modal-body">
              <label htmlFor="mode" className="form-label">
                Mode :
              </label>
              <select
                className="form-select"
                id="mode"
                onChange={onchange2}
                name="mode"
                aria-label="Default select example"
              >
                <option value="cod">Cash on delivery</option>
                <option value="online">Credit/Debit/Upi</option>
              </select>
            </div>
            <div className="modal-footer">
              
              <button
                type="button"
                className="btn btn-primary"
                onClick={doOutservicePayment}
                data-bs-dismiss="modal"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>

{/**modal for subscription request review */}
<button
        ref={refSubs}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalToggle33"
      ></button>
    <div
        className="modal fade"
        id="exampleModalToggle33"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel33"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel1">
                Review your subscription details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name1" className="form-label">
                  Name:
                </label>
                <label
                  type="text"
                  className="form-control"
                  value={user.name}
                  // onChange={onChange}
                >
                  {user.name}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="Mobile1" className="form-label">
                  Mobile:
                </label>
                <label
                  type="text"
                  className="form-control"
                  value={user.mobile}
                  // onChange={onChange}
                >
                  {user.mobile}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="subaddress" className="form-label">
                  address:
                </label>
                <label
                  type="text"
                  className="form-control"
                
                  // onChange={onChange}
                >
                  {subs.subaddress}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="subproduct_name" className="form-label">
                  Product Name:
                </label>
                <label
                  type="text"
                  className="form-control"
                  value={subs.subproduct_name}
                  // onChange={onChange}
                >
                  {subs.subproduct_name}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="submodel_no" className="form-label">
                  Model No:
                </label>
                <label
                  type="text"
                  className="form-control"
                 
                  // onChange={onChange}
                >
                  {subs.submodel_no}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="subcompany" className="form-label">
                  Company:
                </label>
                <label
                  type="text"
                  className="form-control"
               
                  // onChange={onChange}
                >
                  {subs.subcompany}
                </label>
              </div>

              <div className="mb-3">
                <label htmlFor="selling_price" className="form-label">
                  service charge
                </label>
                <label
                  type="text"
                  className="form-control"

                  // onChange={onChange}
                >
                  <span>&#8377;</span>
                  {subs.subcharge} ( inclusive of all extra charges)
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={createSubscription}
                data-bs-toggle="modal"
                data-bs-target="#exampleModalToggle22"
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>
      {/** payment mode modal*/}
      <div className="modal" id="exampleModalToggle22" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Mode of payment</h5>
            
            </div>
            <div className="modal-body">
              <label htmlFor="submode" className="form-label">
                Mode :
              </label>
              <select
                className="form-select"
                id="mode2"
                onChange={onchange4}
                name="mode2"
                aria-label="Default select example"
              >
                <option value="cod">Cash on delivery</option>
                <option value="online">Credit/Debit/Upi</option>
              </select>
            </div>
            <div className="modal-footer">
              
              <button
                type="button"
                className="btn btn-primary"
                onClick={doSubscriptionPayment}
                data-bs-dismiss="modal"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="login-wrap my-5">
  <div className="login-html " >
    <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked/><label htmlFor="tab-1"  className="tab"> Service</label>
    <input id="tab-2" type="radio" name="tab" className="sign-up" /><label htmlFor="tab-2" className="tab">subscription</label>
    <div className="login-form">
      <form onSubmit={onSubmiter}>
      <div className="sign-in-htm">
        <div className="group">
          <label htmlFor="sproduct_name" className="label">Product Name</label>
          <select className="form-select input" id="sproduct_name" onChange={onchange} name="sproduct_name"aria-label="Default select example">
                <option className="text-black" value ="water purifier" >Water purifier</option>
                <option  className="text-black"value="chakki">Chakki (Mill)</option>
                <option  className="text-black"value="chimney">Chimney</option>
            </select>
        </div>
        <div className="group">
          <label htmlFor="smodel_no" className="label">Model No</label>
          <input id="smodel_no" name="smodel_no" value={outservice.smodel_no}  required minLength={5}onChange={onchange} type="text" className="input" />
        </div>
        <div className="group">
          <label htmlFor="scompany" className="label">Company</label>
          <input id="scompany" name="scompany"type="text" onChange={onchange}  required value={outservice.scompany}  className="input" />
        </div>
        <div className="group">
          <label htmlFor="saddress" className="label">Address</label>
          <textarea id="saddress"name="saddress" rows={4} type="text"  onChange={onchange} required minLength={5} maxLength={150} value={outservice.saddress} className="input" ></textarea>
        </div>
        
        <div className="group">
          <input type="submit" className="button"  value="Create Service Request"/>
        </div>
        <div className="hr"></div>
      </div>
      </form>
{/**Subscription form */}
      <div className="sign-up-htm">
        <form onSubmit={onSubmiter2}>
        <div className="group">
          <label htmlFor="subproduct_name" className="label">Product Name</label>
          <select className="form-select input" id="subproduct_name" onChange={onchange3} name="subproduct_name"aria-label="Default select example">
                <option className="text-black" value ="water purifier" >Water purifier</option>
                <option  className="text-black"value="chakki">Chakki (Mill)</option>
                <option  className="text-black"value="chimney">Chimney</option>
            </select>
        </div>
        <div className="group">
          <label htmlFor="submodel_no" className="label">Model No</label>
          <input id="submodel_no"name='submodel_no' value={subs.submodel_no} required minLength={5}  onChange={onchange3}type="text" className="input" />
        </div>
        <div className="group">
          <label htmlFor="subcompany" className="label">Company</label>
          <input id="subcompany"name='subcompany' value={subs.subcompany} type="text" required onChange={onchange3}className="input" />
        </div>
        <div className="group">
          <label htmlFor="subaddress" className="label">Address</label>
          <textarea id="subaddress"name='subaddress' value={subs.subaddress} required minLength={5} maxLength={150} onChange={onchange3} rows={4} type="text" className="input" ></textarea>
        </div>
        
        <div className="group">
          <input type="submit" className="button"  value="Create subscription Request"/>
        </div>
        <div className="hr"></div>
        </form>
      </div>
      
    </div>
  </div>
</div>
    </>
  )
}

export default Services
