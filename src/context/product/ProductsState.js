import React from "react";
import productContext from "./productContext";
import { useState } from "react";

const ProductState=(props)=>{
    const host = "http://localhost:5000";
    const state={
        "name":"Anjali Sales and services",
        "founded":"Anup Kumar",
        "developer":"Rahul Nair",
        "address":"Anjali Sales & Services,Near Banjara Hotel,Virar west"
    }
    const initialProducts = [];
  
    const [products, setProducts] = useState(initialProducts);

    const initialOrders= [];
  
    const [orders, setOrders] = useState(initialOrders);
    const [roles,setRoles]=useState({role:false});
    //get all products
    const getAllProducts = async () => {
      //API call
      const response = await fetch(`${host}/api/cust/fetchallproducts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      setProducts(json);
      console.log(products)
    };
   
    //modify product
  const modifyProduct = async (id,model_no,company,quantity,selling_price,description) => {
    //API call
    const response = await fetch(`${host}/api/admin_controls/updateProduct/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ model_no,company,quantity,selling_price,description}),
    });
    const json = await response.json();
    console.log(json);
    const newProduct = JSON.parse(JSON.stringify(products));
    //Frontend
    for (let index = 0; index < newProduct.length; index++) {
      const element = newProduct[index];
      if (element.pid === id) {
        
        newProduct[index].model_no =model_no;
        newProduct[index].company =company;
        newProduct[index].quantity = quantity;
        newProduct[index].selling_price = selling_price;
        newProduct[index].description =description;
        break;
      }
    }
    setProducts(newProduct);
  };
  //add new product
  const addProduct = async (product_name,model_no,company,quantity,selling_price,image,description) => {
    //API call
    const response = await fetch(`${host}/api/admin_controls/addnewproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({product_name,model_no,company,quantity,selling_price,image,description}),
    });

    const product = await response.json();

    setProducts(products.concat(product));
  };
  //delete product
const deleteProduct = async (id) => {
  //API
  const response = await fetch(`${host}/api/admin_controls/deleteProduct/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });
  console.log(response.json);

  const newProduct = products.filter((product) => {
    return product.pid !== id;
  });
  setProducts(newProduct);
};

 //get all orders
 const getAllOrders = async () => {
  //API call
  const response = await fetch(`${host}/api/admin_controls/view_orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    },
  });
  const json = await response.json();
  console.log(json);
  setOrders(json);
  console.log(orders)
};
//update order
const updateOrders = async (id,status) => {
  //API call
  const response = await fetch(`${host}/api/admin_controls/updateOrder/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token'),
    },
    body: JSON.stringify({status}),
  });
  const json = await response.json();
  console.log(json);
  const newOrder = JSON.parse(JSON.stringify(orders));
  //Frontend
  for (let index = 0; index < newOrder.length; index++) {
    const element = newOrder[index];
    if (element.oid === id) {
      newOrder[index].status = status;
      break;
    }
  }
  setOrders(newOrder);
};


    return(
        <productContext.Provider value={{state,products,setProducts,getAllProducts,roles,setRoles,modifyProduct,addProduct,deleteProduct,orders,setOrders,getAllOrders,updateOrders}}>
            {props.children}
        </productContext.Provider>
    );


}
export default ProductState;