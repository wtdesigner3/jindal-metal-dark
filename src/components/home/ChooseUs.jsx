import Image from "next/image";

const features = [
  {
    id: 1,
    image: "/images/qc.png",
    title: "Precision Quality Assurance",
    description:
      "Our comprehensive quality management system ensures every strip and foil meets stringent industry specifications for consistency, durability, and performance.",
  },
  {
    id: 2,
    image: "/images/scale.png",
    title: "Technical Expertise & Innovation",
    description:
      "Decades of metallurgical experience combined with advanced manufacturing technologies enable us to deliver innovative solutions for critical applications.",
  },
  {
    id: 3,
    image: "/images/sus.png",
    title: "Trusted Industry Partner",
    description:
      "We are committed to reliability, timely delivery, and sustainable manufacturing practices that create lasting value for customers across global industries.",
  },
];
export default function ChooseUs() {
  return (
   <>
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
      <div className="">
      <hr className="m-0"/>
</div>
   </>
  );
}