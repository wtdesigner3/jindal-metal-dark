"use client";

import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const testimonialData = [
    {
        heading: "Excellent quality production!",
        description:
            "Feel free customize key feature based on the services & strategy you offer each plan. This breakdown helps potential clients understand your strengths.",
        image: "/images/slide1.jpg",
        name: "Mr. Daniel Scoot",
        designation: "Founder, Egenslab",
    },
    {
        heading: "Highly professional team!",
        description:
            "Outstanding support and product quality. The project was delivered on time and exceeded our expectations.",
        image: "/images/slide2.jpg",
        name: "John Smith",
        designation: "Managing Director",
    },
    {
        heading: "Great manufacturing partner!",
        description:
            "Reliable production process with excellent customer service and communication throughout the project.",
        image: "/images/slide3.jpg",
        name: "Michael Johnson",
        designation: "CEO",
    },
];

export default function TestimonialSection() {
    return (
        <section className="bg-surface  section my-0 ">
            <div className="container">
                <div className="row gy-5 align-items-center">
                    {/* Left Content */}
                    <div className="col-xl-4">
                        <div className="testimonial-title-area">
                            <div className="section-title text-light">
                                <span className="text-light">Our Client Testimonial</span>

                                <h2 className="text-light py-3">Trusted by Our Partners.</h2>

                                <p className="text-light pt-0">
                                    Sed nisl eros, condimentum nec risus sit amet, finibus
                                    congue. Fusce fringilla est libero, sed tempus urna feugiat
                                    eu.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Slider */}
                    <div className="col-xl-8">
                        <Swiper className="testimonial-swiper"
                            modules={[Navigation, Autoplay]}
                            navigation={{
                                prevEl: ".testimonial-slider-prev",
                                nextEl: ".testimonial-slider-next",
                            }}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={30}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 1,
                                },
                                992: {
                                    slidesPerView: 2,
                                },
                            }}
                        >
                            {testimonialData.map((testimonial, index) => (
                                <SwiperSlide key={index}>
                                    <TestimonialCard testimonial={testimonial} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Navigation */}
                        <div className="slider-btn-grp mt-4">
                            <div className="slider-btn testimonial-slider-prev">
                                ←
                            </div>

                            <div className="slider-btn testimonial-slider-next">
                                →
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}