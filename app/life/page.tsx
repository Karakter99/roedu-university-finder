import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function StudyInRomania() {
  return (
    <main className="min-h-screen bg-cream">
      {/* --- HERO SECTION WITH VIDEO BACKGROUND --- */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* 1. THE VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            {/* Ensure 'rovideo.mp4' is inside your 'public' folder */}
            <source src="/rovideo.mp4" type="video/mp4" />
          </video>

          {/* 2. THE OVERLAY (Essential for text visibility) */}
          {/* We add a black layer at 50% opacity so white text pops */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* 3. THE CONTENT (Now White Text) */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 px-6">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm font-medium text-white shadow-sm">
            🇷🇴 Discover Romania
          </span>
          <h1 className="font-serif text-5xl lg:text-7xl font-medium text-white leading-tight drop-shadow-lg">
            More than just a degree. <br />
            <span className="text-brand-yellow italic">An experience.</span>
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Romania offers the perfect balance of high-quality EU education,
            vibrant student life, and stunning natural beauty—all at a cost that
            lets you actually enjoy it.
          </p>
        </div>
      </section>

      {/* --- 1. PRACTICAL INFO (Moved Up & Redesigned) --- */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* COST OF LIVING CARD */}
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
            <div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-2xl mb-6">
                💰
              </div>
              <h3 className="font-serif text-3xl text-gray-900 mb-2">
                Affordable Living
              </h3>
              <p className="text-gray-500 mb-8">
                Enjoy a high quality of life without the high price tag.
              </p>

              <div className="space-y-4">
                {/* Rent Row */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="font-medium text-gray-700">
                    🏠 Rent (Studio/Shared)
                  </span>
                  <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100">
                    €200 - €450
                  </span>
                </div>
                {/* Food Row */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="font-medium text-gray-700">
                    🍔 Food & Groceries
                  </span>
                  <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100">
                    €150 - €200
                  </span>
                </div>
                {/* Internet Row */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="font-medium text-gray-700">
                    🚀 Gigabit Internet
                  </span>
                  <span className="font-bold text-green-600 bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100">
                    €8 / mo
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Includes student discounts on Gyms & Museums
              </span>
            </div>
          </div>

          {/* TRANSPORT CARD */}
          <div className="bg-dark text-white p-10 rounded-3xl shadow-2xl shadow-gray-900/20 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden">
            {/* Decorative Background Blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <div>
              <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-2xl mb-6 backdrop-blur-sm">
                🚆
              </div>
              <h3 className="font-serif text-3xl text-white mb-2">
                Student Transport
              </h3>
              <p className="text-gray-400 mb-8">
                Explore the entire country for next to nothing.
              </p>

              <div className="bg-white/10 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
                <span className="block text-5xl font-bold text-brand-yellow mb-2">
                  90% OFF
                </span>
                <p className="text-gray-300 font-medium">
                  Massive discount on all trains within Romania.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-gray-400 text-sm leading-relaxed">
                Romania has an extensive train network connecting every major
                student city. Weekend trip to the mountains? It costs less than
                a coffee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. LIFESTYLE & CULTURE --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 space-y-24 border-t border-gray-200">
        {/* Nightlife */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/degree.jpg"
              alt="EU Recognized Degree"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="font-serif text-4xl font-medium">EU Recognized</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Your degree is fully accredited within the European Union and
              recognized worldwide. Whether you want to work in Germany, France,
              or the USA, your diploma is valid.
            </p>
          </div>
        </div>

        {/* Nature (Reversed) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <h2 className="font-serif text-4xl font-medium">Work Rights</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              International students can legally work{" "}
              <strong>4 hours/day (20h/week)</strong> without a permit. Tech
              giants like Microsoft, Amazon, and Oracle are constantly hiring in
              Bucharest and Cluj.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/work.jpg"
              alt="Romanian Nature"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
              <Image
                src="/Owadanyer.jpg"
                alt="Romanian Nature"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="font-serif text-4xl font-medium">Living History</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Walk through medieval cities like <strong>Sighișoara</strong> and{" "}
              <strong>Brașov</strong> that look straight out of a fairytale.
              Visit world-famous castles like{" "}
              <strong> Bran (Dracula’s Castle)</strong> and the stunning Peleș
              Castle.
            </p>
          </div>
        </div>
      </section>

      {/* --- 3. THE EU ADVANTAGE --- */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-medium mb-4">
              Why Study Here?
            </h2>
            <p className="text-gray-600 text-lg">
              World-class opportunities with European benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Feature 1 */}
            <div className="flex flex-col items-start text-left group">
              <div className="w-20 h-20 bg-blue-100 text-4xl flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                🇪🇺
              </div>
              <h3 className="font-serif text-4xl font-medium text-gray-900 mb-6">
                Night Life in Romania
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Romania is famous for its festivals. <strong>UNTOLD</strong>,{" "}
                <strong>Electric Castle</strong>, and{" "}
                <strong>Saga Festival</strong> bring the world&apos;s best DJs
                here. Cities like Cluj-Napoca and Bucharest have an &quot;Old
                Town&quot; packed with pubs that stay open until sunrise.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start text-left group">
              <div className="w-20 h-20 bg-green-100 text-4xl flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                💼
              </div>
              <h3 className="font-serif text-4xl font-medium text-gray-900 mb-6">
                Breathtaking Nature
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                From the wild <strong>Carpathian Mountains</strong> (perfect for
                skiing and hiking) to the sunny beaches of the{" "}
                <strong>Black Sea</strong> and the unique
                <strong> Danube Delta</strong>, you have everything. Experience
                four distinct seasons: snowy winters and hot, sunny summers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start text-left group">
              <div className="w-20 h-20 bg-orange-100 text-4xl flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                ✈️
              </div>
              <h3 className="font-serif text-4xl font-medium text-gray-900 mb-6">
                Travel Freedom
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                With your Residence Permit, you can travel visa-free to many
                European countries. Plus, low-cost flights to Paris, Rome, or
                London start from just €15.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 text-center">
        <h2 className="font-serif text-4xl mb-8">
          Ready to start your journey?
        </h2>
        <div className="flex justify-center gap-4">
          <Link href="/universities">
            <button className="px-8 py-4 bg-dark text-white font-medium rounded-lg hover:bg-gray-800 transition-all">
              Find a University
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-8 py-4 bg-white border border-gray-200 text-dark font-medium rounded-lg hover:bg-gray-50 transition-all">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
