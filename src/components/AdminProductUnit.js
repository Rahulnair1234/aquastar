import React ,{useContext}from "react";

const AdminProductUnit = (props) => {

    const {product,editProduct,removeProduct}=props
  return (
    <>
      <div className="card" style={{ width: "18rem",height:"35rem"}}>
        <img
          src={product.image?product.image:"https://imgs.search.brave.com/GhnKxu70eRuccC2WgWK7I4UfgAni2vJV_MHSCYGntJ4/rs:fit:395:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4w/X0xZNGZtd25ORTNS/MGFrVjVxbW13SGFJ/NCZwaWQ9QXBp"}
          className="card-img-top"
          height="350"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">
            {product.company} {product.product_name} - {product.model_no}
          </h5>
          <p className="card-text">
            <h6>Price: {product.selling_price}</h6>
            <br />
            <h6>{product.quantity} quantity left</h6>
          </p>
          <i class="fa-regular fa-pen-to-square mx-3" onClick={()=>{editProduct(product)}}></i>
          <i class="fa-regular fa-trash-can mx-2"onClick={()=>{removeProduct(product.pid)}}></i>
        </div>
      </div>
    </>
  );
};

export default AdminProductUnit;
