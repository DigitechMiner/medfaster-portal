"use client";

import { useState, useEffect } from "react";
import { EmptyJobState } from "./components/empty";
import { AppLayout } from "@/components/global/app-layout";
import JobsPage from "./components/JobsPage";
import { STORAGE_KEYS } from "./constants/messages";

export default function JobsPageWrapper() {
  const [hasJobs, setHasJobs] = useState(false);

  // Check if jobs exist
  // Update this logic based on your actual data source (API call, context, etc.)
  useEffect(() => {
    // Option 1: Check localStorage (set when job is created)
    const jobsExist = localStorage.getItem(STORAGE_KEYS.HAS_JOBS) === "true";
    
    // Option 2: For now, you can manually set this to true to see dashboard
    // In production, replace this with actual API call to check if jobs exist
    // const response = await fetch('/api/jobs');
    // const jobs = await response.json();
    // setHasJobs(jobs.length > 0);
    
    setHasJobs(jobsExist);
  }, []);

  return (
    <AppLayout>
      {hasJobs ? <JobsPage /> : <EmptyJobState />}
    </AppLayout>
  );
}
