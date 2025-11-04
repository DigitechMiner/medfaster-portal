"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/global/app-layout";
import { JobForm, JobFormData } from "../../components/JobForm";
import {
  DEFAULT_JOB_FORM_DATA,
  DEFAULT_TOPICS,
  Topic,
} from "../../constants/form";
import { ALL_TOP_JOB_LISTINGS } from "../../constants/jobs";
import { TopJob } from "../../types/job.types";
import SuccessModal from "@/components/modal";

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<TopJob | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<JobFormData>(DEFAULT_JOB_FORM_DATA);
  const [topics, setTopics] = useState<Topic[]>(DEFAULT_TOPICS);

  useEffect(() => {
    const jobId = params?.id;
    if (jobId) {
      const jobIdNumber =
        typeof jobId === "string" ? parseInt(jobId, 10) : Number(jobId);
      const foundJob = ALL_TOP_JOB_LISTINGS.find(
        (j: TopJob) => j.id === jobIdNumber
      );

      if (foundJob) {
        setJob(foundJob);
        // TODO: Load existing job data into formData here
        // For now, using default data
      } else {
        router.push("/jobs");
      }
    }
  }, [params, router]);

  const updateFormData = (updates: Partial<JobFormData>) => {
    setFormData((prev: JobFormData) => ({ ...prev, ...updates }));
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
              questions: topic.questions.filter(
                (q: { id: string }) => q.id !== questionId
              ),
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
              questions: topic.questions.map(
                (q: { id: string; text: string }) =>
                  q.id === questionId ? { ...q, text } : q
              ),
            }
          : topic
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Save all:", formData, topics);
    setShowSuccessModal(true);
  };

  const handleCancel = () => {
    router.push(`/jobs/${params?.id}`);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push(`/jobs/${params?.id}`);
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Edit Job post
        </h1>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleCancel}
            className="flex-1 sm:flex-none px-4 py-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white font-medium text-sm rounded"
          >
            Preview
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 sm:flex-none px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm rounded"
          >
            Save & continue
          </button>
        </div>
      </div>

        <JobForm
          mode="edit"
          formData={formData}
          updateFormData={updateFormData}
          topics={topics}
          onAddQuestion={addQuestion}
          onRemoveQuestion={removeQuestion}
          onUpdateQuestion={updateQuestion}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          showInterviewQuestions={true}
          showBackButton={true}
          submitLabel="Save"
        />

      <SuccessModal
        visible={showSuccessModal}
        onClose={handleSuccessClose}
        title="Job updated successfully"
        message={`${job.title} - Job ID: ${params?.id} is now live and ready for applicants.`}
        buttonText="Done"
      />
    </AppLayout>
  );
}
