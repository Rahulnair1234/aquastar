import React from 'react'
import AddProduct from './AddProduct'
import Product from './Product'

const Admin_home = (props) => {
  return (
    <div>
        <div className="container my-5 text-end">
            <AddProduct/>
        
        </div>
    
    <Product/>
    </div>
  )
}

export default Admin_home
