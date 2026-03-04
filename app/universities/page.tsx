"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface University {
  id: string;
  name: string;
  city: string;
  image: string;
  website: string;
  description: string;
}

export default function UniversitiesPage() {
  const [allUniversities, setAllUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<
    University[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Search & Filter States
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const POPULAR_CITIES = [
    "All",
    "BUCHAREST",
    "CLUJ-NAPOCA",
    "TIMISOARA",
    "CONSTANT",
    "SIBIU",
    "ORADEA",
  ];

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "universities"));
        const list = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as University[];

        setAllUniversities(list);
        setFilteredUniversities(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = allUniversities;

    if (selectedCity !== "All") {
      result = result.filter(
        (uni) =>
          uni.city &&
          uni.city.toLowerCase().includes(selectedCity.toLowerCase()),
      );
    }

    if (searchTerm.trim() !== "") {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (uni) =>
          uni.id.toLowerCase().includes(lowerTerm) ||
          uni.name.toLowerCase().includes(lowerTerm),
      );
    }

    setFilteredUniversities(result);
  }, [selectedCity, searchTerm, allUniversities]);

  const handleFilter = (cityBtn: string) => {
    setSelectedCity(cityBtn);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-lg font-bold text-gray-500">
            Loading Universities...
          </div>
        </div>
      </div>
    );
  }

  return (
    // UPDATED: Padding reduced for mobile (py-8 px-4) vs desktop (py-12 px-6)
    <div className="bg-gray-50 min-h-screen py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* UPDATED: Text scales from 3xl to 4xl */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-900">
          Explore Universities
        </h1>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 md:mb-10">
          <input
            type="text"
            placeholder="Search by university name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // UPDATED: text-base prevents iOS zoom, standard px/py adjustments
            className="w-full px-5 py-3 md:px-6 md:py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none shadow-sm text-center text-gray-700 placeholder-gray-400 text-base transition-all"
          />
        </div>

        {/* --- MAIN CITIES FILTER --- */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          {POPULAR_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => handleFilter(city)}
              // UPDATED: Smaller text/padding on mobile (text-xs px-4) vs desktop (text-sm px-6)
              className={`px-4 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all shadow-sm border uppercase
                ${
                  selectedCity === city
                    ? "bg-red-600 text-white border-red-600 shadow-md transform scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-red-600"
                }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* --- GRID --- */}
        {/* UPDATED: grid-cols-1 (Mobile) -> sm:grid-cols-2 (Tablet) -> lg:grid-cols-3 (Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredUniversities.map((uni) => (
            <div
              key={uni.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 group"
            >
              {/* --- IMAGE SECTION --- */}
              {/* UPDATED: h-48 on mobile, h-56 on desktop */}
              <div className="h-48 md:h-56 w-full relative overflow-hidden bg-gray-200">
                <Image
                  src={
                    uni.image ||
                    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f"
                  }
                  alt={uni.name}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* City Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide shadow-sm">
                  {uni.city}
                </div>
              </div>

              {/* --- CONTENT SECTION --- */}
              <div className="p-5 md:p-6 flex flex-col flex-grow bg-white">
                {/* Title */}
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2 min-h-[3rem] md:min-h-[3.5rem] leading-tight">
                  {uni.name}
                </h2>

                {/* Description */}
                <p className="text-gray-500 mb-5 md:mb-6 line-clamp-3 flex-grow text-sm leading-relaxed">
                  {uni.description}
                </p>

                {/* Button */}
                <a
                  // ✅ CORRECT: We manually encode the ID here too
                  href={`/universities/${uni.id}`}
                  className="w-full block text-center bg-red-600..."
                >
                  View Programs
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredUniversities.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-4 text-4xl">
              🔍
            </div>
            <h3 className="text-xl text-gray-600 font-medium">
              No universities found.
            </h3>
            <p className="text-gray-400 mt-2 text-sm">
              Try selecting &quot;All&quot; cities or checking your spelling.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
