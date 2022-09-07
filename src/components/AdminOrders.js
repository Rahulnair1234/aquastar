import React, { useContext, useEffect,useRef,useState } from "react";
import productContext from "../context/product/productContext";
import 'react-confirm-alert/src/react-confirm-alert.css';
import OrderUnit from "./OrderUnit";
const AdminOrders = () => {
  const context = useContext(productContext);
  const { orders,  getAllOrders,updateOrders} = context;
  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line
  }, []);
 
  const ref = useRef(null);
  const refClose = useRef(null);
  const [editorders,setEditOrders]=useState({id:"",estatus:""})
  const handleClick=()=>{
    console.log("Updating orders...");    
     
      console.log(editorders)
      updateOrders(editorders.id,editorders.estatus);
      refClose.current.click();    
  }
  const editOrder = (currentProduct) => {
    ref.current.click();
    setEditOrders({id:currentProduct.oid,estatus:currentProduct.status})

  };
  
 const onchange=(e)=>{
   
      var element = document.getElementById("estatus");
      var selectedValue = element.options[element.selectedIndex].value;
      setEditOrders({...editorders,estatus:selectedValue}) 
      console.log(editorders)
  }
  return (
    <><button
    ref={ref}
    type="button"
    className="btn btn-primary d-none"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal1"
  
  >
   
  </button>
  <div
    className="modal fade"
    id="exampleModal1"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModal1Label">
            Update Order Status
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="estatus" className="form-label">
              status
            </label>
            <select class="form-select" id="estatus" onChange={onchange} name="estatus"aria-label="Default select example">
                <option value ="Reviewing" >In Review</option>
                <option value="Dispatched">Dispatched</option>
                <option value="DELIVERED">Delivered</option>
                <option value="Cancelled">Cancelled</option>
            </select>
            
          </div>
          
          
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            ref={refClose}
          >
            Close
          </button>
          <button type="button"  className="btn btn-primary"  onClick={handleClick}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
      <div className="row my-3">
      <h1 className='text-center'style={{margin:"40px" ,marginTop:"50px"}}>Pending Orders</h1>
        <div className="container mx-5" >
          <div className="row mx-2 my-3">
            {orders.map((order) => {
              return (
                <div className="col-md-4 my-3">
                 <OrderUnit
                    key={order._id}
                    editOrder={editOrder}
                    order={order}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
