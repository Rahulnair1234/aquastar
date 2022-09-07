import React from 'react'

const OrderUnit = (props) => {
    const {order,editOrder}=props
  return (
    <>
    <div
      className="card bg-c-lite-green  user-profile"
      style={{ width: "25rem" }}
    >
      <div className="card-body">
        <h5 className="card-title card-block  text-white">
          <h4>
            <span className="badge text-bg-light text-danger opacity-75">
              Order Details
            </span>
          </h4>

          <h6>
            <br />
            <br />
            <b>Customer Name :</b>
            {order.UserInfo[0].name}
            <br />
            <br />
            <b>Customer Mobile :</b>
            {order.UserInfo[0].mobile}
            <br />
            <br />
            <b>Customer Email: </b>
            {order.UserInfo[0].email}
            <br />
            <br />
            <b>Delivery Address:</b>
            {order.address}
            <br />
            <br />
            <b>Product: </b>
            {order.ProductInfo[0].product_name} <br />
            <br />
            <b>Company: </b>
            {order.ProductInfo[0].company}<br />
            <br />
            <b>Model No: </b>
            {order.ProductInfo[0].model_no}<br />
            <br />
            <b>Price: </b>
            {order.ProductInfo[0].selling_price}<br />
            <br />
            <b>Mode of payment: </b>
            {order.PaymentInfo[0]?order.PaymentInfo[0].mode:"Not Found"}<br />
            <br />
            <br />
            <b>Payment Status: </b>
            {order.PaymentInfo[0]?order.PaymentInfo[0].status:"Cancelled"}<br />
            <br />
            <br />
            <b>Delivery Status: </b>
            {order.PaymentInfo[0]?order.status:"Order cancelled"}<br />
            <br />
            <h4><i className={`fa-regular fa-pen-to-square mx-3 }`}onClick={()=>{editOrder(order)}} ></i></h4>
          
            
           
         
          </h6>
        </h5>
      </div>
    </div>
  </>
  )
}

export default OrderUnit
