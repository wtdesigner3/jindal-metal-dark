"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Parallax, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "../../app/globals.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./HeroSlider.css";

const slides = [

  {
    image: "/images/slide2.jpg",
    title: "Precision Stainless Steel Manufacturer",
    subtitle: "Precision Stainless Steel Manufacturer",
    button: "View Our Work",
    link: "/product",
  },
  {
    image: "/images/slide1.jpg",
    title: "Precision Stainless Steel, Perfected.",
    subtitle: "From identity to launch — we’re your partner in every step of the journey.",
    button: "Book a Free Call",
    link: "/about",
  },
  {
    image: "/images/slide3.jpg",
    title: "Committed to ESG Excellence",
    subtitle: "Committed to ESG Excellence",
    button: "Start Your Project",
    link: "/about",
  },
];

export default function HeroSlider() {
  return (
    <section className="hero-slider hero-style">
      <Swiper
        modules={[Navigation, Pagination, Parallax, Autoplay]}
        speed={1000}
        loop={true}
        parallax={true}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>

            <div className="slide-inner position-relative">

              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                style={{ objectFit: "cover", zIndex: -1 }}
              />
              {/* <div className="slide-overlay"></div> */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 via-black/30 to-black/40"></div>

              <div className="h-container">
                <div className="slide-title">
                  <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-display-lg md:text-display-lg text-metallic-silver leading-tight">{slide.title}</h2>
                </div>

                <div className="slide-text">
                  <p>{slide.subtitle}</p>
                </div>

                <div className="slide-btns">
                  <div className="btn-grp">
                    <Link
                      href={slide.link}
                      className="primary-btn1 text-primary "
                    >
                      <span>  {slide.button}</span>
                      <span>  {slide.button}</span>

                      <svg
                        className="arrow"
                        width="23"
                        height="23"
                        viewBox="0 0 23 23"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <path d="M0.113861 0H22.9999V4.28425L4.32671 22.9997L0 18.7154L12.7524 6.08815L0.113861 6.20089V0Z" />
                          <path d="M23 22.9996V8.56848L16.8516 14.6566V22.9996H23Z" />
                        </g>
                      </svg>
                    </Link>


                  </div>
                  {/* <Link href={slide.link} className="theme-btn-s2">
                    {slide.button}  <span> →</span>
                  </Link> */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}