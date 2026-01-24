"use client";

import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import emailjs from "@emailjs/browser";

interface DropdownItem {
  id: string;
  name: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // <--- This stores the phone number
    universityId: "",
    programId: "",
    message: "",
  });

  const [universities, setUniversities] = useState<DropdownItem[]>([]);
  const [programs, setPrograms] = useState<DropdownItem[]>([]);
  const [loadingUnis, setLoadingUnis] = useState(true);
  const [loadingProgs, setLoadingProgs] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const EmailjsKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
  const EmailService = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const EmailjsTemplateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;

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

  const handleUniversityChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const uniId = e.target.value;
    setFormData({ ...formData, universityId: uniId, programId: "" });
    setPrograms([]);

    if (!uniId) return;

    setLoadingProgs(true);
    try {
      const snap = await getDocs(
        collection(db, "universities", uniId, "programs"),
      );
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      list.sort((a, b) => a.name.localeCompare(b.name));
      setPrograms(list);
    } catch (e) {
      console.error("Error loading programs", e);
    } finally {
      setLoadingProgs(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const uniName =
      universities.find((u) => u.id === formData.universityId)?.name ||
      "Not Selected";
    const progName =
      programs.find((p) => p.id === formData.programId)?.name ||
      "General Inquiry";

    const templateParams = {
      to_name: "Admin",
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone, // <--- Sends phone to email
      university: uniName,
      program: progName,
      message: formData.message,
    };

    emailjs
      .send(
        EmailService, // Your Service ID
        EmailjsTemplateID, // Your Template ID
        templateParams,
        EmailjsKey, // Your Public Key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setIsSubmitting(false);
          setIsSuccess(true);
          setFormData({
            name: "",
            email: "",
            phone: "",
            universityId: "",
            programId: "",
            message: "",
          });
        },
        (err) => {
          console.log("FAILED...", err);
          setIsSubmitting(false);
          alert("Failed to send email. Please try again.");
        },
      );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="bg-white w-full max-w-7xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[800px] relative z-10">
        {/* LEFT SIDE */}
        <div className="lg:w-4/12 relative bg-gray-900 text-white p-12 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80"
              alt="Campus Background"
              className="w-full h-full object-cover opacity-50 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-gray-900/50 to-gray-900/40 mix-blend-multiply"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-xs font-bold tracking-widest uppercase text-red-300 mb-4">
              Admissions
            </h2>
            <h1 className="text-4xl font-bold leading-tight mb-6 drop-shadow-sm">
              Find your <br /> future path.
            </h1>
            <p className="text-red-100 text-sm leading-relaxed font-medium">
              Select a university and program to send a direct inquiry to the
              admissions department.
            </p>
          </div>

          <div className="relative z-10 mt-12 space-y-6">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-sm">
              <h3 className="font-bold text-lg text-white">Student Support</h3>
              <p className="text-red-200 text-xs mt-1">
                Available Mon-Fri, 9am-5pm
              </p>
              <p className="text-white text-sm mt-2 font-mono tracking-wider">
                +40 773 750 608
              </p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-sm">
              <h3 className="font-bold text-lg text-white">Direct Email</h3>
              <p className="text-white text-sm mt-2 font-mono tracking-wider">
                roedubridge@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="lg:w-8/12 bg-white p-10 lg:p-14 flex flex-col justify-center">
          {isSuccess ? (
            <div className="text-center animate-fade-in-up max-w-md mx-auto">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                ✓
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Inquiry Sent!
              </h2>
              <p className="text-gray-500 mb-8">
                We have forwarded your message to the selected university.
                Expect a reply soon.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-red-600 font-bold hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Make an Inquiry
                </h2>
                <p className="text-gray-500 mt-2">
                  Details about the specific program will be included in your
                  message.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. NAME & EMAIL ROW */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* 2. PHONE ROW (NEW) */}
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition-all"
                    placeholder="+40 700 000 000"
                  />
                </div>

                {/* 3. DYNAMIC DROPDOWNS */}
                <div className="p-6 bg-red-50 rounded-2xl border border-red-100 space-y-6">
                  <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>{" "}
                    Academic Interest
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                        Target University
                      </label>
                      <select
                        required
                        value={formData.universityId}
                        onChange={handleUniversityChange}
                        disabled={loadingUnis}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition-all cursor-pointer"
                      >
                        <option value="">
                          {loadingUnis ? "Loading..." : "Select University"}
                        </option>
                        {universities.map((uni) => (
                          <option key={uni.id} value={uni.id}>
                            {uni.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                        Specific Program
                      </label>
                      <select
                        required
                        value={formData.programId}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            programId: e.target.value,
                          })
                        }
                        disabled={!formData.universityId || loadingProgs}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition-all cursor-pointer disabled:bg-gray-100 disabled:text-gray-400"
                      >
                        <option value="">
                          {!formData.universityId
                            ? "← Select University First"
                            : loadingProgs
                              ? "Loading Programs..."
                              : "Select Program (Optional)"}
                        </option>
                        {programs.map((prog) => (
                          <option key={prog.id} value={prog.id}>
                            {prog.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. MESSAGE */}
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-600 transition-all resize-none"
                    placeholder="I am interested in applying for..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
