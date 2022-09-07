import React from "react";

const ServiceUnit = (props) => {
  const { service, editServices } = props;
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
                Product details
              </span>
            </h4>

            <h6>
              <br />
              <br />
              <b>Product:</b>
              {service.product_name}
              <br />
              <br /> <b>Company: </b>
              {service.company}
              <br />
              <br /> <b>Model No: </b>
              {service.model_no}
              <br />
              <br />
              <b>service charge: </b>
              {service.service_charge} <br />
              <br />
              <b>Service Status: </b>
              {service.status}
              <br />
              <br />
              <b>Description: </b>
              {service.description}
              <br />
              <br />
            </h6>
          </h5>
          <p className="card-text card-block  text-white ">
            <h4>
              {" "}
              <span className="badge text-bg-light text-danger opacity-75 ">
                Contact details
              </span>
            </h4>
            <br />
            <h6>
              <b>Customer Name:&#09;</b>
              {service.UserInfo[0].name}
              <br />
              <br />
              <b>Email Id:&#09;</b>
              {service.UserInfo[0].email}
              <br />
              <br />
              <b>Mobile No:&#09;</b>
              {service.UserInfo[0].mobile}
              <br />
              <br /> <b>Address:&#09;</b>
              {service.address} <br />
              <br />
              <b>Mode of payment:&#09;</b>
              {service.PaymentInfo[0]?service.PaymentInfo[0].mode:"Not Done"}<br/>
              <br />
              <b>Payment status:&#09;</b>
              {service.PaymentInfo[0]?service.PaymentInfo[0].status:"service Cancelled"}
              <br />
              <br />
            </h6>
            <br />
            <h4>
              <i
                class="fa-regular fa-pen-to-square mx-3"
                onClick={() => {
                  editServices(service);
                }}
              ></i>
            </h4>
          </p>
        </div>
      </div>
    </>
  );
};

export default ServiceUnit;
