import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="block relative w-32 h-12">
              {/* Note: Using a white version of logo if you have it, otherwise normal logo works */}
              <Image
                src="/rologo.png"
                alt="RoEduBridge Logo"
                fill
                className="w-48 h-auto object-contain" // This forces the logo to be WHITE
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Helping international students achieve their dreams of studying in
              Romania. Quality education, affordable living, and a future
              without borders.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-brand-yellow">
              Explore
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Student Life
                </Link>
              </li>
              <li>
                <Link
                  href="/universities"
                  className="hover:text-white transition-colors"
                >
                  Universities
                </Link>
              </li>
              <li>
                <Link
                  href="/admission-process"
                  className="hover:text-white transition-colors"
                >
                  Admission Process
                </Link>
              </li>
              <li>
                <Link
                  href="/visa"
                  className="hover:text-white transition-colors"
                >
                  Visa Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Cities */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-brand-yellow">
              Top Cities
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link
                  href="/universities?city=bucharest"
                  className="hover:text-white transition-colors"
                >
                  Bucharest
                </Link>
              </li>
              <li>
                <Link
                  href="/universities?city=cluj"
                  className="hover:text-white transition-colors"
                >
                  Cluj-Napoca
                </Link>
              </li>
              <li>
                <Link
                  href="/universities?city=timisoara"
                  className="hover:text-white transition-colors"
                >
                  Timișoara
                </Link>
              </li>
              <li>
                <Link
                  href="/universities?city=iasi"
                  className="hover:text-white transition-colors"
                >
                  Iași
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-brand-yellow">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>roedubridge@gmail.com</li>
              <li>+40 773 750 608</li>
              <li className="pt-2">
                Bucharest, Romania
                <br />
                Sector 1, Victoriei Square
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 RoEduBridge. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
