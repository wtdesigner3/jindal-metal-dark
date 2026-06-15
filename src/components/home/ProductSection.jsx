"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "src/ui/ProductCard";


export default function ProductSection() {
  const products = [
    {
      id: 1,
      image: "/images/thin.jpeg",
      tag: "Steel",
      title: "Stainless Steel",
      cta: "View grades & tolerances",
      slug: "/stainless-steel/stainless-steel",
    },
    {
      id: 2,
      image: "/images/rollsub2.png",
      tag: "Steel",
      title: "Edge Condition",
      cta: "View grades & tolerances",
      slug: "/stainless-steel/edge-condition",
    },
    {
      id: 3,
      image: "/images/about.jpeg",
      tag: "Steel",
      title: "Tolerances",
      cta: "View grades & tolerances",
      slug: "/stainless-steel/tolerances",
    },
    {
      id: 4,
      image: "/images/stain.jpg",
      tag: "Steel",
      title: "Hardness Ranges",
      cta: "View grades & tolerances",
      slug: "/stainless-steel/hardness-ranges",
    },

  ];

  return (
    <section className="bg-surface  section my-0 ">
      <div className="container">
        <div className="row g-4 align-items-center justify-content-between mb-30">
          <div className="col-lg-8">
            <div className="section-title two ">
              <span>Our Products</span>
              <h2>Our Range of Products</h2>
            </div>
          </div>

          {/* <div className="col-lg-3 d-flex justify-content-lg-end btn_wrapper">
            <Link href="/products" className="primary-btn3 transparent">
              <span>View All Products</span>
              <span>View All Products</span>

              <svg
                className="arrow"
                width="23"
                height="23"
                viewBox="0 0 23 23"
              >
                <g>
                  <path d="M0.113861 0H22.9999V4.28425L4.32671 22.9997L0 18.7154L12.7524 6.08815L0.113861 6.20089V0Z" />
                  <path d="M23 22.9996V8.56848L16.8516 14.6566V22.9996H23Z" />
                </g>
              </svg>
            </Link>
          </div> */}
        </div>

        <div className="home2-service-slider-area">
          <div className="row mb-30">
            <div className="col-lg-12">
             

<Swiper
  modules={[Navigation, Autoplay]}
  spaceBetween={30}
  slidesPerView={4}
  loop={true}   // 👈 enables infinite loop
  autoplay={{
    delay: 1200,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
  navigation={{
    prevEl: ".service-slider-prev",
    nextEl: ".service-slider-next",
  }}
  breakpoints={{
    0: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
    1200: { slidesPerView: 2 },
  }}
>
  {products.map((product) => (
    <SwiperSlide key={product.id}>
      <ProductCard product={product} />
    </SwiperSlide>
  ))}
</Swiper>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <div className="slider-btn-grp two">
                <div className="slider-btn service-slider-prev">
                  <i className=" text-light bi bi-arrow-left"></i>
                </div>

                <div className="slider-btn service-slider-next">
                  <i className="text-light bi bi-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}