import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import UniversityDetailClient from "./UniversityDetailClient";

// 1. GENERATE STATIC PARAMS (Run at Build Time)
export async function generateStaticParams() {
  // Queries Firebase to get all University IDs so Next.js can build pages for them
  try {
    const snapshot = await getDocs(collection(db, "universities"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (e) {
    console.error("Error generating static params:", e);
    return [];
  }
}

// 2. THE PAGE COMPONENT
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // In Next.js 15+, params is a Promise. We await it.
  const resolvedParams = await params;

  return <UniversityDetailClient id={resolvedParams.id} />;
}
