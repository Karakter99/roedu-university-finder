"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

// ... [Keep your Interfaces Program and University here] ...
interface Program {
  id: string;
  name: string;
  faculty: string;
  language: string;
  degreeType: string;
  duration?: string;
  credits?: string;
}

interface University {
  name: string;
  city: string;
  image: string;
  description: string;
}

export default function UniversityDetailClient({ id }: { id: string }) {
  const router = useRouter();

  // 🛠️ CRITICAL FIX: Properly decode the ID to match Firebase format
  // "Agora%20University" -> "Agora University"
  const cleanId = React.useMemo(() => {
    try {
      return id ? decodeURIComponent(id) : "";
    } catch {
      console.error("Failed to decode ID:", id);
      return id; // Fallback to raw ID
    }
  }, [id]);

  const [university, setUniversity] = useState<University | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  // ... [Keep your Filter States here] ...
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  useEffect(() => {
    if (!cleanId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("🔍 Looking for Firestore Doc ID:", cleanId);

        // 1. Get University
        const uniDoc = await getDoc(doc(db, "universities", cleanId));

        if (uniDoc.exists()) {
          setUniversity(uniDoc.data() as University);

          // 2. Get Programs
          const progSnap = await getDocs(
            collection(db, "universities", cleanId, "programs"),
          );

          const progData = progSnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as Program[];

          setPrograms(progData);
        } else {
          console.error("❌ Doc not found. ID used:", cleanId);
          setUniversity(null);
        }
      } catch (e) {
        console.error("Error loading data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cleanId]);

  // ... [Keep your Render Logic exactly as it was] ...

  // 1. Loading State
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-gray-400">
        Loading...
      </div>
    );

  // 2. Not Found State
  if (!university)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">University Not Found</h1>
        <p className="text-gray-500">Could not find ID: {cleanId}</p>
        <button
          onClick={() => router.push("/universities")}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );

  // 3. Filter Logic (Copy-paste your previous filter logic here)
  const uniqueLevels = [
    "All",
    ...Array.from(new Set(programs.map((p) => p.degreeType)))
      .filter(Boolean)
      .sort(),
  ];
  const uniqueLanguages = [
    "All",
    ...Array.from(new Set(programs.map((p) => p.language)))
      .filter(Boolean)
      .sort(),
  ];

  const filteredPrograms = programs.filter((prog) => {
    const matchSearch =
      prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.faculty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchLevel =
      selectedLevel === "All" || prog.degreeType === selectedLevel;
    const matchLanguage =
      selectedLanguage === "All" || prog.language === selectedLanguage;
    return matchSearch && matchLevel && matchLanguage;
  });

  const programsByFaculty = filteredPrograms.reduce(
    (acc, prog) => {
      const faculty = prog.faculty || "General Departments";
      if (!acc[faculty]) acc[faculty] = [];
      acc[faculty].push(prog);
      return acc;
    },
    {} as Record<string, Program[]>,
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER HERO */}
      <div className="h-[50vh] w-full overflow-hidden relative bg-gray-900">
        <Image
          src={
            university.image ||
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f"
          }
          alt={university.name}
          fill
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => router.back()}
              className="mb-6 text-sm text-white/80 hover:text-white flex items-center gap-2 transition-colors"
            >
              ← Back to list
            </button>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase bg-red-600 rounded-md">
              {university.city}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-2 shadow-sm">
              {university.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 -mt-10 relative z-10 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About the University
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {university.description || "No description available."}
          </p>
        </div>

        {/* CONTROLS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
            <div className="flex-grow w-full">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                Search Programs
              </label>
              <input
                type="text"
                placeholder="Find a specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all bg-gray-50 focus:bg-white"
              />
            </div>
            <div className="w-full md:w-48">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
              >
                {uniqueLevels.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-48">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
              >
                {uniqueLanguages.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* LIST */}
        {filteredPrograms.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <h3 className="text-lg font-bold text-gray-600">
              No programs found
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in-up">
            {Object.entries(programsByFaculty).map(([faculty, progs]) => (
              <div
                key={faculty}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-bold text-lg text-gray-800">{faculty}</h3>
                  <span className="text-xs font-bold bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-full">
                    {progs.length} Programs
                  </span>
                </div>
                <div className="divide-y divide-gray-100">
                  {progs.map((prog) => (
                    <div
                      key={prog.id}
                      className="p-6 hover:bg-red-50/30 transition-colors flex flex-col md:flex-row justify-between md:items-center gap-4 group"
                    >
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                          {prog.name}
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded border border-blue-100">
                            🎓 {prog.degreeType}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-50 text-green-700 px-2.5 py-1 rounded border border-green-100">
                            🗣️ {prog.language}
                          </span>
                          {prog.duration && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-purple-50 text-purple-700 px-2.5 py-1 rounded border border-purple-100">
                              ⏱️ {prog.duration} Years
                            </span>
                          )}
                          {prog.credits && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-orange-50 text-orange-700 px-2.5 py-1 rounded border border-orange-100">
                              ⭐ {prog.credits} Credits
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="shrink-0">
                        <a
                          href="/contact"
                          className="hidden group-hover:inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700 transition-all"
                        >
                          Inquire
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
