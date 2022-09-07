import React from 'react'
import { useContext } from 'react'
import productContext from '../context/product/productContext'

const About = () => {
  const info=useContext(productContext);
  const {state}=info;
  return (
    <>
        <div className='containerHome'>
            <div className='backgroundHome'>
            <div className='boostingHome mx-3 '>
                <h2>Anjali Sales</h2>
                <p><i>With more than 15 years of experience in the field<br/>
                      of water purifying.Anjali Sales provides you with <br/> 
                      top quality products and best services at the most<br/> 
                      affordable rates.<br/>
                      From Manufacturing to delivery and then after <br/>
                      sales services we take care of everything for our customers.<br/>
                      <b>Our motto is customer satisfaction and safety.</b></i><br/><br/>
                    </p>
            </div>
            <div className='topProductHome'>
            <h2>Our Top Selling Product</h2>
                <p><i>Click on the following button to view<br/>
                      our best selling product.We provide<br/>
                      5 year warranty with all original <br/>
                      Anjali products.Our Products are known for<br/>
                      their sleek design and efficiency.<br/>
                      Our all products have been tested throughly by group of experts.<br/>
                      All our products follows the ISI Standard.
                      </i><br/>
                    </p>
                   
            </div>
            <div className='ourServicesHome'>
            <h2>Our Services</h2>
                <p><i>Anjali sales provides with the best<br/>
                      after sales services in very affordable rates.<br/>
                      All Over Mumbai and select parts of Maharashtra.<br/>
                      We are known for our timely service<br/>
                      Try for your self, book your first service here.
                      </i><br/><br/>
                     
                    </p>
                         </div>
            <div className='ourSubscriptionHome'>
            <h2>Maintain Your Product</h2>
                <p><i>Keep your product and health at check<br/>
                      by subscribing to our annual maintainence plan <br/> 
                      providing with regular servicing at very affordable rates.
                      </i><br/><br/>
                    
                    </p>
               </div>

        </div>
            
        </div>
    </>
  )
}

export default About

