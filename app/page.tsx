import Link from "next/link";
import Image from "next/image";
import Services from "./components/Services"; // Ensure Services.tsx is in your components folder

export default function Home() {
  return (
    // DOT PATTERN BACKGROUND
    <div className="min-h-screen bg-cream bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px]">
      {/* --- HERO SECTION --- */}
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

        {/* Right: Visual Image */}
        <div className="relative">
          <div className="absolute -top-4 -right-4 w-2/3 h-2/3 bg-brand-yellow rounded-2xl opacity-20"></div>
          <div className="absolute -bottom-4 -left-4 w-2/3 h-2/3 bg-blue-100 rounded-2xl opacity-50"></div>
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

      {/* --- FEATURES GRID --- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">
          Everything you need to study abroad
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* --- SERVICES SECTION --- */}
      {/* This explains the 7 steps in detail */}
      <Services />

      {/* --- SERVICE PACKAGES SECTION --- */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl mb-4">Choose Your Path</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From application basics to full concierge relocation support, we
              have a package that fits your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-12">
            {/* Package A: The Starter */}
            <PricingCard
              title="Basic"
              price="Starter"
              description="Perfect for students who just need help getting the acceptance letter."
              features={[
                "University & Program Selection",
                "Document Preparation Guide",
                "University Application Submission",
                "Acceptance Letter Support",
              ]}
            />

            {/* Package B: The Standard (Highlighted) */}
            <PricingCard
              title="Standard"
              price="Popular"
              highlighted={true}
              description="Our most popular choice. Includes visa support to ensure you arrive safely."
              features={[
                "University & Program Selection",
                "Document Preparation Guide",
                "University Application Submission",
                "Acceptance Letter Support",
                "Student Visa Assistance",
              ]}
            />

            {/* Package C: The Premium */}
            <PricingCard
              title="Premium"
              price="Full Service"
              description="The complete stress-free experience. We handle everything including your ID."
              features={[
                "University & Program Selection",
                "Document Preparation Guide",
                "University Application Submission",
                "Acceptance Letter Support",
                "Student Visa Assistance",
                "Final Enrollment Assistance",
                "Residence Permit (CNP) Application",
              ]}
            />
          </div>

          {/* Single Call to Action for all packages */}
          <div className="text-center">
            <Link href="/contact">
              <button className="px-10 py-4 bg-brand-yellow text-dark text-lg font-bold rounded-full hover:bg-yellow-400 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                Apply for a Package →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- CITIES SECTION --- */}
      <section className="bg-white">
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

// --- SUB-COMPONENTS ---

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

function PricingCard({
  title,
  price,
  features,
  description,
  highlighted = false,
}: {
  title: string;
  price: string;
  features: string[];
  description: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`relative p-8 rounded-2xl transition-all duration-300 flex flex-col h-full ${
        highlighted
          ? "bg-gray-900 text-white shadow-xl scale-105 z-10 border border-gray-800"
          : "bg-white text-gray-900 border border-gray-200 hover:shadow-lg"
      }`}
    >
      {highlighted && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-yellow text-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Best Value
        </div>
      )}

      <div className="mb-6">
        <h3
          className={`font-serif text-2xl font-bold mb-2 ${highlighted ? "text-white" : "text-gray-900"}`}
        >
          {title}
        </h3>
        <p
          className={`text-sm ${highlighted ? "text-gray-400" : "text-gray-500"}`}
        >
          {description}
        </p>
      </div>

      <div
        className={`h-px w-full mb-6 ${highlighted ? "bg-gray-700" : "bg-gray-100"}`}
      ></div>

      <ul className="space-y-4 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span
              className={`mt-0.5 shrink-0 ${highlighted ? "text-brand-yellow" : "text-green-600"}`}
            >
              ✔
            </span>
            <span className={highlighted ? "text-gray-300" : "text-gray-600"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
