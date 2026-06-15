import Image from "next/image";
import { notFound } from "next/navigation";
import CategorySection from "src/components/category/CategorySection";



const categories = [
    {
        id: 1,
        slug: "stainless-steel",
        title: "Stainless Steel",
        image: "/images/slide2.jpg",

        description:
            "Explore our complete range of precision stainless steel strips and ultra-thin foils manufactured to international quality standards.",

        content: `
      Stainless steel is one of the most versatile and durable engineering materials used across automotive, construction, electronics, medical, food processing and industrial sectors. Known for excellent corrosion resistance, superior strength and long service life, stainless steel products deliver exceptional performance in demanding applications.

      Jindal Metals & Alloys Ltd offers a comprehensive range of precision stainless steel strips and ultra-thin foils available in multiple grades, widths, thicknesses, tempers and surface finishes to meet diverse customer requirements.
    `,

        seo: {
            title: "Stainless Steel Products | Jindal Metals & Alloys Ltd",
            description:
                "Premium precision stainless steel strips and ultra-thin foils manufactured to global standards.",
            ogImage: "/images/slide1.jpg",
            canonical: "/products/stainless-steel",
        },
    },

    {
        id: 2,
        slug: "high-carbon-alloy-steel-strips",
        title: "High Carbon & Alloy Steel Strips",
        image: "/images/roll1.jpeg",

        description:
            "High-performance cold rolled, hardened and tempered steel strips for demanding industrial applications.",

        content: `
      High carbon and alloy steel strips are engineered to provide superior strength, wear resistance and dimensional stability. These products are widely used in springs, cutting tools, automotive components, industrial machinery and engineering applications.

      Manufactured using advanced rolling and heat treatment processes, our steel strips offer consistent mechanical properties and excellent performance.
    `,

        seo: {
            title:
                "High Carbon & Alloy Steel Strips | Jindal Metals & Alloys Ltd",
            description:
                "Premium hardened, tempered and cold rolled alloy steel strips for industrial applications.",
            ogImage: "/images/slide1.jpg",
            canonical: "/products/high-carbon-alloy-steel-strips",
        },
    },

    {
        id: 3,
        slug: "technical-information",
        title: "Technical Information",
        image: "/images/slide1.jpg",

        description:
            "Detailed technical specifications including grades, edge conditions, tolerances and hardness ranges.",

        content: `
      Our technical information section provides detailed reference data regarding material grades, chemical composition, mechanical properties, tolerances, edge conditions and hardness ranges.

      This information helps customers select the most suitable material specification for their manufacturing and engineering requirements.
    `,

        seo: {
            title: "Technical Information | Jindal Metals & Alloys Ltd",
            description:
                "Material grades, tolerances, edge conditions and hardness range specifications.",
            ogImage: "/images/slide1.jpg",
            canonical: "/products/technical-information",
        },
    },
];



export async function generateMetadata({ params }) {
    const { category: categorySlug } = await params;

    const category = categories.find(
        (item) => item.slug === categorySlug
    );

    if (!category) {
        notFound();
    }


    return {
        title:
            category.seo?.title ||
            `${category.title} | Jindal Metals & Alloys Ltd`,

        description:
            category.seo?.description ||
            category.description,

        openGraph: {
            title:
                category.seo?.title ||
                `${category.title} | Jindal Metals & Alloys Ltd`,

            description:
                category.seo?.description ||
                category.description,

            images: [
                {
                    url:
                        category.seo?.ogImage ||
                        category.image,
                    width: 1200,
                    height: 630,
                },
            ],
        },

        alternates: {
            canonical:
                category.seo?.canonical ||
                `/products/${category.slug}`,
        },
    };
}



export default async function CategoryPage({ params }) {
    const { category: categorySlug } = await params;

    const category = categories.find(
        (item) => item.slug === categorySlug
    );

    if (!category) {
        notFound();
    }

    return (
        <>
            <section className="category-hero-section position-relative">
                <div className="hero-banner cat-banner position-relative">
                    <Image
                        src={category.image}
                        alt={category.title}
                        width={1920}
                        height={700}
                        className="img-fluid"
                        priority
                    />

                    <div className="category-title">
                        <h1>{category.title}</h1>
                    </div>
                </div>
            </section>

            <section className="  home1-counter-section">
                <div className="container">
                    <div className="bg-surface-container-lowest counter-wrap text-center">
                        <div className="row gy-4">
                            <p>{category.content}</p>
                        </div>
                    </div>
                </div>
            </section>

            <CategorySection category={category} />
        </>
    );
}