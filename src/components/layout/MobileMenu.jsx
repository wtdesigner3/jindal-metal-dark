"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import { menuData } from "./Header";


function MobileMenuItem({
  item,
  openMenus,
  toggleMenu,
  closeMenu,
}) {
  const hasChildren = item.children?.length > 0;

  return (
    <li className={hasChildren ? "menu-item-has-children" : ""}>
      {hasChildren ? (
        <>
          <div
            className="d-flex justify-content-between align-items-center"
            onClick={() => toggleMenu(item.id)}
            style={{ cursor: "pointer" }}
          >
            <span>{item.title}</span>
            <span>{openMenus[item.id] ? "-" : "+"}</span>
          </div>

          {openMenus[item.id] && (
            <ul className="sub-menu">
              {item.children.map((child) => (
                <MobileMenuItem
                  key={child.id}
                  item={child}
                  openMenus={openMenus}
                  toggleMenu={toggleMenu}
                  closeMenu={closeMenu}
                />
              ))}
            </ul>
          )}
        </>
      ) : (
        <Link href={item.slug} onClick={closeMenu}>
          {item.title}
        </Link>
      )}
    </li>
  );
}

export default function MobileMenu({
  mobileMenu,
  setMobileMenu,
}) {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (id) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const closeMenu = () => {
    setMobileMenu(false);
    setOpenMenus({});
  };

  return (
    <>
      <div
        className={`mobile-menu-overlay ${mobileMenu ? "active" : ""
          }`}
        onClick={closeMenu}
      />

      <div
        className={`mobile-menu-wrapper main-menu ${mobileMenu ? "show-menu" : ""
          }`}
      >
        <div className="mobile-logo-area d-flex align-items-center justify-content-between">
          <Link href="/" onClick={closeMenu}>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={150}
              height={50}
            />
          </Link>

          <button
            className="menu-close-btn"
            onClick={closeMenu}
          >
            <X size={28} />
          </button>
        </div>

        <ul className="menu-list">
          {menuData.map((item) => (
            <MobileMenuItem
              key={item.id}
              item={item}
              openMenus={openMenus}
              toggleMenu={toggleMenu}
              closeMenu={closeMenu}
            />
          ))}
        </ul>

        <div className="contact-area mt-4">
          <span>Any Question</span>
          <a href="tel:+919323582341">
            +91 9323582341
          </a>
        </div>
      </div>
    </>
  );
}