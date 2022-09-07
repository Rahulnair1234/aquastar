import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./components/About";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProductState from "./context/product/ProductsState"; 
import Admin_Services from "./components/Admin_Services";
import Admin_home from "./components/Admin_home";
import Services from "./components/Services";
import ProvisionalLogin from "./components/ProvisionalLogin";
import ProvisionalSignUp from "./components/ProvisionalSignUp";
import ServiceState from "./context/service/ServiceState";
import AdminSubscriptions from "./components/AdminSubscriptions";
import MySubscriptions from "./components/MySubscriptions";
import SubscriptionState from "./context/subscription/SubscriptionState";
import AdminInservice from "./components/AdminInservice";
import AdminOrders from "./components/AdminOrders";
import UserState from "./context/user/UserState";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Homes from "./components/Homes";
function App() {
  
  return (
    <>
      <ProductState>
      <ServiceState>
      <SubscriptionState>
        <UserState>
          <Router>
            <Navbar/>
            <Routes>
             <Route path="/" element={<Homes/>}></Route>
               <Route
                path="/admin_services"
                 // eslint-disable-next-line 
                element={<Admin_Services />}
               
              ></Route>
              <Route
                path="/admin_home"
                 // eslint-disable-next-line 
                element={<Admin_home />}
              ></Route>
              <Route path="/products" element={<Products/>}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/profile" element={<Profile />} />
              <Route path="/services" element={<Services />} />
              <Route path="/login" element={<Login />} />
              <Route path="/prologin" element={<ProvisionalLogin />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/prosignup" element={<ProvisionalSignUp/>} />
              <Route path="/viewSubscriptions"element={<AdminSubscriptions/>}/>
              <Route path="/adminInservice" element={<AdminInservice/>}/>
              <Route path="/admin_orders" element={<AdminOrders/>}/>

            </Routes>
            <Footer/>
          </Router>
          </UserState>
          </SubscriptionState>
          </ServiceState>
      </ProductState>
    </>
  );
}

export default App;
