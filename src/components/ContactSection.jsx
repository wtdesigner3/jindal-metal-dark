"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // API Call Here
  };

  return (
    <section className="bg-surface-container-lowest two section my-0" id="scroll-section">
      <div className="container">
        <div className="contact-wrapper">
          <div className="row gy-5 align-items-center">
            
            {/* Left Content */}
            <div className="col-lg-6">
              <div className="contact-content">
                <div className="section-title two">
                  <span>Get In Touch</span>

                  <h2 className="mb-1">Connected With Us</h2>

                  <p className="mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Rerum velit amet sunt nisi? Exercitationem possimus et
                    architecto? Nemo, architecto repellendus.
                  </p>

                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.9623728499155!2d77.17327517541439!3d28.720670480072922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d01f23405c8c9%3A0xfa51f0bb0bce2b00!2z8J2QlvCdkJ7wnZCbIPCdkJPwnZCy8J2QnPCdkKjwnZCo8J2Qp_CdkKzCrg!5e0!3m2!1sen!2sin!4v1780396848209!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                  />
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="col-lg-6">
              <div className="contact-form-wrap two">
                 <span>Get In Touch</span>

                  <h2 className="mb-1">Connected With Us</h2>

                <hr />
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">

                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter Your Name"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                           placeholder=" Your Email"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Phone *</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                           placeholder="Your Phone Number"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                           placeholder="Your Subject"
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Message *</label>
                        <textarea
                          rows="5"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                           placeholder="Write Your Message"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-100 bg-primary text-primary py-2 rounded fw-semibold btn-hover black-bg mt-4"
                  >
                    Submit Now
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}