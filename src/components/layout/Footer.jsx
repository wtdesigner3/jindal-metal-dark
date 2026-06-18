import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faEnvelope, faLocation, faLocationDot, faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";


const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Meet Our Team", href: "/team" },
  { name: "Our Project", href: "/projects" },
  { name: "Blog & Article", href: "/blog" },
  { name: "Solutions", href: "/solutions" },
];

const careerLinks = [
  { name: "Open Positions", href: "/career" },
  { name: "Students", href: "/career/students" },
  { name: "Diversity & Inclusion", href: "/career/diversity" },
  { name: "Factory Employ", href: "/career/factory" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: "bi-linkedin",
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: "bi-facebook",
  },
  {
    name: "Twitter",
    href: "https://x.com",
    icon: "bi-twitter-x",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: "bi-instagram",
  },
];

export default function Footer() {
  return (
    <footer className="footer-section style-2">
      <div className="footer-wrapper">
        <div className="container">
          <div className="footer-menu-and-address-wrap">
            <div className="row align-items-center">
              
              {/* Logo & About */}
              <div className="col-lg-3">
                <div className="footer-widget text-light">
                  <div className="address-area px-4 py-5 c-foot pb-3">
                    <Image
                      src="/images/logo.png"
                      alt="Jindal Metals"
                      width={180}
                      height={60}
                      className="img-fluid mb-4"
                    />

                    <p>
                      Leading manufacturer and supplier of high-quality metal
                      products delivering excellence and innovation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              <div className="col-lg-9">
                <div className="footer-menu">
                  <div className="row gy-4">

                    {/* Company */}
                    <div className="col-md-4">
                      <div className="footer-widget">
                        <div className="widget-title">
                          <h5>COMPANY</h5>
                        </div>

                        <ul className="widget-list">
                          {companyLinks.map((link) => (
                            <li key={link.name}>
                              <Link href={link.href}>{link.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Career */}
                    <div className="col-md-4">
                      <div className="footer-widget">
                        <div className="widget-title">
                          <h5>CAREER</h5>
                        </div>

                        <ul className="widget-list">
                          {careerLinks.map((link) => (
                            <li key={link.name}>
                              <Link href={link.href}>{link.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="col-md-4">
                      <div className="footer-widget">
                        <div className="widget-title">
                          <h5>Contact Us</h5>
                        </div>

                        <ul className="contact-area">
                          <li className="d-flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faPhone} size="1x" />
                            <a href="tel:+919876543210" className="text-light">
                                +91 98765 43210
                              </a>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                              <FontAwesomeIcon icon={faEnvelope} size="1x" />
                           <a href="mailto:info@jindalmetals.com" className="text-light">
                                info@jindalmetals.com
                              </a>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                              <FontAwesomeIcon icon={faLocationDot} size="1x" />
                            <a href="tel:+919876543210" className="text-light">
                               New Delhi, India
                              </a>
                          </li>

                          
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom-wrap">
        <div className="container">
          <div className="footer-bottom d-flex justify-content-between align-items-center flex-wrap">

            <div className="copyright-area">
              <p>
                © {new Date().getFullYear()}{" "}
                <Link href="/">Jindal Metals</Link>. All Rights Reserved.
              </p>
            </div>

            <ul className="social-area d-flex gap-3">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`bi ${social.icon}`}></i>{" "}
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    </footer>
  );
}