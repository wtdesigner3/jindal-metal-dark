import Image from "next/image";
import BlogSection from "src/components/blog/BlogSection";
import ContactSection from "src/components/ContactSection";
import ChooseUs from "src/components/home/ChooseUs";
import CompanyOverview from "src/components/home/CompanyOverview";
import CTASection from "src/components/home/CTASection";
import HeroSlider from "src/components/home/HeroSlider";
import MottoSection from "src/components/home/MottoSection";
import ProductSection from "src/components/home/ProductSection";
import SegmentsSection from "src/components/home/SegmentsSection";
import TestimonialSection from "src/components/testimonial/TestimonialSection";

export const metadata = {
  title: "Jindal Metals & Alloys Ltd | Thin & Ultra-Thin Precision Stainless Steel Strips",
  description: "Specializing in the manufacturing of cold rolled precision stainless steel strips. Over 4 decades of stability, trust, and quality excellence.",
};

export default function Home() {

  return (
    <>
      <div>
        <HeroSlider />
        <CompanyOverview />
        <ChooseUs />
        <ProductSection />
        <MottoSection />
        <SegmentsSection />
        <CTASection />
        <BlogSection />
        <TestimonialSection />
        <ContactSection />

      </div>
    </>
  );
}
