import React from "react";
import { useRef, useState, useContext } from "react";
import userContext from "../context/user/userContext";
import Moment from "moment";
import { useReactToPrint } from 'react-to-print';

const ProfileSubscriptionUnit = (props) => {
    const context1 = useContext(userContext);
    const componentRef = useRef(null);
    const { subs } = props;
    const { user } = context1;
    const [subscriptioninvoice, setSubscriptionInvoice] = useState({
      subid: "",
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
    const handleSubscriptionPrint =async () => {
      console.log("hello");
      let date = subs.start_date.substring(0, 10);
      date = Moment(date).format("DD-MM-YYYY");
      setSubscriptionInvoice({
        subid: subs.subid,
        billid: subs.PaymentInfo[0].sub_pay_id,
        uname: user.name,
        mobile: user.mobile,
        address: subs.address,
        date: date,
        product_name: subs.product_name,
        model_no: subs.model_no,
        company: subs.company,
        price: subs.subscription_fees,
        payment_mode: subs.PaymentInfo[0].mode,
      });
      await new Promise(r => setTimeout(r, 1000));
      console.log(subscriptioninvoice);
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
                                    subscription id:&nbsp;{subs.subid}
                                    <br />
                                    <br />
                                    Product:{subs.company} &nbsp;
                                    {subs.product_name}-{subs.model_no}
                                    <br />
                                    <br />
                                    Start date:
                                    {subs.start_date.substring(0, 10)}
                                    <br />
                                    <br />
                                    Next service:
                                    {subs.next_date.substring(0, 10)}
                                    <br />
                                    <br />
                                    AMC:{subs.subscription_fees}
                                  </h6>
                                </div>

                                <div className="col-sm-6">
                                  <h6 className="text-muted f-w-400">
                                    {" "}
                                    {`${
                                      (subs.service_no === 1
                                        ? "Subscription Cancelled"
                                        : "Services left ",
                                      3 - subs.service_no)
                                    }`}
                                  </h6>
                                  <br />
                                  <i className="fa-solid fa-print" onClick={handleSubscriptionPrint}></i>
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
                            Invoice #:{subscriptioninvoice.billid}
                            <br />
                            Created: {subscriptioninvoice.date}
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
                            {subscriptioninvoice.address}
                          </td>
                        </tr>
                        <tr>
                        <td>
                            Name:{subscriptioninvoice.uname}
                            <br />
                            Contact:{subscriptioninvoice.mobile}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
  
                  <tr className="heading">
                    <td>Payment Method</td>
  
                    <td>{subscriptioninvoice.payment_mode}</td>
                  </tr>
  
                  <tr className="details">
                    <td>Subscription Id</td>
  
                    <td>{subscriptioninvoice.subid}</td>
                  </tr>
  
                  <tr className="heading">
                    <td>Product Details</td>
  
                    <td>Price</td>
                  </tr>
  
                  <tr className="item">
                    <td>
                      Subscription for  : {subscriptioninvoice.company} {subscriptioninvoice.product_name}
                    </td>
  
                    <td>&#8377;{subscriptioninvoice.price}</td>
                  </tr>
  
                  <tr className="item">
                    <td> Model No:{subscriptioninvoice.model_no}</td>
                  </tr>
  
                  <tr className="total">
                    <td></td>
  
                    <td>Total: &#8377;{subscriptioninvoice.price}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };


export default ProfileSubscriptionUnit
