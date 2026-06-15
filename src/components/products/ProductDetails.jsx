import Link from "next/link";
import Image from "next/image";

export default function ProductDetails({ product, relatedProducts = [], category = "stainless-steel" }) {
    return (
        <section className="project-details-page my-5 ">
            <div className="container">
                <div className="row g-lg-4 gy-5 mb-80">

                    {/* Content */}
                    <div className="col-lg-8">
                        <div className="blog-details-top-area mb-4">
                            <h1 className="h-tags position-relative px-3 mb-4">{product.title}</h1>
                            <div className="position-relative" style={{ height: "350px" }}>
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-fit-cover rounded"
                                    sizes="100vw"
                                />
                            </div>
                        </div>

                        <div className="details-content-wrapper">
                            <p className="">
                                {product.description}
                            </p>

                            {product.content && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: product.content,
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="col-lg-4">
                        <div className="project-details-sidebar blog-sidebar-area">

                            {/* Related Products */}
                            <div className="single-widget mb-30">
                                <h5 className="widget-title">
                                    Related Products
                                </h5>

                                <ul className="category-list">
                                    {relatedProducts.map((item) => (
                                        <li key={item.slug}>
                                            <Link href={`/${category}/${item.slug}`}>
                                                <span>
                                                    <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 12 12"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M0.0594069 0H12.0002V2.23531L2.25746 12.0001L0 9.76478L6.65357 3.17649L0.0594069 3.23532V0Z" />
                                                        <path d="M12.0009 12.0002V4.4707L8.79297 7.6472V12.0002H12.0009Z" />
                                                    </svg>

                                                    {item.title}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Banner */}
                            <div className="sidebar-banner">
                                <Image
                                    src="/images/slide1.jpg"
                                    alt="Contact Us"
                                    width={500}
                                    height={600}
                                    className="img-fluid"
                                />

                                <div className="banner-content-wrap">
                                    <div className="banner-content">
                                        <h2>
                                            Ready to <span>work with us?</span>
                                        </h2>

                                        <Link
                                            href="/contact"
                                            className="primary-btn1 white-bg"
                                        >
                                            <span>Connect Today</span>

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
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}