import Image from "next/image";
import Link from "next/link";

export default function MottoSection() {
  const certificates = [
    "/images/c-1.png",
    "/images/c-2.png",
    "/images/c-3.png",
    "/images/c-4.png",
    "/images/c-5.png",
    "/images/c-2.png",
  ];

  return (
    <div className="home2-video-banner-section  section my-0 py-0">
      <div className="banner-wrapper">
        <Image
          src="/images/motto.jpg"
          alt="Our Motto"
          width={1920}
          height={800}
        />

        <div className="circular-text2">
          <h1>Our Motto</h1>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem eos
            nostrum enim cumque quam, pariatur earum voluptates maxime, rem et
            omnis excepturi ratione. Sequi pariatur quae molestias
            necessitatibus aliquam sed vel. Vel eveniet odio necessitatibus
            aliquam, possimus ipsa, quia quaerat nemo dignissimos, labore
            beatae quos earum voluptates iusto ad fuga.
          </p>
        </div>

        <div className="logo-section">
          <div className="container-fluid">
            <div className="logo-wrap">
              <div className="logo-title">
                <h6>Our Certification</h6>
              </div>

              <div className="marquee">
                {/* First Group */}
                <div className="marquee__group">
                  {certificates.map((logo, index) => (
                    <Link href="#" key={index}>
                      <Image
                        src={logo}
                        alt={`Certificate ${index + 1}`}
                        width={150}
                        height={80}
                      />
                    </Link>
                  ))}
                </div>

                {/* Duplicate Group For Infinite Marquee */}
                <div
                  className="marquee__group"
                  aria-hidden="true"
                >
                  {certificates.map((logo, index) => (
                    <Link href="#" key={`duplicate-${index}`}>
                      <Image
                        src={logo}
                        alt={`Certificate ${index + 1}`}
                        width={150}
                        height={80}
                      />
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}