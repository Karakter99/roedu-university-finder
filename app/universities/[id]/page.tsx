import React from "react";
import UniversityDetailClient from "./UniversityDetailClient";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

// --- ROBUST FIX FOR ALL IDs ---
export async function generateStaticParams() {
  console.log("🔥 Generating static params for universities...");

  try {
    const querySnapshot = await getDocs(collection(db, "universities"));

    // We map over EVERY university
    const params = querySnapshot.docs.map((doc) => {
      const rawId = doc.id;

      // SAFETY ENCODING:
      // encodeURIComponent turns `"` into `%22` and ` ` into `%20`
      // This creates a safe filename like "My%20University%22.html"
      // which works on Windows, Mac, and Linux.
      return {
        id: encodeURIComponent(rawId),
      };
    });

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UniversityPage({ params }: PageProps) {
  const resolvedParams = await params;

  // Pass the encoded ID to the client.
  // The client component will decode it back to find the document in Firestore.
  return <UniversityDetailClient id={resolvedParams.id} />;
}
