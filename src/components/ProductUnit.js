import React from "react";

import {useNavigate } from "react-router-dom";
const ProductUnit = (props) => {
  const {product,buyProduct,viewDescription}=props
  let navigate=useNavigate();
  
  
  return (
    <>
      <div className="card bg-c-lite-green" style={{ width: "18rem",height:"35rem" }}>
      
          <img
          src={product.image?product.image:"https://imgs.search.brave.com/GhnKxu70eRuccC2WgWK7I4UfgAni2vJV_MHSCYGntJ4/rs:fit:395:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4w/X0xZNGZtd25ORTNS/MGFrVjVxbW13SGFJ/NCZwaWQ9QXBp"}
          height="350"
          className="card-img-top "
          alt="..."    
          onClick={()=>{viewDescription(product)}}    
        />
       
        <div className="card-body bg-c-lite-green text-white">
          <h5 className="card-title">
            {product.company} {product.product_name} - {product.model_no}
          </h5>
          <p className="card-text">
            <h6>Price: {product.selling_price}</h6>
            <br />
            <h6>{product.quantity===0?"Out of stock contact Store":`${product.quantity} quantity left`}</h6>
          </p>

         
          <button button className="btn bg-c-lite-green text-white "disabled={product.quantity===0} onClick={()=>{
            localStorage.getItem('token')? buyProduct(product):navigate("/prologin") }}>
            Buy
          </button>
        </div>
      </div>

      
    </>
  );
};

export default ProductUnit;
