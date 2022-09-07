import React, { useContext ,useEffect,useRef,useState} from 'react'
import { useNavigate } from "react-router-dom";
import subscriptionContext from '../context/subscription/subscriptionContext';
import InserviceUnit from './InserviceUnit';
const AdminInservice = () => {
    const context=useContext(subscriptionContext);
    const{inservices,getAllInservice,updateInservice}=context;
    const ref = useRef(null);
    const refClose = useRef(null);

    let navigate=useNavigate();
    const inserviceCall=()=>{
        navigate("/adminInservice")
    }
    const outserviceCall=()=>{
      navigate("/admin_services")
    }

    const [editinservices, setEditInservices] = useState({
      id: "",
      estatus: "",
      edescription: "",
    });

    useEffect(() => {
        getAllInservice();
        // eslint-disable-next-line
      }, []);
      
      const handleClick = (e) => {
        console.log("Updating products...");
        e.preventDefault();
        updateInservice(
          editinservices.id,
          editinservices.estatus,
          editinservices.edescription
        );
        refClose.current.click();
      };
      const editInservices = (currentService) => {
        ref.current.click();
        setEditInservices({
          id: currentService.insid,
          estatus: currentService.status,
          edescription: currentService.description,
        });
      };
      const onChange = (e) => {
        setEditInservices({ ...editinservices, [e.target.name]: e.target.value });
      };
  return (
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
                Update Service
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
                  Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="estatus"
                  name="estatus"
                  placeholder="Enter text here"
                  value={editinservices.estatus}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  value={editinservices.edescription}
                  onChange={onChange}
                  placeholder="Enter text here"
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
                disabled={editinservices.estatus.length < 2}
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
   <div>
        <h1
          className="text-center"
          style={{ margin: "40px", marginTop: "50px" }}
        >
          Service Requests
        </h1>

        <div className="container mx-5">
          <center>
        <div
              class="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio1"
                autocomplete="off"
                width ="10px"
                height = "10px"
              />
              <label className="btn bg-c-lite-green  btn-outline-danger "onClick={outserviceCall} style={{width:"200px" }} for="btnradio1">
                Outservice
              </label>

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio2"
                autocomplete="off"
                width ="10px"
                height = "10px"
              />
              <label class="btn bg-c-lite-green  btn-outline-primary"style={{width:"200px" }} onClick={inserviceCall} for="btnradio2">
                Inservice
              </label>

              
            </div>
            </center>
            <div className="row mx -2 my-3">
          
          {inservices.map((inservice) => {
            return (
              <div className="col-md-4 my-3">
                <InserviceUnit
                  key={inservice._id}
                  inservice={inservice}
                   editInservices={editInservices}
                />
              </div>
            );
          })}
            </div>
            </div>
            </div>

   </>
  )
}

export default AdminInservice
