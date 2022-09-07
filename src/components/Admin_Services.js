import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceUnit from "./ServiceUnit";
import serviceContext from "../context/service/serviceContext";
const Admin_Services = () => {
  const context = useContext(serviceContext);
  const { services, getAllServices, updateService } = context;
  let navigate=useNavigate();
  useEffect(() => {
    getAllServices();
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [editservices, setEditServices] = useState({
    id: "",
    estatus: "",
    edescription: "",
  });
  const inserviceCall=()=>{
      navigate("/adminInservice")
  }
  const outserviceCall=()=>{
    navigate("/admin_services")
  }
  const handleClick = (e) => {
    console.log("Updating products...");
    e.preventDefault();
    updateService(
      editservices.id,
      editservices.estatus,
      editservices.edescription
    );
    refClose.current.click();
  };
  const editServices = (currentService) => {
    ref.current.click();
    setEditServices({
      id: currentService.outsid,
      estatus: currentService.status,
      edescription: currentService.description,
    });
  };
  const onChange = (e) => {
    setEditServices({ ...editservices, [e.target.name]: e.target.value });
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
                  value={editservices.estatus}
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
                  value={editservices.edescription}
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
                disabled={editservices.estatus.length < 2}
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
                
              
              />
              <label className="btn bg-c-lite-green  btn-outline-primary" onClick={outserviceCall} style={{width:"200px" }} for="btnradio1">
                Outservice
              </label>

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio2"
                autocomplete="off"
               
              />
              <label class="btn bg-c-lite-green  btn-outline-danger"style={{width:"200px" }} onClick={inserviceCall} for="btnradio2">
                Inservice
              </label>

              
            </div>
            </center>
          <div className="row mx -2 my-3">
          
            {services.map((service) => {
              return (
                <div className="col-md-4 my-3">
                  <ServiceUnit
                    key={service._id}
                    service={service}
                    editServices={editServices}
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

export default Admin_Services;
