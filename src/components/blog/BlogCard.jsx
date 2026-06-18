import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ blog }) {
    return (
        <div className="blog-card">
            <div className="blog-img-wrap">
                <Link href={blog.link} className="blog-img">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        width={600}
                        height={400}
                    />
                </Link>

                <div className="blog-meta">
                    <ul>
                        <li>
                            <span className="blog-date">
                                {blog.date}
                            </span>
                        </li>

                        <li>
                            <span>{blog.category}</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="blog-content">
                <h5>
                    <Link href={blog.link}>
                        {blog.title}
                    </Link>
                </h5>

                <Link href={blog.link} className=" primary-btn2 two">
                    <span>Read More</span>
                    <svg className="arrow" width="12" height="12" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><g><path d="M0.113861 0H22.9999V4.28425L4.32671 22.9997L0 18.7154L12.7524 6.08815L0.113861 6.20089V0Z"></path><path d="M23 22.9996V8.56848L16.8516 14.6566V22.9996H23Z"></path></g></svg>
                </Link>
            </div>
        </div>
    );
}