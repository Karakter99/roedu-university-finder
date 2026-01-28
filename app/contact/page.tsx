"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import emailjs from "@emailjs/browser";

interface DropdownItem {
  id: string;
  name: string;
}

// 1. Sub-component to handle logic safely
function ContactFormContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");

  // --- STATE ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    packageType: "General Inquiry",
    universityId: "",
    message: "",
  });

  const [universities, setUniversities] = useState<DropdownItem[]>([]);
  const [loadingUnis, setLoadingUnis] = useState(true);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  // --- FETCH UNIVERSITIES ---
  useEffect(() => {
    const fetchUnis = async () => {
      try {
        const snap = await getDocs(collection(db, "universities"));
        const list = snap.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        list.sort((a, b) => a.name.localeCompare(b.name));
        setUniversities(list);
      } catch (e) {
        console.error("Error loading universities", e);
      } finally {
        setLoadingUnis(false);
      }
    };
    fetchUnis();
  }, []);

  // --- AUTO-SELECT PACKAGE FROM URL ---
  useEffect(() => {
    if (planParam) {
      setFormData((prev) => ({ ...prev, packageType: planParam }));
    }
  }, [planParam]);

  // --- HANDLE SUBMIT (EmailJS) ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // 1. Find the real University Name
    const selectedUniName =
      universities.find((u) => u.id === formData.universityId)?.name ||
      "Not Selected";

    // 2. Prepare data for EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      package: formData.packageType,
      university: selectedUniName,
      message: formData.message,
    };

    // 3. Send Email
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      .then(() => {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          packageType: "General Inquiry",
          universityId: "",
          message: "",
        });
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setStatus("error");
      });
  };

  return (
    // UPDATED: Padding changed from fixed p-14 to responsive p-6 lg:p-14
    <div className="lg:w-8/12 bg-white p-6 md:p-10 lg:p-14 flex flex-col justify-center">
      {status === "success" ? (
        <div className="text-center animate-fade-in-up max-w-md mx-auto py-10">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl md:text-4xl mx-auto mb-6">
            ✓
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Inquiry Sent!
          </h2>
          <p className="text-gray-500 mb-8 text-sm md:text-base">
            We have received your inquiry regarding the{" "}
            <strong>{formData.packageType || planParam}</strong> package.
            <br /> We will be in touch shortly.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="text-red-600 font-bold hover:underline"
          >
            Send another inquiry
          </button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Start Your Journey
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Fill out the form below to book your package or ask a question.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {/* PACKAGE SELECTION */}
            <div className="p-4 md:p-5 bg-yellow-50 rounded-2xl border border-yellow-200">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                Selected Package
              </label>
              <div className="relative">
                <select
                  value={formData.packageType}
                  onChange={(e) =>
                    setFormData({ ...formData, packageType: e.target.value })
                  }
                  className="w-full bg-white border border-yellow-300 text-gray-900 font-bold rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-yellow appearance-none cursor-pointer text-sm md:text-base"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Basic">Basic Package</option>
                  <option value="Standard">Standard Package (Popular)</option>
                  <option value="Premium">Premium Package</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  ▼
                </div>
              </div>
              {planParam && (
                <p className="text-xs text-green-700 mt-2 flex items-center gap-1 font-medium">
                  ✓ Automatically selected.
                </p>
              )}
            </div>

            {/* NAME & EMAIL - Stacks on mobile, side-by-side on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition-all text-sm md:text-base"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition-all text-sm md:text-base"
                />
              </div>
            </div>

            {/* PHONE & UNIVERSITY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+40 700..."
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition-all text-sm md:text-base"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  University (Optional)
                </label>
                <div className="relative">
                  <select
                    value={formData.universityId}
                    onChange={(e) =>
                      setFormData({ ...formData, universityId: e.target.value })
                    }
                    disabled={loadingUnis}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition-all appearance-none cursor-pointer text-sm md:text-base"
                  >
                    <option value="">
                      {loadingUnis ? "Loading..." : "Any / Undecided"}
                    </option>
                    {universities.map((uni) => (
                      <option key={uni.id} value={uni.id}>
                        {uni.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* MESSAGE */}
            <div className="group">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                Message
              </label>
              <textarea
                rows={3}
                placeholder="I am interested in..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition-all resize-none text-sm md:text-base"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-red-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50"
            >
              {status === "submitting" ? "Sending..." : "Submit Inquiry"}
            </button>

            {status === "error" && (
              <p className="text-red-500 text-center text-sm">
                Failed to send. Please check your connection.
              </p>
            )}
          </form>
        </>
      )}
    </div>
  );
}

// 2. Main Page Component (Wrapped in Suspense)
export default function ContactPage() {
  return (
    // UPDATED: Main container padding reduced for mobile (p-4 vs p-8)
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* UPDATED: Blobs are smaller on mobile (w-64) to prevent overflow/messy background */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-[600px] md:h-[600px] bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-[600px] md:h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      {/* UPDATED: Flex-col for mobile (stacks), lg:flex-row for desktop (side-by-side) */}
      <div className="bg-white w-full max-w-7xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[auto] lg:min-h-[700px] relative z-10">
        {/* LEFT SIDE: INFO PANEL */}
        {/* UPDATED: Padding and height adjustments for mobile */}
        <div className="lg:w-4/12 relative bg-gray-900 text-white p-8 md:p-12 flex flex-col justify-between overflow-hidden shrink-0">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80"
              alt="Campus Background"
              className="w-full h-full object-cover opacity-50 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-gray-900/50 to-gray-900/40 mix-blend-multiply"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-xs font-bold tracking-widest uppercase text-red-300 mb-2 md:mb-4">
              Contact Us
            </h2>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 md:mb-6 drop-shadow-sm">
              Ready to <br /> study in Europe?
            </h1>
            <p className="text-red-100 text-sm leading-relaxed font-medium">
              Select your package or university of interest and we will guide
              you through the entire process.
            </p>
          </div>

          {/* --- STUDENT SUPPORT SECTION --- */}
          {/* UPDATED: Margin top reduced on mobile */}
          <div className="relative z-10 mt-8 md:mt-12 space-y-6">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-sm">
              <h3 className="font-bold text-lg text-white">Student Support</h3>
              <p className="text-red-200 text-xs mt-1 mb-4">
                Available Mon-Fri, 9am-5pm
              </p>

              {/* Number 1 */}
              <div className="mb-4">
                <p className="text-white text-sm font-mono font-bold tracking-wide">
                  +40 773 750 608
                </p>
                <p className="text-red-100 text-xs mt-1 opacity-90">
                  English, Turkish, Turkmen, Russian
                </p>
              </div>

              {/* Number 2 */}
              <div>
                <p className="text-white text-sm font-mono font-bold tracking-wide">
                  +40 721 454 429
                </p>
                <p className="text-red-100 text-xs mt-1 opacity-90">
                  English, Arabic, French
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <Suspense
          fallback={<div className="p-10 text-center">Loading Form...</div>}
        >
          <ContactFormContent />
        </Suspense>
      </div>
    </div>
  );
}
