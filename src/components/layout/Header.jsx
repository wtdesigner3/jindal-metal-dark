"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MobileMenu from "./MobileMenu";
export const menuData = [
  {
    id: 1,
    title: "About Us",
    slug: "#",
    children: [],
  },

  {
    id: 2,
    title: "Our Products",
    slug: "#",
    children: [

      {
        id: 21,
        title: "Stainless Steel",
        slug: "/stainless-steel",
        children: [
          {
            id: 211,
            title: "Cold Rolled Precision Stainless Steel Strips",
            slug: "/stainless-steel/cold-rolled-precision-stainless-steel-strips",
          },
          {
            id: 212,
            title: "Stainless Steel Ultra-Thin Foils",
            slug: "/stainless-steel/stainless-steel-ultra-thin-foils",
          },
        ],
      },

      {
        id: 22,
        title: "High Carbon & Alloy Steel Strips",
        slug: "/high-carbon-alloy-steel-strips",
        children: [
          {
            id: 221,
            title: "Hardened and Tempered Steel Strips",
            slug: "/high-carbon-alloy-steel-strips/hardened-and-tempered-steel-strips",
          },
          {
            id: 222,
            title: "Cold Rolled Steel Strips",
            slug: "/high-carbon-alloy-steel-strips/cold-rolled-steel-strips",
          },
        ],
      },
      //  {
      //   id: 23,
      //   title: "Technical Information",
      //   slug: "/technical-information",
      //   children: [
      //     {
      //       id: 231,
      //       title: "Grades & Its Properties",
      //       slug: "/technical-information/grades-properties",
      //     },
      //     {
      //       id: 232,
      //       title: "Edge Condition",
      //       slug: "/technical-information/edge-condition",
      //     },
      //     {
      //       id: 233,
      //       title: "Tolerances",
      //       slug: "/technical-information/tolerances",
      //     },
      //     {
      //       id: 234,
      //       title: "Hardness Ranges",
      //       slug: "/technical-information/hardness-ranges",
      //     },
      //   ],
      // },


    ],
  },
  {
    id: 3,
    title: "Corporate Information",
    slug: "#",
    children: [
      {
        id: 31,
        title: "CSR",
        slug: "/csr",
      },
    ],
  },

  {
    id: 4,
    title: "Infrastructure",
    slug: "#",
    children: [
      {
        id: 41,
        title: "Cold Rolled Precision Stainless Steel Strips",
        slug: "/infrastructure",
      },
    ],
  },

  {
    id: 5,
    title: "Blogs",
    slug: "/blogs",
    children: [],
  },
];
export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <header className="header-area style-1">
        <div className="container-fluid d-flex flex-nowrap align-items-center justify-content-between">

          {/* Logo */}
          <div className="company-logo">
            <Link href="/">
              <Image
                src="/images/nlogolatest.png"
                alt="Logo"
                width={180}
                height={60}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="main-menu d-none d-lg-block">
            <ul className="menu-list">
              {menuData.map((item) => (
                <li
                  key={item.id}
                  className={item.children?.length ? "menu-item-has-children" : ""}
                >
                  <Link
                    href={item.slug}
                    className={item.children?.length ? "drop-down" : ""}
                  >
                    {item.title}

                    {item.children?.length > 0 && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginLeft: "6px" }}
                      >
                        <path d="M10 0.0495054L10 10.0001L8.13725 10.0001L-8.22301e-08 1.8812L1.86275 -3.55691e-07L7.35294 5.5446L7.30392 0.0495053L10 0.0495054Z" />
                        <path d="M-9.6438e-05 10.0002L6.27441 10.0002L3.62736 7.32687L-9.63211e-05 7.32687L-9.6438e-05 10.0002Z" />
                      </svg>
                    )}
                  </Link>

                  {item.children?.length > 0 && (
                    <>
                      <i className="bi bi-plus dropdown-icon"></i>

                      <ul className="sub-menu">
                        {item.children.map((child) => (
                          <li
                            key={child.id}
                            className={
                              child.children?.length
                                ? "menu-item-has-children"
                                : ""
                            }
                          >
                            <Link href={child.slug}>
                              <span>
                                {child.title}

                                {child.children?.length > 0 && (
                                  <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ marginLeft: "6px" }}
                                  >
                                    <path d="M0.0495054 0H10.0001V1.86275L1.88121 10L0 8.13726L5.54461 2.64706L0.0495054 2.69608V0Z" />
                                    <path d="M9.99971 9.99993V3.72542L7.32642 6.37248V9.99993H9.99971Z" />
                                  </svg>
                                )}
                              </span>
                            </Link>

                            {child.children?.length > 0 && (
                              <>
                                <i className="d-lg-none d-flex bi bi-plus dropdown-icon"></i>

                                <ul className="sub-menu">
                                  {child.children.map((subChild) => (
                                    <li key={subChild.id}>
                                      <Link href={subChild.slug}>
                                        <span>{subChild.title}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side */}
          <div className="nav-right">
            <div className="contact-area d-lg-flex d-none">
              <div className="icon">
                <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.4233 16.9723L16.9701 14.0025C16.4049 13.6286 15.6474 13.7516 15.2296 14.2851L13.9324 15.953C13.8518 16.0593 13.7355 16.133 13.6049 16.1605C13.4743 16.1879 13.3382 16.1674 13.2215 16.1026L12.9748 15.9666C12.1568 15.5207 11.139 14.9656 9.08843 12.9143C7.03782 10.863 6.48163 9.84441 6.03578 9.02794L5.90048 8.78119C5.8348 8.66457 5.81347 8.52814 5.84042 8.39704C5.86736 8.26593 5.94077 8.14897 6.04712 8.06771L7.71384 6.77093C8.24713 6.35309 8.37031 5.59578 7.9969 5.03048L5.02713 0.577286C4.64443 0.00163523 3.87664 -0.171172 3.28419 0.184969L1.42202 1.30357C0.836918 1.64754 0.407665 2.20464 0.224235 2.85811C-0.446327 5.30138 0.0581298 9.51809 6.26973 15.7304C11.2109 20.6712 14.8894 21.9999 17.4178 21.9999C17.9997 22.0024 18.5792 21.9267 19.141 21.7748C19.7946 21.5916 20.3517 21.1623 20.6955 20.5771L21.8152 18.716C22.1719 18.1234 21.9992 17.3552 21.4233 16.9723ZM21.1835 18.3398L20.0663 20.202C19.8194 20.6244 19.4187 20.935 18.9481 21.0687C16.6925 21.688 12.7519 21.175 6.78849 15.2117C0.825106 9.24827 0.312228 5.308 0.931488 3.05209C1.06539 2.58083 1.37635 2.17961 1.7993 1.93237L3.66147 0.815229C3.91853 0.660553 4.25177 0.735528 4.41783 0.985329L6.03106 3.40733L7.38507 5.43814C7.54722 5.68334 7.49394 6.01198 7.26262 6.19343L5.59552 7.49021C5.08818 7.87814 4.9433 8.58007 5.25566 9.13716L5.38804 9.37768C5.85662 10.2371 6.43918 11.3062 8.56606 13.4327C10.6929 15.5592 11.7617 16.1418 12.6207 16.6104L12.8616 16.7431C13.4186 17.0554 14.1206 16.9106 14.5085 16.4032L15.8053 14.7361C15.9868 14.5049 16.3153 14.4517 16.5606 14.6137L21.0134 17.5834C21.2634 17.7494 21.3384 18.0828 21.1835 18.3398ZM12.4659 3.66805C15.9066 3.67187 18.6949 6.4602 18.6988 9.90091C18.6988 10.1034 18.8629 10.2675 19.0654 10.2675C19.2679 10.2675 19.432 10.1034 19.432 9.90091C19.4278 6.05538 16.3114 2.93901 12.4659 2.9348C12.2634 2.9348 12.0993 3.09893 12.0993 3.30142C12.0993 3.50392 12.2634 3.66805 12.4659 3.66805Z"></path>
                  <path d="M12.4653 5.86759C14.6916 5.87021 16.4957 7.67433 16.4983 9.90062C16.4983 9.99786 16.5369 10.0911 16.6057 10.1599C16.6744 10.2286 16.7677 10.2672 16.8649 10.2672C16.9622 10.2672 17.0554 10.2286 17.1242 10.1599C17.1929 10.0911 17.2315 9.99786 17.2315 9.90062C17.2285 7.26951 15.0963 5.13735 12.4653 5.13434C12.2628 5.13434 12.0986 5.29847 12.0986 5.50096C12.0986 5.70346 12.2628 5.86759 12.4653 5.86759Z"></path>
                  <path d="M12.4653 8.06735C13.4772 8.06856 14.2972 8.8886 14.2985 9.90056C14.2985 9.9978 14.3371 10.091 14.4058 10.1598C14.4746 10.2286 14.5679 10.2672 14.6651 10.2672C14.7623 10.2672 14.8556 10.2286 14.9243 10.1598C14.9931 10.091 15.0317 9.9978 15.0317 9.90056C15.0301 8.48382 13.882 7.3357 12.4653 7.33411C12.2628 7.33411 12.0986 7.49823 12.0986 7.70073C12.0986 7.90323 12.2628 8.06735 12.4653 8.06735Z"></path>
                </svg>
              </div>
              <div className="content">
                <span>Any Question</span>
                <a href="tel:+919323582341">+91 9323582341</a>
              </div>
            </div>

            <button
              className="mobile-menu-btn d-lg-none"
              onClick={() => setMobileMenu(true)}
            >
              <Bars3Icon width={30} />
            </button>
          </div>
        </div>
        <MobileMenu
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
        />
      </header>

      {/* Mobile Menu Component */}

    </>
  );
}