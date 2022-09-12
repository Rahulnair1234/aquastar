import React from "react";
import { useRef, useState, useContext } from "react";
import userContext from "../context/user/userContext";
import Moment from "moment";
import { useReactToPrint } from "react-to-print";

const ProfileServiceUnit = (props) => {
  const context1 = useContext(userContext);
  const componentRef = useRef(null);
  const { service } = props;
  const { user } = context1;
  const [serviceinvoice, setServiceInvoice] = useState({
    outsid: "",
    billid: "",
    uname: "",
    mobile: "",
    address: "",

    product_name: "",
    model_no: "",
    company: "",

    price: 0,
    payment_mode: "",
  });
  const handleOrderPrint = async() => {
    console.log("hello");
    let date = service.date.substring(0, 10);
    date = Moment(date).format("DD-MM-YYYY");
    setServiceInvoice({
      outsid: service.outsid,
      billid: service.PaymentInfo[0].ser_pay_id,
      uname: user.name,
      mobile: user.mobile,
      address: service.address,
      date: date,
      product_name: service.product_name,
      model_no: service.model_no,
      company: service.company,
      price: service.service_charge,
      payment_mode: service.PaymentInfo[0].mode,
    });
    await new Promise(r => setTimeout(r, 1000));
    console.log(serviceinvoice);
    handlePrint();
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div className="row">
        <div className="col-sm-6 my-3">
          <h6 className="text-muted f-w-400">
            Service id:&nbsp;{service.outsid}
            <br />
            <br />
            Product:{service.company}&nbsp;
            {service.product_name}-{service.model_no}
            <br />
            <br />
            Amount:{service.service_charge}
          </h6>
        </div>

        <div className="col-sm-6 my-3">
          <h6 className="text-muted f-w-400">{service.status}</h6>
          <br />
          <i class="fa-solid fa-print" onClick={handleOrderPrint}></i>
        </div>
      </div>

      <div
        className="modal fade"
        id="printOrder"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" ref={componentRef}>
            <div className="invoice-box">
              <table cellPadding="0" cellSpacing="0">
                <tr className="top">
                  <td colSpan="2">
                    <table>
                      <tr>
                        <td className="title">
                          <img
                            src="https://res.cloudinary.com/dp14ek0mf/image/upload/v1662721137/heading_bknbfc.jpg"
                            style={{ width: "100%", maxWidth: "300px" }}
                            alt=""
                          />
                        </td>

                        <td>
                          Invoice #:{serviceinvoice.billid}
                          <br />
                          Created: {serviceinvoice.date}
                          <br />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr className="information">
                  <td colSpan="2">
                    <table>
                      <tr>
                        <td>
                          Address:
                          <br />
                          {serviceinvoice.address}
                        </td>
                      </tr>
                      <tr>
                      <td>
                          Name:{serviceinvoice.uname}
                          <br />
                          Contact:{serviceinvoice.mobile}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr className="heading">
                  <td>Payment Method</td>

                  <td>{serviceinvoice.payment_mode}</td>
                </tr>

                <tr className="details">
                  <td>Service ticket Id</td>

                  <td>{serviceinvoice.outsid}</td>
                </tr>

                <tr className="heading">
                  <td>Product Details</td>

                  <td>Price</td>
                </tr>

                <tr className="item">
                  <td>
                    Service for : {serviceinvoice.company}{" "}
                    {serviceinvoice.product_name}
                  </td>

                  <td>&#8377;{serviceinvoice.price}</td>
                </tr>

                <tr className="item">
                  <td> Model No:{serviceinvoice.model_no}</td>
                </tr>

                <tr className="total">
                  <td></td>

                  <td>Total: &#8377;{serviceinvoice.price}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileServiceUnit;
