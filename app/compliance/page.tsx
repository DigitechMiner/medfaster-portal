'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Sidebar from '@/components/sidebar'
import { Trash2 } from "lucide-react";
import { FileUploadZone } from "@/components/FileUploadZone";

const uploadFields = [
  { key: "operatingLicense", label: "Operating License", required: true },
  { key: "accreditationCertificate", label: "Accreditation Certificate", required: true },
  { key: "provincialHealthLicense", label: "Provincial Health License", required: true },
  { key: "accreditationCanadaCertificate", label: "Accreditation Canada Certificate", required: true }
];

type UploadState = {
  file: File | null;
  progress: number;
  uploading: boolean;
};

const Compliance = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [uploads, setUploads] = useState<Record<string, UploadState>>({
    operatingLicense: { file: null, progress: 0, uploading: false },
    accreditationCertificate: { file: null, progress: 0, uploading: false },
    provincialHealthLicense: { file: null, progress: 0, uploading: false },
    accreditationCanadaCertificate: { file: null, progress: 0, uploading: false }
  });

  // Simulate upload
  const handleFileChange = (key: string, file: File) => {
    if (!file) return;
    setUploads(prev => ({
      ...prev,
      [key]: { file, progress: 0, uploading: true }
    }));
    let progress = 0;
    const simulate = () => {
      progress += Math.random() * 25 + 15;
      if (progress >= 100) {
        setUploads(prev => ({
          ...prev,
          [key]: { file, progress: 100, uploading: false }
        }));
      } else {
        setUploads(prev => ({
          ...prev,
          [key]: { ...prev[key], progress: Math.min(100, Math.floor(progress)), uploading: true }
        }));
        setTimeout(simulate, 350);
      }
    };
    simulate();
  };

  const handleRemove = (key: string) => {
    setUploads(prev => ({
      ...prev,
      [key]: { file: null, progress: 0, uploading: false }
    }));
  };

  function handleLeftArrow() {
    router.push("/contact_info");
  }
  function handleRightArrowOrSubmit() {
    setShowModal(true);
  }

  return (
    <div className="h-screen w-full flex">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        {/* Top Nav */}
        <div className="absolute top-0 right-0 flex gap-6 pr-6 pt-6 z-10 py-4">
          <Button
            type="button"
            variant="ghost"
            className="w-12 h-12 bg-white border border-gray-300 shadow-none flex items-center justify-center"
            onClick={handleLeftArrow}
          >
            <ArrowLeft className="h-6 w-6 text-black" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-12 h-12 bg-white border border-gray-300 shadow-none flex items-center justify-center"
            onClick={handleRightArrowOrSubmit}
          >
            <ArrowRight className="h-8 w-8 text-black" />
          </Button>
        </div>
        {/* Card Content */}
        <div className="flex justify-center items-start mt-2 scale-82">
          <Card className="w-full max-w-6xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Compliance Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {uploadFields.map(field => {
                  const state = uploads[field.key];
                  return (
                    <div
                      key={field.key}
                      className="relative bg-gray-50 rounded p-6 border flex flex-col min-h-[290px] max-w-[500px] w-full"
                    >
                      <div className="text-[15px] font-medium mb-3">
                        {field.label} <span className="text-orange-500">*</span>
                      </div>
                      <FileUploadZone
                        onFileSelect={file => handleFileChange(field.key, file)}
                      />
                      {state.file && (
                        <div className="mt-4">
                          <div className="font-medium break-words">{state.file.name}</div>
                          <div className="text-sm text-gray-500">
                            {Math.round(state.file.size / 1024)} KB • {state.uploading ? "Uploading..." : "Complete"}
                          </div>
                          <Progress value={state.progress} className="mt-2 h-2" />
                          <div className="text-xs text-gray-500 mt-1">{state.progress}%</div>
                        </div>
                      )}
                      {state.file && (
                        <button
                          className="absolute top-6 right-6 text-gray-400 hover:text-red-600"
                          onClick={() => handleRemove(field.key)}
                          type="button"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
              {/* Save & Continue button */}
              <div className="flex justify-end mt-8">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 text-base"
                  type="button"
                  onClick={handleRightArrowOrSubmit}
                >
                  Save & continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl flex flex-col items-center px-10 py-10 min-w-[350px]">
            <CheckCircle className="w-16 h-16 mb-4 text-green-500" />
            <div className="font-semibold text-xl text-center mb-1">Your organisation is set!</div>
            <div className="text-black font-medium text-center mb-4">We’ll notify you via email once verified.</div>
            <div className="text-gray-500 mb-3 text-center">Start posting jobs now?</div>
            <Button className="bg-orange-500 hover:bg-orange-600 w-full" onClick={() => { /* Navigate or close modal */ }}>
              Post a Job
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compliance;
