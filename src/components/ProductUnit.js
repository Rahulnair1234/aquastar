import React from "react";
import { useRef } from "react";
import {useNavigate } from "react-router-dom";
const ProductUnit = (props) => {
  const {product,buyProduct}=props
  let navigate=useNavigate();
  const desRef=useRef(null);
  const onClickHandler=(id)=>{
      desRef.current.click();
  }
  return (
    <>
      <div className="card bg-c-lite-green" style={{ width: "18rem",height:"35rem" }}>
      
          <img
          src={product.image?product.image:"https://imgs.search.brave.com/GhnKxu70eRuccC2WgWK7I4UfgAni2vJV_MHSCYGntJ4/rs:fit:395:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4w/X0xZNGZtd25ORTNS/MGFrVjVxbW13SGFJ/NCZwaWQ9QXBp"}
          height="350"
          className="card-img-top "
          alt="..."    
          onClick={()=>{onClickHandler(product.pid)}}     
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

      {/*Modal*/}
   
<button type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={desRef}>
  Launch demo modal
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default ProductUnit;
