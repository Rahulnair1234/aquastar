import React from "react";
import { useContext } from "react";
import productContext from "../context/product/productContext";

const About = () => {
  const info = useContext(productContext);
  const { state } = info;
  return (
    <>
      <div className="containerAbout">
        <div className="About1">
          <div className="topProductAbout  ">
            <h2 style={{marginTop:"100px"}}>About Our Founder</h2>
            <p>
              <i>
                Our Shop founded by MR.{state.founded} in the year 2012 . <br />
                He used to work in this background since 2007. <br />
                Gaining all the experience from his previous company .<br />
                Within a short span of 5 years he started his own business now
                known as Anjali Sales
                <br />
                Our Founder is the one who set up everything from designing
                products to manufacturing it .<br />
                We opened a few more branches in Bhayander and Nagpur.
                <br />
                Our manufacturing unit is set up at Nagpur where we have a set
                of experienced engineers working day and night.
                <br />
              </i>
              <br />
              <br />
            </p>
          </div>
          <div className="boostingAbout">
            <h2>Other Branches</h2>
            <p>
              <i>
                Anjali Sales have two more branches excluding
                <br />
                our main branch situated at Virar<br/>
                <br />
                <p>
                  <button
                    class="btn btn-primary1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    1.Bhayander
                  </button>
                </p>
                <div class="collapse" id="collapseExample">
                  <div class="card card-body ">
                   Shop no 21,Satpal Complex,<br/>Near Bhayander West Station.
                  </div>
                </div>

                <p>
                  <button
                    class="btn btn-primary1"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample1"
                    aria-expanded="false"
                    aria-controls="collapseExample1"
                  >
                    2.Nagpur
                  </button>
                </p>
                <div class="collapse" id="collapseExample1">
                  <div class="card card-body ">
                  Shop no 2,Vinayak Complex,<br/>Near Sabzi Market <br/>pin-486002.
                  </div>
                </div>
              </i>
              <br />
            </p>
            
          </div>
          <div className="ourServicesAbout">
            <h2>Our Team</h2>
            <p>
              <i>
                We have a team of 20 well trained professionals 
                <br />
                ranging from 2-3 years of experience for servicing products.
                <br />
                We provide our services as quickly as possible generally within 24 hrs <br/>
                all over Western, Central and Harbour Mumbai and select parts of Maharashtra
                                <br />
              </i>
              <br />
              <br />
            </p>
          </div>
          <div className="ourSubscriptionAbout">
            <h2>Final Words</h2>
            <p>
              <i>
                We are a small group and we are growing everyday.
                <br />
                We look ahead to your feedback and are trying our best to improve our services<br />
                We launch new products yearly with better efficiency from our previous products.<br/>
                Contact Us through our email or phone or in whatsapp to let us know your opinion of our products.
              </i>
              <br />
              <br />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
