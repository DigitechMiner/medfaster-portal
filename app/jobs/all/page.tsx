"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { JobListingCard } from "../../../components/card/JobCard";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_TOP_JOB_LISTINGS } from "../constants/jobs";
import { BUTTON_LABELS } from "../constants/messages";
import { AppLayout } from "@/components/global/app-layout";

const AllJobsPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <AppLayout>
      {/* Header */}
      <div className="pb-4 sm:pb-6 lg:pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              size="icon"
              className="w-11 h-11 rounded-lg bg-white border flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </Button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Jobs</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-orange-500 font-semibold">All Jobs</span>
            </div>
          </div>
          <Button
            onClick={() => router.push("/jobs/create")}
            variant="ghost"
            size="lg"
            className="px-4 sm:px-6 lg:px-8 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-xs sm:text-sm"
          >
            {BUTTON_LABELS.POST_JOB}
          </Button>
        </div>
      </div>

      {/* Job Listing Cards */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {ALL_TOP_JOB_LISTINGS.map((job) => (
            <div
              key={job.id}
              onClick={() => {
                router.push(`/jobs/${job.id}`);
              }}
            >
              <JobListingCard job={job} />
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default AllJobsPage;
