import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    // Sticky header with glass effect
    <nav className="sticky top-0 z-50 w-full bg-cream/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* 1. Logo Section (Bigger & No Text) */}
        <Link href="/" className="flex items-center">
          <div className="relative w-40 h-16">
            {" "}
            {/* Increased from w-8 h-8 to w-40 h-16 */}
            <Image
              src="/rologo.png"
              alt="RoEduBridge Logo"
              fill
              className="object-contain" // Keeps the logo aspect ratio perfect
              priority
            />
          </div>
        </Link>

        {/* 2. Links - Moved to the right */}
        {/* We use 'gap-8' to space them out nicely */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium text-gray-600">
          <Link href="/" className="hover:text-dark transition-colors">
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

        {/* Removed the 'Get Started' button section entirely */}
      </div>
    </nav>
  );
};

export default Navbar;
