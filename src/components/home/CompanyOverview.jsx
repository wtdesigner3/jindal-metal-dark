import Image from "next/image";
import Link from "next/link";

export default function CompanyOverview() {
  return (
    <>
      <section className=" bg-surface home3-company-info-section section my-0">
      <div className="container">
        <div className="row gy-md-5 gy-4 align-items-center justify-content-center">

          {/* Left Image */}
          <div
            className="col-lg-5 wow animate  fadeInLeft position-relative"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <div className="company-info-img-and-countdown-area  z-2">
              <div className="info-img magnetic-item">
                <div
                  className="position-relative"
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 4",
                  }}
                >
                  <Image
                    src="/images/about.jpeg"
                    alt="about"
                    fill
                    className="object-fit-cover img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div
            className="col-lg-6 wow animate fadeInRight"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <div className="company-info-content  position-relative py-5 px-4 z-2">
              <div className=" z-2 p-first position-relative">
                <h2>Company Overview</h2>

                <p>
                  Jindal Metals &amp; Alloys Ltd as a subsidiary unit of Jindal
                  SAW Ltd. (part of the multi-billion dollar diversified O.P.
                  Jindal Group – a frontrunner in Total Pipe Solutions).
                  Jindal Metals &amp; Alloys Ltd began operations over more than
                  four decades ago and has an enviable track record of
                  stability, trust and growth in the industry.

                  Jindal innovates to produce thin & Ultra-thin Precision Stainless Steel Strips with the Perfect balance of Quality, turning ideas into new processes through Partnering customers in Product development with the Philosophy of Engineering Satisfaction which offers technically & economically adapted and viable Niche Product for highly Niche Market.
                </p>




                <Link href="/about" className="primary-btn2 two mx-3">
                  <span>Know More</span>

                  <svg
                    className="arrow"
                    width="12"
                    height="12"
                    viewBox="0 0 23 23"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path d="M0.113861 0H22.9999V4.28425L4.32671 22.9997L0 18.7154L12.7524 6.08815L0.113861 6.20089V0Z"></path>
                      <path d="M23 22.9996V8.56848L16.8516 14.6566V22.9996H23Z"></path>
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
    <div className="">
      <hr className="m-0"/>
</div>
    </>
  
  );
}