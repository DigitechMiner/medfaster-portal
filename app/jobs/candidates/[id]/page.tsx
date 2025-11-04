"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { CandidateDetailContent } from "./components/CandidateDetailContent";
import { Job, StatusType } from "../../types/job.types";
import { JOBS_DATA } from "../../constants/jobs";
import { AppLayout } from "@/components/global/app-layout";

// This is a placeholder - in a real app, you'd fetch the candidate data based on the ID
const getCandidateById = (
  id: string
): { job: Job; status: StatusType } | null => {
  // Search through all statuses to find the candidate
  const statuses: StatusType[] = [
    "applied",
    "shortlisted",
    "interviewing",
    "hired",
  ];

  for (const status of statuses) {
    const candidate = JOBS_DATA[status].find((job) => job.id.toString() === id);
    if (candidate) {
      return { job: candidate, status };
    }
  }

  return null;
};

export default function CandidateDetailPage() {
  const router = useRouter();
  const params = useParams();
  const candidateId = params?.id as string;

  const candidateData = getCandidateById(candidateId);

  const handleBack = () => {
    router.push("/jobs");
  };

  return (
    <AppLayout>
      {!candidateData ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Candidate not found
            </h1>
            <p className="text-gray-600 mb-4">
              The candidate you're looking for doesn't exist.
            </p>
            <button
              onClick={() => router.push("/jobs")}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            >
              Back to Jobs
            </button>
          </div>
        </div>
      ) : (
       
          <CandidateDetailContent
            candidate={candidateData.job}
            status={candidateData.status}
            onBack={handleBack}
          />
       
      )}
    </AppLayout>
  );
}
