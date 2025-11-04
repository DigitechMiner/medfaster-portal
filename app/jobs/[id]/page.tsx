"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/global/navbar";
import Modal from "@/components/modal";
import { TopJob } from "../types/job.types";
import { ALL_TOP_JOB_LISTINGS } from "../constants/jobs";
import {
  DEFAULT_JOB_FORM_DATA,
  DEFAULT_TOPICS,
  Topic,
} from "../constants/form";
import { JobFormData } from "../components/JobForm";
import { JobDetailHeader } from "./components/JobDetailHeader";
import { JobDetailSections } from "./components/JobDetailSections";
import { JobEditForm } from "./components/JobEditForm";
import { AppLayout } from "@/components/global/app-layout";

export default function JobDetailPageRoute() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<TopJob | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState<JobFormData>(DEFAULT_JOB_FORM_DATA);
  const [topics, setTopics] = useState<Topic[]>(DEFAULT_TOPICS);

  useEffect(() => {
    const jobId = params?.id;
    if (jobId) {
      const jobIdNumber = typeof jobId === "string" ? parseInt(jobId, 10) : Number(jobId);
      const foundJob = ALL_TOP_JOB_LISTINGS.find((j) => j.id === jobIdNumber);
      
      if (foundJob) {
        setJob(foundJob);
      } else {
        // Job not found, redirect to jobs page
        router.push("/jobs");
      }
    }
  }, [params, router]);

  const handleBack = () => {
    router.push("/jobs");
  };

  const updateFormData = (updates: Partial<JobFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const addQuestion = (topicId: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              questions: [
                ...topic.questions,
                {
                  id: `${topicId}-${topic.questions.length + 1}`,
                  text: "",
                },
              ],
            }
          : topic
      )
    );
  };

  const removeQuestion = (topicId: string, questionId: string) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              questions: topic.questions.filter((q) => q.id !== questionId),
            }
          : topic
      )
    );
  };

  const updateQuestion = (
    topicId: string,
    questionId: string,
    text: string
  ) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              questions: topic.questions.map((q) =>
                q.id === questionId ? { ...q, text } : q
              ),
            }
          : topic
      )
    );
  };


  const handleCloseJobClick = () => {
    setShowCloseModal(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    console.log("Save all:", formData, topics);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setIsEditing(false);
  };

  // Job details JSON data
  const jobDetailsData = {
    info: {
      hospitalIcon: "/svg/hospital-iconn.svg",
      hospitalName: "Narayana Hospital",
      jobTitle: "Nurse",
    },
    grid: {
      location: "Toronto, ON",
      experience: "2-3+ Years",
      jobType: "Full Time",
      salary: "$12k - $15k",
    },
    contact: {
      email: "narayanehealth@gmail.com",
      phone: "+022 7647 7363",
      website: "www.narayanehealth.com",
    },
    content: {
      description:
        "Lorem ipsum dolor sit amet consectetur. Fusce volutpat nec placerat faucibus in tellus et mattis. Dooer elementum quis aliquam neque. Elementum maecenas vitae locus laoreet eu. Aliquam egestas vel diam etiam purus. Imperdiet commodo pellentesque neque nontius placerat fringilla sapien ac nulla. Quis scelerisque metus etiam tortor. Feugiat arcu vitae ultaricomplor mincius vesibuium interdum. Neque felis ultricies ut dolor faucibus.",
      specializations: [
        "Cardiology",
        "Cardiology",
        "Orthopaedics",
        "Cardiology",
        "Orthopaedics",
        "Neurology",
      ],
      qualifications: [
        "Cardiology",
        "Cardiology",
        "Orthopaedics",
        "Cardiology",
        "Orthopaedics",
        "Neurology",
      ],
      interviewQuestions: [
        {
          topic: "Questions Topic 1",
          questions: [
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
          ],
        },
        {
          topic: "Questions Topic 2",
          questions: [
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
          ],
        },
        {
          topic: "Questions Topic 3",
          questions: [
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
          ],
        },
        {
          topic: "Questions Topic 4",
          questions: [
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
            "Lorem ipsum dolor sit amet consectetur Non commodo tellus non enim sit?",
          ],
        },
      ],
    },
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Show Edit Form
  if (isEditing) {
    return (
      <JobEditForm
        formData={formData}
        topics={topics}
        updateFormData={updateFormData}
        addQuestion={addQuestion}
        removeQuestion={removeQuestion}
        updateQuestion={updateQuestion}
        onCancel={handleEditCancel}
        onSave={handleSave}
        showSuccessModal={showSuccessModal}
        onSuccessClose={handleSuccessClose}
      />
    );
  }

  // Show Job Detail
  return (
    <AppLayout>

      <JobDetailHeader
        onBack={handleBack}
        onCloseJob={handleCloseJobClick}
        applicantCount={job.applicantCount}
      />
      <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg border border-gray-200">
        <JobDetailSections job={job} jobDetails={jobDetailsData} />
      </div>
      <Modal
        visible={showCloseModal}
        onClose={() => setShowCloseModal(false)}
        variant="confirmation"
        title="Are you sure want to close this job?"
        message=""
        primaryButtonText="Yes"
        secondaryButtonText="No"
        onConfirm={() => {
          // TODO: Add logic to actually close the job
          setShowCloseModal(false);
          router.push("/jobs");
        }}
        onCancel={() => setShowCloseModal(false)}
      />
      <Modal
        visible={showSuccessModal}
        onClose={handleSuccessClose}
        title="Job updated successfully"
        message="Your job post has been updated."
        buttonText="Done"
      />
    </AppLayout>
  );
}
