import React, { useContext, useEffect, useRef, useState } from "react";
import ProductUnit from "./ProductUnit";
import productContext from "../context/product/productContext";
import AdminProductUnit from "./AdminProductUnit";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import userContext from "../context/user/userContext";

const Product = () => {
  const context = useContext(productContext);
  const context1 = useContext(userContext);
  const { products, getAllProducts, roles, modifyProduct, deleteProduct } =
    context;
  const { purchaseProduct, getUserInfo, user, userorder, makeOrderPayment } =
    context1;
  const ref = useRef(null);
  const refClose = useRef(null);
  const refBuy = useRef(null);
  const [editproducts, setEditProducts] = useState({
    id: "",
    emodel_no: "",
    ecompany: "",
    equantity: 0,
    eselling_price: 0,
    edescription:""
  });

  const [mode, setMode] = useState({ modes: "cod" });
  const [buyproducts, setBuyProducts] = useState({
    pid: "",
    address: "",
    product_name: "",
    model_no: "",
    company: "",
    selling_price: 0,
  });

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, [userorder]);
  const handleClick = (e) => {
    console.log("Updating products...");
    e.preventDefault();
    modifyProduct(
      editproducts.id,
      editproducts.emodel_no,
      editproducts.ecompany,
      editproducts.equantity,
      editproducts.eselling_price,
      editproducts.edescription
    );
    refClose.current.click();
  };
  const editProduct = (currentProduct) => {
    ref.current.click();
    setEditProducts({
      id: currentProduct.pid,
      emodel_no: currentProduct.model_no,
      ecompany: currentProduct.company,
      equantity: currentProduct.quantity,
      eselling_price: currentProduct.selling_price,
      edescription:currentProduct.description
    });
  };
  const removeProduct = (pid) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteProduct(pid);
            alert("Product deleted",pid);
          },
        },
        {
          label: "No",
          onClick: () => {
            alert("Product not deleted");
          },
        },
      ],
    });
  };
  const onChange = (e) => {
    setEditProducts({ ...editproducts, [e.target.name]: e.target.value });
  };
  const buyProduct = (currentProduct) => {
    refBuy.current.click();
    getUserInfo();
    setBuyProducts({
      pid: currentProduct.pid,
      address: "",
      product_name: currentProduct.product_name,
      company: currentProduct.company,
      model_no: currentProduct.model_no,
      selling_price: currentProduct.selling_price,
    });
  };
  const makeOrder = (e) => {
    console.log("created order...");
    e.preventDefault();
    

    // displayRazorpay();
    refClose.current.click();
  };
  const onChange1 = (e) => {
    setBuyProducts({ ...buyproducts, [e.target.name]: e.target.value });
  };
  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    let options = {
      key: process.env.REACT_APP_RAZORPAY_APIKEY, // Enter the Key ID generated from the Dashboard
      amount: buyproducts.selling_price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Anjali Sales and services",
      description: "Test Transaction for product purchase",
      image:
        "https://imgs.search.brave.com/cigCAgaCM43NRlpvKjL3rGqPofxHXl-mC4_7x0li3Zc/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9sb2dv/c2FuZHR5cGVzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MC8xMi9BY3Jpc3Vy/ZS5wbmc",
      order_id: userorder.oid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {},
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.mobile,
       
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const makeBill = (oid, mode) => {
    makeOrderPayment(oid, mode);
  };
  const doPayment = () => {
    if (mode.modes === "cod") {
      purchaseProduct(buyproducts.pid, buyproducts.address);
      alert("Cash on delivery");
      console.log(userorder);
      makeBill(userorder["savedOrder"].oid, mode.modes);
    } else if (mode.modes === "online") {
      purchaseProduct(buyproducts.pid, buyproducts.address);
      alert("online payment");
      makeBill(userorder["savedOrder"].oid, mode.modes);
      displayRazorpay();
    }
  };

  const onchange2 = () => {
    var element = document.getElementById("mode");
    var selectedValue = element.options[element.selectedIndex].value;
    setMode({ modes: selectedValue });
    console.log(mode);
  };
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  return (
    //modal for edit product
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
      ></button>
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
                Update Product
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
                <label htmlFor="emodel_no" className="form-label">
                  Model No
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="emodel_no"
                  name="emodel_no"
                  value={editproducts.emodel_no}
                  onChange={onChange}
                  placeholder="Enter text here"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ecompany" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ecompany"
                  name="ecompany"
                  value={editproducts.ecompany}
                  onChange={onChange}
                  placeholder="Enter text here"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="equantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="equantity"
                  name="equantity"
                  value={editproducts.equantity}
                  onChange={onChange}
                  placeholder="Enter number here"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="eselling_price" className="form-label">
                  Selling Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="eselling_price"
                  name="eselling_price"
                  value={editproducts.eselling_price}
                  onChange={onChange}
                  placeholder="Enter number here"
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Description
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  placeholder="Enter text here"
                  value={editproducts.edescription}
                  onChange={onChange}
                  rows={4}
                  cols={20}
                />
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
              <button
                type="button"
                data-bs-dismiss="modal"
                ref={refClose}
                disabled={
                  editproducts.emodel_no.length < 5 ||
                  editproducts.ecompany.length < 2
                }
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Buy product modal*/}
      <button
        ref={refBuy}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#BuyProduct"
      ></button>
      <div
        className="modal fade"
        id="BuyProduct"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModal1Label">
                Delivery Details
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
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="Enter text here"
                  value={buyproducts.address}
                  onChange={onChange1}
                  required
                  
                />
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
              <button
                className="btn btn-primary"
                data-bs-target="#exampleModalToggle2"
                disabled={buyproducts.address.length < 10}
                data-bs-toggle="modal"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*Review page*/}
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                Review your order
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
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <label
                  type="text"
                  className="form-control"
                  value={user.name}
                  // onChange={onChange}
                >
                  {user.name}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="Mobile" className="form-label">
                  Mobile:
                </label>
                <label
                  type="text"
                  className="form-control"
                  value={user.mobile}
                  // onChange={onChange}
                >
                  {user.mobile}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="address1" className="form-label">
                  address:
                </label>
                <label
                  type="text"
                  className="form-control"
                  value={buyproducts.address}
                  // onChange={onChange}
                >
                  {buyproducts.address}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="product_name" className="form-label">
                  Product Name:
                </label>
                <label
                  type="text"
                  className="form-control"
                  value={buyproducts.product_name}
                  // onChange={onChange}
                >
                  {buyproducts.product_name}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="model_no" className="form-label">
                  Model No:
                </label>
                <label
                  type="text"
                  className="form-control"
                  value={buyproducts.model_no}
                  // onChange={onChange}
                >
                  {buyproducts.model_no}
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="company" className="form-label">
                  Company:
                </label>
                <label
                  type="text"
                  className="form-control"
                  value={buyproducts.company}
                  // onChange={onChange}
                >
                  {buyproducts.company}
                </label>
              </div>

              <div className="mb-3">
                <label htmlFor="selling_price" className="form-label">
                  Price
                </label>
                <label
                  type="text"
                  className="form-control"

                  // onChange={onChange}
                >
                  <span>&#8377;</span>
                  {buyproducts.selling_price}
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-target="#BuyProduct"
                data-bs-toggle="modal"
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={makeOrder}
                data-bs-toggle="modal"
                data-bs-target="#exampleModalToggle3"
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*payment method */}
      <div className="modal" id="exampleModalToggle3" tabindex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Mode of payment</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="mode" className="form-label">
                Mode :
              </label>
              <select
                class="form-select"
                id="mode"
                onChange={onchange2}
                name="mode"
                aria-label="Default select example"
              >
                <option value="cod">Cash on delivery</option>
                <option value="online">Credit/Debit/Upi</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={doPayment}
                data-bs-dismiss="modal"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1
          className="text-center"
          style={{ margin: "40px", marginTop: "50px" }}
        >
          All Products
        </h1>
        <div className="container mx-5">
          <div className="row mx -2 my-3">
            {products.map((product) => {
              return (
                <div className="col-md-3 my-3">
                  {!roles.role ? (
                    <ProductUnit
                      key={product.pid}
                      buyProduct={buyProduct}
                      product={product}
                    />
                  ) : (
                    <AdminProductUnit
                      key={product.pid}
                      removeProduct={removeProduct}
                      editProduct={editProduct}
                      product={product}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
