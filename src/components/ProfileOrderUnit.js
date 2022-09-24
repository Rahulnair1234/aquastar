import React from "react";
import { useRef, useState, useContext } from "react";
import userContext from "../context/user/userContext";
import Moment from "moment";
import { useReactToPrint } from "react-to-print";
const ProfileOrderUnit = (props) => {
  const context1 = useContext(userContext);
  const componentRef = useRef(null);
  const { order } = props;
  const { user } = context1;
  const [orderinvoice, setOrderInvoice] = useState({
    oid: "",
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
  const handleOrderPrint = async () => {
    console.log("hello");
    setOrderInvoice({
      oid: order.oid,
      billid: order.PaymentInfo[0].o_pay_id,
      uname: user.name,
      mobile: user.mobile,
      address: order.address,
      product_name: order.ProductInfo[0].product_name,
      model_no: order.ProductInfo[0].model_no,
      company: order.ProductInfo[0].company,
      price: order.ProductInfo[0].selling_price,
      payment_mode: order.PaymentInfo[0].mode,
    });
    await new Promise((r) => setTimeout(r, 1000));
    console.log(orderinvoice);
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
            order id:&nbsp;{order.oid}
            <br />
            <br />
            Product:{order.ProductInfo[0].company}&nbsp;
            {order.ProductInfo[0].product_name}-{order.ProductInfo[0].model_no}
            <br />
            <br />
            Amount:{order.ProductInfo[0].selling_price}
          </h6>
        </div>

        <div className="col-sm-6 my-3">
          <h6 className="text-muted f-w-400">{order.status}</h6>
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
                          Invoice #:{orderinvoice.billid}
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
                          Delivery Address:
                          <br />
                          {orderinvoice.address}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Name:{orderinvoice.uname}
                          <br />
                          Contact:{orderinvoice.mobile}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr className="heading">
                  <td>Payment Method</td>

                  <td>{orderinvoice.payment_mode}</td>
                </tr>

                <tr className="details">
                  <td>Order Id</td>

                  <td>{orderinvoice.oid}</td>
                </tr>

                <tr className="heading">
                  <td>Item</td>

                  <td>Price</td>
                </tr>

                <tr className="item">
                  <td>
                    product : {orderinvoice.company} {orderinvoice.product_name}
                  </td>

                  <td>&#8377;{orderinvoice.price}</td>
                </tr>

                <tr className="item">
                  <td> Model No:{orderinvoice.model_no}</td>
                </tr>

                <tr className="total">
                  <td></td>

                  <td>Total: &#8377;{orderinvoice.price}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileOrderUnit;
