import Image from "next/image";

const features = [
  {
    id: 1,
    image: "/images/qc.png",
    title: "Quality Control Systems",
    description:
      "Stringent quality checks and advanced testing ensure consistent performance, precision, and reliability in every product.",
  },
  {
    id: 2,
    image: "/images/scale.png",
    title: "Scalability and Flexibility",
    description:
      "Modern manufacturing capabilities enable us to efficiently meet diverse customer requirements, from small batches to large-scale production.",
  },
  {
    id: 3,
    image: "/images/sus.png",
    title: "Sustainable Operation & Safety",
    description:
      "Committed to environmentally responsible practices and a safety-first culture that supports sustainable growth and operational excellence.",
  },
];

export default function ChooseUs() {
  return (
    <section className="bg-surface-container-lowest  section my-0  position-relative">
      <div className="container">
        <div className="row g-4 align-items-center text-center justify-content-center mb-70">
          <div
            className="col-lg-6 wow animate fadeInLeft"
            data-wow-delay="200ms"
            data-wow-duration="1500ms"
          >
            <div className="section-title">
              <span className="text-light">Why Choose Us</span>
              <h2 className="text-light">Strength in Every Solution</h2>
            </div>
          </div>
        </div>

        <div className="feature-wrap">
          <div className="home1-feature-slider">
            <div className="row justify-content-between gx-5">
              {features.map((feature) => (
                <div className="col-md-4 d-flex" key={feature.id}>
                  <div className="single-feature rounded  px-5 pt-3 pb-4">
                    <div className="icon-img mx-0">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={80}
                        height={80}
                      />
                    </div>

                    <h4 className="text-light">
                      {feature.title.includes(" & ")
                        ? feature.title
                        : feature.title}
                    </h4>

                    <p className="text-light mb-0">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}