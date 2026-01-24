"use client";

import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase"; // ⚠️ Verify this path
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
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          Loading Universities...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Explore Universities
        </h1>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search by university name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none shadow-sm text-center text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* --- MAIN CITIES FILTER --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {POPULAR_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => handleFilter(city)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm border uppercase
                ${
                  selectedCity === city
                    ? "bg-red-600 text-white border-red-600 shadow-md scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-red-600"
                }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUniversities.map((uni) => (
            <div
              key={uni.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 group"
            >
              {/* --- IMAGE SECTION (Uniform Size for Photos) --- */}
              {/* h-56 fixes the height, w-full fills width, object-cover crops perfectly */}
              <div className="h-56 w-full relative overflow-hidden bg-gray-200">
                <img
                  src={
                    uni.image ||
                    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f"
                  }
                  alt={uni.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay gradient for better text readability if we add text over it later */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

                {/* City Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
                  {uni.city}
                </div>
              </div>

              {/* --- CONTENT SECTION --- */}
              <div className="p-6 flex flex-col flex-grow bg-white">
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] leading-tight">
                  {uni.name}
                </h2>
                <p className="text-gray-500 mb-6 line-clamp-3 flex-grow text-sm leading-relaxed">
                  {uni.description}
                </p>

                <a
                  href={`/universities/${encodeURIComponent(uni.id)}`}
                  className="w-full block text-center bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all uppercase text-sm tracking-wide"
                >
                  View Programs
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredUniversities.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl text-gray-600 font-medium">
              No universities found.
            </h3>
            <p className="text-gray-400 mt-2">
              Try different filters or search terms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
