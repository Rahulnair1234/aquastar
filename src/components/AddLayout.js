import React from 'react'

const AddLayout = (props) => {
    const{insertProduct}=props;
  return (
    <div>
        <i className="fa-solid fa-circle-plus fa-3x"onClick={()=>{insertProduct()}}> Add</i>
      
    </div>
  )
}

export default AddLayout
