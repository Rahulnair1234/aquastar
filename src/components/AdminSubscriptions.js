import React, { useContext,useEffect } from "react";
import subscriptionContext from "../context/subscription/subscriptionContext";
import SubscriptionUnit from "./SubscriptionUnit";

const AdminSubscriptions = () => {
  const context = useContext(subscriptionContext);
  const { subscriptions, setSubscriptions, getAllSubscriptions } = context;
  useEffect(() => {
    getAllSubscriptions();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div>
        <h1
          className="text-center"
          style={{ margin: "40px", marginTop: "50px" }}
        >
          Active Subscriptions
        </h1>
        <div className="container mx-5">
          <div className="row mx -2 my-3">
            {subscriptions.map((subs) => {
              return (
                <div className="col-md-4 my-3">
                  <SubscriptionUnit
                    key={subs._id}
                    subs={subs}
                   // editSubscriptions={editSubscriptions}
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

export default AdminSubscriptions;
