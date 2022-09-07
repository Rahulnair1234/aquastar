import React from "react";

const SubscriptionUnit = (props) => {
  const { subs } = props;

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
              {subs.UserInfo[0].name}
              <br />
              <br />
              <b>Subscriber Mobile :</b>
              {subs.UserInfo[0].mobile}
              <br />
              <br />
              <b>Subscriber Email: </b>
              {subs.UserInfo[0].email}
              <br />
              <br />
              <b>Subscriber address:</b>
              {subs.address}
              <br />
              <br />
              <b>AMC: </b>
              {subs.subscription_fees} <br />
              <br />
              <b>Product: </b>
              {subs.product_name} <br />
              <br />
              <b>Company: </b>
              {subs.company}<br />
              <br />
              <b>Model No: </b>
              {subs.model_no}<br />
              <br />
              <b>Start date: </b>
              {subs.start_date.substring(0,10)}<br />
              <br />
              <b>Next date: </b>
              {subs.next_date.substring(0,10)}<br />
              <br />
              <b>Service No: </b>
              {subs.service_no===-1?"Subscription not valid":subs.service_no}<br />
              <b>Mode of payment:&#09;</b>
              {subs.PaymentInfo[0]?subs.PaymentInfo[0].mode:"Not Found"}<br />
              <br />
              <b>Payment status:&#09;</b>
              {subs.PaymentInfo[0]?subs.PaymentInfo[0].status:"Subscription cancelled"}<br />
             
              <br />
              <br />
              
             
           
            </h6>
          </h5>
        </div>
      </div>
    </>
  );
};

export default SubscriptionUnit;
