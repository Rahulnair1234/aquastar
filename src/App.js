import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./components/About";
import Profile from "./components/Profile";
import ProductState from "./context/product/ProductsState"; 
import Admin_Services from "./components/Admin_Services";
import Admin_home from "./components/Admin_home";
import Services from "./components/Services";
import ServiceState from "./context/service/ServiceState";
import AdminSubscriptions from "./components/AdminSubscriptions";
import SubscriptionState from "./context/subscription/SubscriptionState";
import AdminInservice from "./components/AdminInservice";
import AdminOrders from "./components/AdminOrders";
import UserState from "./context/user/UserState";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Homes from "./components/Homes";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
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
             
              <Route path="/prologin" element={<Login />} />
            
              <Route path="/prosignup" element={<SignUp/>} />
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
