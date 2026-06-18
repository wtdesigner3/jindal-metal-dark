import Image from "next/image";

export default function SegmentsSection() {
  const segments = [
    { title: "Utensils", image: "/images/eng.png" },
    { title: "Automobile", image: "/images/plug.png" },
    { title: "Heat Exchanger", image: "/images/sewing-machine.png" },
    { title: "Consumer Durables", image: "/images/white-goods.png" },
    { title: "Electronic", image: "/images/eng.png" },
    { title: "Fasteners", image: "/images/plug.png" },
    { title: "Electrical", image: "/images/sewing-machine.png" },
    { title: "Engineering", image: "/images/white-goods.png" },
    { title: "Textile", image: "/images/eng.png" },
    { title: "White Goods", image: "/images/plug.png" },
    { title: "Chemical", image: "/images/sewing-machine.png" },
    { title: "Refinery", image: "/images/white-goods.png" },
  ];

  return (
 <>
    <div className="bg-surface-container-lowest  section my-0">
      <div className="container">
        <div className="row justify-content-center mb-70">
          <div className="col-xl-6 col-lg-7 col-md-8">
            <div className="section-title text-center">
              <span>our Work</span>
              <h2>Segments we cater</h2>
            </div>
          </div>
        </div>

        <div className="row g-4 justify-content-center">
          {segments.map((segment, index) => (
            <div
              key={index}
              className="col-lg-2 d-flex col-md-3 col-sm-4 col-6"
            >
              <div className="certificate-card px-5 py-3 w-100">
                <div className="certificate-logo mx-auto">
                  <Image
                    src={segment.image}
                    alt={segment.title}
                    width={70}
                    height={70}
                  />
                </div>

                <h6>{segment.title}</h6>

               
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
      <div className="">
      <hr className="m-0"/>
</div>
 </>
  );
}