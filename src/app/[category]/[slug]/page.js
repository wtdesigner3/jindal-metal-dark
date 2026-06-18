import { notFound } from "next/navigation";

import PageHeader from "src/components/layout/PageHeader";
import ProductDetails from "src/components/products/ProductDetails";

const products = [
  {
    id: 1,
    slug: "cold-rolled-precision-stainless-steel-strips",

    title: "Cold Rolled Precision Stainless Steel Strips",

    category: "Stainless Steel",

    image: "/images/thin.jpeg",

    description:
      "Jindal Metal Industries manufactures high-quality cold rolled precision stainless steel strips for automotive, industrial, engineering, electronics and precision component applications.",

    content: `
      <p>
        Precision stainless steel strips are manufactured with strict quality controls
        to ensure uniform thickness, width, and mechanical properties.
      </p>
    `,

    seo: {
      title: "",
      description: "",
      keywords: [],
      ogImage: "",
      canonical: "",
    },
  },

  {
    id: 2,
    slug: "stainless-steel-ultra-thin-foils",

    title: "Stainless Steel Ultra-Thin Foils",

    category: "Stainless Steel",

    image: "/images/thin.jpeg",

    description:
      "Ultra-thin stainless steel foils manufactured for electronics, batteries, medical devices and precision engineering applications.",

    content: `
      <p>
        Manufactured using advanced rolling and finishing processes for ultra-thin
        thickness requirements.
      </p>
    `,

    seo: {
      title: "",
      description: "",
      keywords: [],
      ogImage: "",
      canonical: "",
    },
  },

  {
    id: 3,
    slug: "hardened-and-tempered-steel-strips",

    title: "Hardened and Tempered Steel Strips",

    category: "High Carbon & Alloy Steel Strips",

    image: "/images/rollsub1.jpeg",

    description:
      "High-strength hardened and tempered steel strips for springs, tools, automotive and industrial applications.",

    content: `
      <p>
        Produced through controlled heat treatment processes to achieve precise
        hardness and tensile strength levels.
      </p>
    `,

    seo: {
      title: "",
      description: "",
      keywords: [],
      ogImage: "",
      canonical: "",
    },
  },

  {
    id: 4,
    slug: "cold-rolled-steel-strips",

    title: "Cold Rolled Steel Strips",

    category: "High Carbon & Alloy Steel Strips",

    image: "/images/rollsub2.png",

    description:
      "Cold rolled steel strips with excellent dimensional accuracy, surface finish and formability.",

    content: `
      <p>
        Suitable for automotive, engineering, electrical and fabrication applications.
      </p>
    `,

    seo: {
      title: "",
      description: "",
      keywords: [],
      ogImage: "",
      canonical: "",
    },
  },

  {
    id: 5,
    slug: "grades-properties",

    title: "Grades & Its Properties",

    category: "Technical Information",

    image: "/images/grades-properties.webp",

    description:
      "Technical reference for steel grades, compositions, mechanical properties and applications.",

    content: `
      <p>
        Detailed information regarding material grades and engineering properties.
      </p>
    `,

    seo: {
      title: "",
      description: "",
      keywords: [],
      ogImage: "",
      canonical: "",
    },
  },

  {
    id: 6,
    slug: "edge-condition",

    title: "Edge Condition",

    category: "Technical Information",

    image: "/images/edge-condition.webp",

    description:
      "Technical guide covering slit edge, mill edge, deburred edge and special edge profiles.",

    content: `
      <p>
        Various edge conditions are available based on customer requirements.
      </p>
    `,

    seo: {
      title: "",
      description: "",
      keywords: [],
      ogImage: "",
      canonical: "",
    },
  },

  {
    id: 7,
    slug: "tolerances",

    title: "Tolerances",

    category: "Technical Information",

    image: "/images/tolerances.webp",

    description:
      "Technical information on thickness, width, flatness and dimensional tolerances.",

    content: `
      <p>
        Precision manufacturing ensures compliance with international standards.
      </p>
    `,

    seo: {
      title: "",
      description: "",
      keywords: [],
      ogImage: "",
      canonical: "",
    },
  },

];
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) return {};

  return {
    title: `${product.title} | Jindal Metals & Alloys Ltd`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { category, slug } = await params;
  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(
    (item) => item.slug !== product.slug

  );

  return (
    <>
      <PageHeader
        title={product.title}
        bgImage={product.image}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: product.title },
        ]}
      />

      <ProductDetails
        product={product}
        relatedProducts={relatedProducts}
        category={category}
      />
    </>
  );
}


