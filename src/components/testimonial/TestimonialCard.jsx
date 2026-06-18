import Image from "next/image";

export default function TestimonialCard({ testimonial }) {
    return (
       <div className="testimonial-card h-100 d-flex flex-column">
            <div className="test-quote">
                <Image src="/images/nquote.png" alt="Quote" width={46} height={42} />
            </div>

            <span>{testimonial.heading}</span>

            <p className="flex-grow-1">
                {testimonial.description}
            </p>

            <div className="author-area justify-content-start mt-auto">
                <div className="author-content">
                    <h5>{testimonial.name}</h5>
                    <span>{testimonial.designation}</span>
                </div>
            </div>
        </div>
    );
}