import React from 'react'
import { useEffect,useContext } from 'react'
import { Link } from 'react-router-dom'
import productContext from '../context/product/productContext'
const Homes = () => {
    const context = useContext(productContext);
    const {products,getAllProducts } =  context;
    let photoLink="https://imgs.search.brave.com/GhnKxu70eRuccC2WgWK7I4UfgAni2vJV_MHSCYGntJ4/rs:fit:395:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4w/X0xZNGZtd25ORTNS/MGFrVjVxbW13SGFJ/NCZwaWQ9QXBp";
    
    useEffect(() => {
        getAllProducts();
        // eslint-disable-next-line
      },[]);
      try{
        if(products){
          photoLink=products[0].image;
        }        
      }    catch(error){
          photoLink="https://imgs.search.brave.com/GhnKxu70eRuccC2WgWK7I4UfgAni2vJV_MHSCYGntJ4/rs:fit:395:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4w/X0xZNGZtd25ORTNS/MGFrVjVxbW13SGFJ/NCZwaWQ9QXBp";
    
      }
    /*  if(products){
        photoLink=products[0].image;
      }*/
     
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
                      <b><Link to={"/about"} id="link1">Read More</Link></b> </p>
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
                    <div>
                      <img src={photoLink} height={300}width={250}style={{position: "relative",left: "-600px",top: "-100px"}}></img>
                      <b><Link to={"/products"} style={{position: "relative",left: "-850px",top: "50px"}} id="link2">Browse products</Link></b>
                    </div>
            </div>
            <div className='ourServicesHome'>
            <h2>Our Services</h2>
                <p><i>Anjali sales provides with the best<br/>
                      after sales services in very affordable rates.<br/>
                      All Over Mumbai and select parts of Maharashtra.<br/>
                      We are known for our timely service<br/>
                      Try for your self, book your first service here.
                      </i><br/><br/>
                      <b><Link to={"/services"} id="link1">Book Service</Link></b>
                    </p>
                    <img src="https://res.cloudinary.com/dp14ek0mf/image/upload/v1662212092/805204432-01_tnepkv.jpg" height={300}width={300}style={{position: "relative",left: "950px",top: "-100px", opacity:0.8,borderColor:"red",borderWidth:3}}></img>
            </div>
            <div className='ourSubscriptionHome'>
            <h2>Maintain Your Product</h2>
                <p><i>Keep your product and health at check<br/>
                      by subscribing to our annual maintainence plan <br/> 
                      providing with regular servicing at very affordable rates.
                      </i><br/><br/>
                      <b><Link to={"/services"} id="link1">Book Your Subscription Now</Link></b><br/><br/>
                    </p>
               </div>

        </div>
            
        </div>
    </>
   
  )
}

export default Homes
