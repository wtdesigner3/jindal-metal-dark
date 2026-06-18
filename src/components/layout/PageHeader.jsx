import Link from "next/link";

export default function PageHeader({
    title,
    bgImage,
    breadcrumb = [],
}) {
    return (
        <section
            className="page-header"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            <div className="container">
                <div className="page-header-content">
                    <h1>{title}</h1>

                    <ul className="breadcrumb-list">
                        {breadcrumb.map((item, index) => (
                            <li key={index}>
                                {item.href ? (
                                    <Link href={item.href}>{item.name}</Link>
                                ) : (
                                    <span>{item.name}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}