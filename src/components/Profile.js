import React from "react";
import {useEffect } from "react";
import { useContext } from "react";
import userContext from "../context/user/userContext";

import ProfileOrderUnit from "./ProfileOrderUnit";
import ProfileServiceUnit from "./ProfileServiceUnit";
import ProfileSubscriptionUnit from "./ProfileSubscriptionUnit";


function Profile() {
  const context1 = useContext(userContext);
  const {
    getUserInfo,
    user,
    myorders,
    myservices,
    mysubscriptions,
    getMyOrders,
    getMyServices,
    getMySubscriptions,
  } = context1;
  useEffect(() => {
    getUserInfo();
    getMyOrders();
    getMyServices();
    getMySubscriptions();
    // eslint-disable-next-line
  }, []);
  
  return (
    <>    
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-12 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          className="img-radius"
                          alt="User-Profile"
                        />
                      </div>
                      <h6 className="f-w-600">{user.name}</h6>
                      <p>{user.privileges ? "Admin" : "User"}</p>
                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h3 className="m-b-20 p-b-5 b-b-default f-w-600">
                        Personal Details
                      </h3>
                      <div className="row">
                        <div className="col-sm-4">
                          <p className="m-b-10 f-w-600">ID</p>
                          <h6 className="text-muted f-w-400">{user.uid}</h6>
                        </div>
                        <div className="col-sm-4">
                          <p className="m-b-10 f-w-600">Email</p>
                          <h6 className="text-muted f-w-400">{user.email}</h6>
                        </div>
                        <div className="col-sm-4">
                          <p className="m-b-10 f-w-600">Phone</p>
                          <h6 className="text-muted f-w-400">{user.mobile}</h6>
                        </div>
                      </div>
                      <h4 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        My Orders
                      </h4>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Item</p>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Progress</p>
                        </div>
                        {myorders ? (
                          myorders.map((order) => {
                            return (
                              <>
                                <ProfileOrderUnit
                                  key={order.oid}
                                  order={order}
                                 
                                />
                              </>
                            );
                          })
                        ) : 
                          <div className="col-sm-6">
                            <h4 className="text f-w-400">
                              No previous records
                            </h4>
                          </div>
                        }
                      </div>
                      <h4 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Service Tickets
                      </h4>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Service</p>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Progress</p>
                        </div>
                        {myservices ? (
                          myservices.map((service) => {
                            return (
                                <>
                                  <ProfileServiceUnit
                                    key={service.outsid}
                                    service={service}
                                   
                                  />
                                </>
                              );
                          })
                        ) : 
                          <div className="col-sm-6">
                            <h6 className="text-muted f-w-400">
                              No Service Request
                            </h6>
                          </div>
                        }
                      </div>
                      <h4 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        My subscriptions
                      </h4>
                      <div className="row">
                        <div className="col-sm-6 my-3">
                          <p className="m-b-10 f-w-600">Subscription</p>
                        </div>
                        <div className="col-sm-6 my-3">
                          <p className="m-b-10 f-w-600">Services Left</p>
                        </div>
                        {mysubscriptions ? (
                          mysubscriptions.map((subs) => {
                            return (
                              <>
                              <ProfileSubscriptionUnit
                                    key={subs.subid}
                                    subs={subs}
                                   
                                  />
                                
                              </>
                            );
                          })
                        ) : 
                          <div className="col-sm-6">
                            <h6 className="text-muted f-w-400">
                              No Subscriptions found
                            </h6>
                          </div>
                        }
                      </div>
                      <ul className="social-link list-unstyled m-t-40 m-b-10">
                        <li>
                          <a
                            href="www.facebook.com"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="facebook"
                            data-abc="true"
                          >
                            <i
                              className="mdi mdi-facebook feather icon-facebook facebook"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="www.twitter.com"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="twitter"
                            data-abc="true"
                          >
                            <i
                              className="mdi mdi-twitter feather icon-twitter twitter"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="www.instagram.com"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title=""
                            data-original-title="instagram"
                            data-abc="true"
                          >
                            <i
                              className="mdi mdi-instagram feather icon-instagram instagram"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
