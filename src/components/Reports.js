import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Moment from "moment";
import { useReactToPrint } from "react-to-print";
const Reports = () => {
  const host = "http://localhost:5000";
  const componentRef1 = useRef(null);
  const componentRef2 = useRef(null);
  const [report1, setReport1] = useState({
    total_orders: 0,
    total_services: 0,
    total_subs: 0,
    total_orders_sales: 0,
    total_service_sales: 0,
    total_subs_sales: 0,
  });
  const [report2, setReport2] = useState([]);
  useEffect(() => {
    getReport1Data();
    getReport2Data();
    // eslint-disable-next-line
  }, []);
  let [count, setCount] = useState(0);
  let [subs, setSubs] = useState([]);
  let [daysleft, setDaysLeft] = useState([]);
  let [expiry, setExpiry] = useState([]);
  const handleReport1Print = async () => {
    await new Promise((r) => setTimeout(r, 1000));

    handlePrint1();
  };
  const handleReport2Print = async () => {
    let demo = document.getElementById("demo");
    demo.innerHTML="";
    demo.innerHTML="<tr className=\"heading\"><th>Subid</th><th>Subscriber Name</th><th>Contact NO</th><th>Expiry Date</th><th>No of days left</th></tr>"
            
    for (let index = 0; index < count; index++) {
      demo.innerHTML +=
        
        "<tr >" +
        "<td>" +
        subs[index].subid +
        "</td>" +
        "<td>" +
        subs[index].UserInfo[0].name +
        "</td>" +
        "<td>" +
        subs[index].UserInfo[0].mobile +
        "</td>" +
        "<td>" +
        expiry[index] +
        "</td>" +
        "<td>" +
        daysleft[index] +
        "</td>" +
        "<tr/>";
    }
    /*for (let index = 0; index < count; index++) {
        demo.innerHTML +=
          subs[index].subid +
        "&emsp; &emsp;&emsp; &emsp;"+
          subs[index].UserInfo[0].name +
          "&emsp; &emsp;&emsp; &emsp;"+
          subs[index].UserInfo[0].mobile +
          "&emsp; &emsp;&emsp; &emsp;"+
          expiry[index] +
          "&emsp; &emsp;&emsp; &emsp;"+
          daysleft[index] 
         +"<br/><br/>";
          
        console.log(subs[index].subid);
        console.log(demo.innerHTML);
      }*/
    await new Promise((r) => setTimeout(r, 1000));

    handlePrint2();
  };
  const handlePrint1 = useReactToPrint({
    content: () => componentRef1.current,
  });
  const handlePrint2 = useReactToPrint({
    content: () => componentRef2.current,
  });
  //get all products
  const getReport1Data = async () => {
    //API call
    const response = await fetch(`${host}/api/admin_controls/view_report1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setReport1({
      total_orders: json.orders[0].mycount,
      total_services: json.service[0].mycount,
      total_subs: json.subscription[0].mycount,
      total_orders_sales: json.order_sales[0].sum,
      total_service_sales: json.service_sales[0].sum,
      total_subs_sales: json.subs_sales[0].sum,
    });
    console.log(json);
    console.log(report1);
  };
  const getReport2Data = async () => {
    //API call
    const response = await fetch(`${host}/api/admin_controls/view_report2`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    const subs1 = JSON.parse(JSON.stringify(json.subscription));
    console.log(subs1);
    setReport2(json);
    setCount(json.count[0].mycount);
    setSubs(subs1);
    setDaysLeft(json.days_left);
    setExpiry(json.expiry);
    console.log(expiry[0]);
    console.log(daysleft);
    console.log(report2);
  };
  let i = 0;
  /*  window.onload = function() {
    what();
    function what(){
        document.getElementById('demo').innerHTML="Hello";
        console.log("hello")
    };
}*/

  /**/

  return (
    <>
      <div className="container-fluid my-5" >
        <button style={{marginTop:"100px"}}
          type="button"
          class="btn btn-primary"
          onClick={handleReport1Print}
        >
           Sales Report
        </button>
        <br />
        <br />
        <button
          type="button"
          class="btn btn-primary"
          onClick={handleReport2Print}
        >
           Subscription due Report
        </button>
      </div>
      <div hidden>
        <div ref={componentRef1}>
          <div className="invoice-box2">
            <table cellPadding="0" cellSpacing="0">
              <tr className="top">
                <td colSpan="2">
                  <table>
                    <tr>
                      <td className="title">
                        <img
                          src="https://res.cloudinary.com/dp14ek0mf/image/upload/v1662721137/heading_bknbfc.jpg"
                          style={{ width: "100%", maxWidth: "900px" }}
                          alt=""
                        />
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr className="information">
                <td colSpan="2">
                  <table>
                    <tr>
                      <th>
                        <h1>Overall Sales Report</h1>
                        <br />
                      </th>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr className="heading">
                <td>Type</td>

                <td>NOs</td>

                <td>Sales</td>
              </tr>

              <tr className="details">
                <td>Orders</td>
                <td>{report1.total_orders}</td>
                <td>{report1.total_orders_sales}</td>
              </tr>
              <tr className="details">
                <td>Services</td>
                <td>{report1.total_services}</td>
                <td>{report1.total_service_sales}</td>
              </tr>
              <tr className="details">
                <td>Subscription</td>

                <td>{report1.total_subs}</td>
                <td>{report1.total_subs_sales}</td>
              </tr>
            </table>
            <br />
            <hr />
            The total business from all three sectors of website namely product
            orders purchase,services and Subscription is &#8377;
            {report1.total_orders_sales +
              report1.total_service_sales +
              report1.total_subs_sales}
            . The number of products sold is {report1.total_orders}.The number
            of Services request completed is {report1.total_services}.The number
            of subscription purchased is {report1.total_subs}.
          </div>
        </div>
      </div>

      <div hidden>
        <div ref={componentRef2}>
          <div className="invoice-box3">
            <table cellPadding="0" cellSpacing="0">
              <tr className="top">
                <td colSpan="2">
                  <table>
                    <tr>
                      <td className="title">
                        <img
                          src="https://res.cloudinary.com/dp14ek0mf/image/upload/v1662721137/heading_bknbfc.jpg"
                          style={{ width: "100%", maxWidth: "900px" }}
                          alt=""
                        />
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr className="information">
                <td colSpan="2">
                  <table>
                    <tr>
                      <th>
                        <h1>Subscription Expiry Report</h1>
                        <br />
                      </th>
                    </tr>
                  </table>
                </td>
              </tr>

              </table>
              <table id='demo'  >
              </table>
                
             
           
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
