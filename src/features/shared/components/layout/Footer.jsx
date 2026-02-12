// import React from 'react'

// const Footer = () => {

//     const submitOpinion = () => {

//     }

//     return (
//         <div>
//             <div className='bg-secondary text-center bg-body-tertiary pt-5' style={{ height: "400px" }}>
//                 for more info please read readme.txt file in <a href="https://github.com/farshad-1988/react-shop">repository</a>
//                 {/* <form className='d-flex flex-column w-25 m-auto justify-content-around mt-5' style={{ height: "200px" }}>
//                     <input className='form-control' type="text" placeholder='name' />
//                     <input className='form-control' type="email" placeholder='email' />
//                     <textarea className='form-control' name="" id="" placeholder='feedback'></textarea>
//                     <button onClick={() => { submitOpinion() }} className='btn btn-primary'>submit</button>
//                 </form> */}
//             </div>
//         </div>
//     )
// }

// export default Footer

// show case footer links except repo are fake
import React, { useState } from "react";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const submitOpinion = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", feedback: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <footer className="bg-dark text-light pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          {/* About Section */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3 text-uppercase">
              <i className="bi bi-shop me-2 text-primary"></i>
              React Shop
            </h5>
            <p className="text-light opacity-75 mb-4">
              Your one-stop destination for quality products with seamless
              shopping experience. Built with React and modern web technologies.
            </p>
            <div className="d-flex gap-3">
              <a
                href="#"
                className="text-light opacity-75 hover-opacity-100"
                style={{ transition: "opacity 0.3s" }}
              >
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a
                href="#"
                className="text-light opacity-75 hover-opacity-100"
                style={{ transition: "opacity 0.3s" }}
              >
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a
                href="#"
                className="text-light opacity-75 hover-opacity-100"
                style={{ transition: "opacity 0.3s" }}
              >
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a
                href="https://github.com/farshad-1988/react-shop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light opacity-75 hover-opacity-100"
                style={{ transition: "opacity 0.3s" }}
              >
                <i className="bi bi-github fs-4"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3 text-uppercase">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ transition: "opacity 0.3s" }}
                >
                  <i className="bi bi-chevron-right me-1"></i>Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ transition: "opacity 0.3s" }}
                >
                  <i className="bi bi-chevron-right me-1"></i>Products
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ transition: "opacity 0.3s" }}
                >
                  <i className="bi bi-chevron-right me-1"></i>About Us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ transition: "opacity 0.3s" }}
                >
                  <i className="bi bi-chevron-right me-1"></i>Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3 text-uppercase">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ transition: "opacity 0.3s" }}
                >
                  <i className="bi bi-chevron-right me-1"></i>FAQ
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ transition: "opacity 0.3s" }}
                >
                  <i className="bi bi-chevron-right me-1"></i>Shipping
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ transition: "opacity 0.3s" }}
                >
                  <i className="bi bi-chevron-right me-1"></i>Returns
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-light text-decoration-none opacity-75 hover-opacity-100"
                  style={{ transition: "opacity 0.3s" }}
                >
                  <i className="bi bi-chevron-right me-1"></i>Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Feedback Form */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold mb-3 text-uppercase">Send Us Feedback</h6>
            <form onSubmit={submitOpinion}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control bg-secondary border-0 text-light"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control bg-secondary border-0 text-light"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  className="form-control bg-secondary border-0 text-light"
                  rows="3"
                  placeholder="Your Feedback"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-warning w-100 py-2 fw-semibold"
              >
                <i className="bi bi-send me-2"></i>Submit
              </button>
            </form>
          </div>
        </div>

        {/* GitHub Repository Info */}
        <div className="row mt-4">
          <div className="col-12">
            <div
              className="alert alert-dark border-secondary mb-0 d-flex align-items-center"
              role="alert"
            >
              <i className="bi bi-info-circle-fill me-2 text-primary"></i>
              <span className="me-2">
                For more information, please read the
              </span>
              <a
                href="https://github.com/farshad-1988/react-shop"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary fw-semibold text-decoration-none"
              >
                README.md file in the repository
                <i className="bi bi-box-arrow-up-right ms-1"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="row mt-4 pt-4 border-top border-secondary">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-light opacity-75">
              © {new Date().getFullYear()} React Shop. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0 text-light opacity-75">
              Made with <i className="bi bi-heart-fill text-danger"></i> using
              React & Bootstrap
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
