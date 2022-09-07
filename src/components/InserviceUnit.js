import React from 'react'

const InserviceUnit = (props) => {
    const{inservice,editInservices}=props;
    const next_date=new Date(inservice.SubscriptionInfo[0].next_date);
  return (
    <>
    <div
      className="card bg-c-lite-green user-profile "
      style={{ width: "25rem" }}
    >
      <div className="card-body">
        <h5 className="card-title card-block  text-white">
          <h4>
            <span className="badge text-bg-light text-danger opacity-75">
              Subscription Details
            </span>
          </h4>

          <h6>
            <br />
            <br />
            <b>Subscriber Name :</b>
            {inservice.UserInfo[0].name}
            <br />
            <br />
            <b>Subscriber Mobile :</b>
            {inservice.UserInfo[0].mobile}
            <br />
            <br />
            <b>Subscriber Email: </b>
            {inservice.UserInfo[0].email}
            <br />
            <br />
            <b>Subscriber address:</b>
            {inservice.SubscriptionInfo[0].address}
            <br />
            <br />
            <b>Product: </b>
            {inservice.SubscriptionInfo[0].product_name} <br />
            <br />
            <b>Company: </b>
            {inservice.SubscriptionInfo[0].company}<br />
            <br />
            <b>Model No: </b>
            {inservice.SubscriptionInfo[0].model_no}<br />
            <br />
            <b>Date of service: </b>
            {inservice.SubscriptionInfo[0].next_date.substring(0,10)}<br />
            <br />
            <b>Status: </b>
            {inservice.status}<br />
            <br />
            <b>Description: </b>
            {inservice.description}<br />
            
            <br />
            <h4><i className={`fa-regular fa-pen-to-square mx-3 fa-${next_date>Date.now()||inservice.status==="Cancelled"?"disabled":"enabled"}`} onClick={()=>{editInservices(inservice)}}></i></h4>
          
            
           
         
          </h6>
        </h5>
      </div>
    </div>
  </>
  )
}

export default InserviceUnit
