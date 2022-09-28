import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
   <>
   {/*<!---- Footer -->*/}
<footer className="text-center text-lg-start bg-dark text-muted">
  {/*<!---- Section: Social media -->*/}
  <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    {/*<!---- Left -->*/}
    <div className="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>
    {/*<!---- Left -->*/}

    {/*<!---- Right -->*/}
    <div>
      <a href="https://www.facebook.com/anjali.sales.5" target="_blank"className="me-4 link-secondary">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="https://youtube.com/c/TechnicalmasterShukla" target="_blank"className="me-4 link-secondary">
        <i className="fab fa-youtube"></i>
      </a>
      <a href="https://www.justdial.com/Palghar/Anjali-Sales-Service-Near-Banjara-Hotel-Virar-West/022PXX22-XX22-150819111630-Q3C9_BZDET/reviews" target="_blank"className="me-4 link-secondary">
        <i className="fab fa-google"></i>
      </a>
      <a href="https://instagram.com/anjali_sales_and_service?igshid=YmMyMTA2M2Y=" target="_blank"className="me-4 link-secondary">
        <i className="fab fa-instagram"></i>
      </a>
      
    </div>
    {/*<!---- Right -->*/}
  </section>
  {/*<!---- Section: Social media -->*/}

  {/*<!---- Section: Links  -->*/}
  <section className="">
    <div className="container text-center text-md-start mt-5">
      {/*<!---- Grid row -->*/}
      <div className="row mt-3">
        {/*<!---- Grid column -->*/}
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          {/*<!---- Content -->*/}
          <h6 className="text-uppercase fw-bold mb-4">
            <i className="fas fa-gem me-3 text-secondary"></i>Anjali Sales
          </h6>
          <p>
            One Stop Solution to all your Water Purifying needs.
            
          </p>
        </div>
        {/*<!---- Grid column -->*/}

        {/*<!---- Grid column -->*/}
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          {/*<!---- Links -->*/}
          <h6 className="text-uppercase fw-bold mb-4">
            Products
          </h6>
          <p>
            <a href="#!" className="text-reset">Water Purifier</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Flour Mill</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Chimney</a>
          </p>
        </div>
        {/*<!---- Grid column -->*/}

        {/*<!---- Grid column -->*/}
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          {/*<!---- Links -->*/}
          <h6 className="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <Link to={localStorage.getItem('token')?"/services":"/prologin"} className="text-reset">Service</Link>
          </p>
          <p>
            <Link  to={localStorage.getItem('token')?"/services":"/prologin"} className="text-reset">Subscription</Link>
          </p>
          <p>
            <Link  to="/products" className="text-reset">Browse</Link>
          </p>
         
        </div>
        {/*<!---- Grid column -->*/}

        {/*<!---- Grid column -->*/}
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          {/*<!---- Links -->*/}
          <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i className="fas fa-home me-3 text-secondary"></i>Shop No 4,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kusum Vihar Bldg,
                                                                          <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Near Banjara Hotel,
                                                                          <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Old viva College Rd,
                                                                          <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Virar (W) </p>
          <p>
            <i className="fas fa-envelope me-3 text-secondary"></i>
            anupgond12@gmail.com
          </p>
          <p><i className="fas fa-phone me-3 text-secondary"></i> +91 9619379776</p>
          <p><i className="fas fa-print me-3 text-secondary"></i> + 251 9565</p>
        </div>
        {/*<!---- Grid column -->*/}
      </div>
      {/*<!---- Grid row -->*/}
    </div>
  </section>
  {/*<!---- Section: Links  -->*/}

  {/*<!---- Copyright -->*/}
  <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.025)"}}>
    © 2022 Copyright:AnjaliSales
    
  </div>
  {/*<!---- Copyright -->*/}
</footer>
{/*<!---- Footer -->*/}
   </>
  )
}

export default Footer
