import React ,{useContext,useRef,useState}from 'react'
import Axios  from "axios";
import productContext from '../context/product/productContext';
import AddLayout from './AddLayout';
import Spinner from './Spinner';
const AddProduct = () => {
    const ref = useRef(null);
    const refClose = useRef(null);
    const context=useContext(productContext);
    let urls="";
    // eslint-disable-next-line
   const{addProduct}=context;
   const [imageselected,setImageSelected]=useState("");
 
   const [addproducts,setAddProducts]=useState({product_name:"",model_no:"", company:"",quantity:0,selling_price:0,description:""})
   const [loading ,setLoading]=useState(false);
    const handleAddproduct=async(e)=>{
        console.log("New product added");
        e.preventDefault();
        uploadImage();
        setLoading(true);
        await new Promise(r => setTimeout(r, 5000));
        setLoading(false);
        console.log(urls);
        console.log(addproducts)
        addProduct(addproducts.product_name,addproducts.model_no,addproducts.company,addproducts.quantity,addproducts.selling_price,urls,addproducts.description);
     
         setAddProducts({product_name:"",model_no:"", company:"",quantity:0,selling_price:0,description:""})
       
        refClose.current.click();
    }
    const  uploadImage=()=>{
      const formData=new FormData();
      formData.append("file",imageselected);
      formData.append("upload_preset","anjalisales");

      Axios.post("https://api.cloudinary.com/v1_1/dp14ek0mf/image/upload",
      formData
      ).then((response)=>{
        urls=response.data.url;
        console.log(response);
      });

    }
    const onChange=(e)=>{
        setAddProducts({...addproducts,[e.target.name]:e.target.value})
    }

    const onchange2=(e)=>{
    var element = document.getElementById("product_name");
    var selectedValue = element.options[element.selectedIndex].value;
    setAddProducts({...addproducts,product_name:selectedValue})
  }
    const insertProduct = () => {
        ref.current.click();
       
      };
   
  return (
    <>
    {/*modal for adding product*/ }
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      
      >
       
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {loading&&<Spinner/>}
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Product
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
          <label htmlFor="product_name" className="label">Product Name</label>
          <select className="form-select input" id="product_name" onChange={onchange2} name="product_name"aria-label="Default select example">
          <option className="text-black" value ="no_data" >select a product</option>
                <option className="text-black" value ="water purifier" >Water purifier</option>
                <option  className="text-black"value="chakki">Chakki (Mill)</option>
                <option  className="text-black"value="chimney">Chimney</option>
            </select>
        </div>
              
              <div className="mb-3">
                <label htmlFor="model_no" className="form-label">
                  Model No
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="model_no"
                  name="model_no"
                  value={addproducts.model_no}
                  onChange={onChange}
                  placeholder="Enter text here"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  name="company"
                  value={addproducts.company}
                  onChange={onChange}
                  placeholder="Enter text here"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  value={addproducts.quantity}
                  onChange={onChange}
                  placeholder="Enter number here"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="selling_price" className="form-label">
                  Selling Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="selling_price"
                  name="selling_price"
                  value={addproducts.selling_price}
                  onChange={onChange}
                  placeholder="Enter number here"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea  
                id="description"
                name="description"
                value={addproducts.description}
                onChange={onChange} 
                placeholder="Enter Description here" 
                rows={4} cols={55}>
                </textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  accept="image/png,image/jpeg"
                  placeholder="select image file"
                 // value={addProducts.product_name}
                  onChange={(e1)=>{
                    setImageSelected(e1.target.files[0]);
                    console.log(imageselected);
                  }}
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
              <button type="button" disabled={addproducts.model_no.length<5||addproducts.company.length<2} className="btn btn-primary"  onClick={handleAddproduct}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

        <div className="row my-3">
              <AddLayout insertProduct={insertProduct}  />
          
        </div>
    
    </>
  )
}

export default AddProduct
