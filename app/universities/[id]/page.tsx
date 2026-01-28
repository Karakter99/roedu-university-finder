import React from "react";
import UniversityDetailClient from "./UniversityDetailClient"; // Verify path

// ⚠️ Next.js 15: params is a Promise
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UniversityPage({ params }: PageProps) {
  // 1. Await the params to get the actual ID object
  const resolvedParams = await params;

  // 2. Pass the raw ID (e.g., "Agora%20University...") to the client
  return <UniversityDetailClient id={resolvedParams.id} />;
}
