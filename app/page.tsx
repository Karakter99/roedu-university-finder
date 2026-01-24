import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    // DOT PATTERN BACKGROUND: This creates that subtle dot effect from the screenshot
    <div className="min-h-screen bg-cream bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px]">
      {/* --- HERO SECTION (Split Layout) --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-600 shadow-sm">
            ✨ Applications for 2026 are now open
          </div>

          <h1 className="font-serif text-5xl lg:text-7xl font-medium leading-tight text-dark">
            Get admitted on time. <br />
            <span className="relative inline-block">
              Every time.
              {/* Yellow Underline Decoration */}
              <span className="absolute bottom-2 left-0 w-full h-3 bg-brand-yellow -z-10 opacity-60"></span>
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
            We ensure 100% of your university applications are handled
            professionally. Transport your education to the EU era within days.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/universities">
              <button className="px-8 py-4 bg-dark text-white text-lg font-medium rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
                Find Your University
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 bg-white border border-gray-200 text-dark text-lg font-medium rounded-lg hover:bg-gray-50 transition-all">
                Book a Consultation
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Visual Image (Styled nicely) */}
        <div className="relative">
          {/* Decorative shapes behind the image */}
          <div className="absolute -top-4 -right-4 w-2/3 h-2/3 bg-brand-yellow rounded-2xl opacity-20"></div>
          <div className="absolute -bottom-4 -left-4 w-2/3 h-2/3 bg-blue-100 rounded-2xl opacity-50"></div>

          {/* FIX: Changed 'h-125' (invalid) to 'h-[500px]' (valid) */}
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/MainPagePicture.jpg"
              alt="Student in Romania"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* // To view what is the problem with data fetching.
       <div>
        <DebugView />
      </div> */}
      {/*   //To clean n/a data's from firebase.
       <div>
        <CleanupTool />
      </div> */}
      {/* --- BENTO GRID FEATURES (Inspired by the dropdown in your screenshot) --- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">
          Everything you need to study abroad
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-2xl mb-6">
              🇪🇺
            </div>
            <h3 className="font-serif text-xl font-bold mb-3">
              EU Recognized Degree
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Earn a globally recognized diploma that opens doors across Europe
              and the world.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl mb-6">
              💰
            </div>
            <h3 className="font-serif text-xl font-bold mb-3">
              Affordable Living
            </h3>
            <p className="text-gray-600 leading-relaxed">
              One of the lowest costs of living in Europe. Rent and food are
              very student-friendly.
            </p>
          </div>

          {/* Feature 3 (Wide card?) - Let's keep it standard grid for now */}
          <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mb-6">
              🚀
            </div>
            <h3 className="font-serif text-xl font-bold mb-3">Fast Internet</h3>
            <p className="text-gray-600 leading-relaxed">
              Ranked top 10 globally for internet speed. Perfect for research
              and streaming.
            </p>
          </div>
        </div>
      </section>
      {/* --- CITIES SECTION (Clean Style) --- */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl mb-4">Top Student Cities</h2>
              <p className="text-gray-500">
                Explore the most vibrant hubs in Romania.
              </p>
            </div>
            <Link
              href="/universities"
              className="hidden md:block text-dark font-medium hover:underline decoration-brand-yellow decoration-2 underline-offset-4"
            >
              View all cities →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CityCard name="Bucharest" imageSrc="/bucharest.jpg" />
            <CityCard name="Cluj-Napoca" imageSrc="/cluj.jpg" />
            <CityCard name="Timișoara" imageSrc="/timisoara.jpg" />
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Minimalist City Card ---
function CityCard({ name, imageSrc }: { name: string; imageSrc: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative h-64 overflow-hidden rounded-xl mb-4">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="font-serif text-xl font-bold flex items-center gap-2">
        {name}
        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-yellow">
          ➝
        </span>
      </h3>
    </div>
  );
}
