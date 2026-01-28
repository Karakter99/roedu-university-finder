"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  // Explicitly typing the state as boolean
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-cream/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* 1. Logo Section */}
        <Link href="/" className="flex items-center">
          <div className="relative w-40 h-16">
            <Image
              src="/rologo.png"
              alt="RoEduBridge Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* 2. Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium text-gray-600">
          <Link href="/" className="hover:text-dark transition-colors">
            Main Menu
          </Link>
          <Link
            href="/life"
            className="text-gray-600 hover:text-dark font-medium transition-colors"
          >
            Student Life
          </Link>
          <Link
            href="/universities"
            className="hover:text-dark transition-colors"
          >
            Universities
          </Link>

          <Link href="/contact" className="hover:text-dark transition-colors">
            Contact
          </Link>
        </div>

        {/* 3. Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-dark focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 4. Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-cream border-b border-gray-200 shadow-lg flex flex-col items-center py-6 gap-6 text-lg font-medium text-gray-600 animate-in slide-in-from-top-5 duration-200">
          <Link
            href="/"
            className="hover:text-dark transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Student Life
          </Link>
          <Link
            href="/universities"
            className="hover:text-dark transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Universities
          </Link>
          <Link
            href="/contact"
            className="hover:text-dark transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
