"use client";

import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Sidebar from "./components/sidebar";

// Schemas
const orgSchema = z.object({
  photo: z.any().optional(),
  orgName: z.string().min(1, "Organization Name is required"),
  orgType: z.string().min(1, "Organization Type is required"),
  email: z.string().email("Invalid email"),
  contactNumber: z.string().min(1, "Contact Number is required"),
  website: z.string().min(1, "Website is required"),
  businessNumber: z.string().min(1, "Business Number is required"),
  address: z.string().min(1, "Street Address is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  country: z.string().min(1, "Country is required"),
});

const contactSchema = z.object({
  primaryContact: z.string().min(1, "Primary Contact is required"),
  contactName: z.string().min(1, "Contact Name is required"),
  designation: z.string().min(1, "Designation is required"),
  contactEmail: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
});

const complianceSchema = z.object({
  operatingLicense: z.any().optional(),
  accreditationCertificate: z.any().optional(),
  provincialLicense: z.any().optional(),
  canadaCertificate: z.any().optional(),
});

type OrgDetailsType = z.infer<typeof orgSchema>;
type ContactType = z.infer<typeof contactSchema>;
type ComplianceType = z.infer<typeof complianceSchema>;

const steps = ["Organization Details", "Contact Information", "Compliance Verification"];
const schemas = [orgSchema, contactSchema, complianceSchema];

const allDefaultValues: [OrgDetailsType, ContactType, ComplianceType] = [
  {
    photo: null,
    orgName: "",
    orgType: "",
    email: "",
    contactNumber: "",
    website: "",
    businessNumber: "",
    address: "",
    postalCode: "",
    city: "",
    province: "",
    country: "",
  },
  {
    primaryContact: "",
    contactName: "",
    designation: "",
    contactEmail: "",
    phone: "",
  },
  {
    operatingLicense: null,
    accreditationCertificate: null,
    provincialLicense: null,
    canadaCertificate: null,
  },
];

const provinces = [
  { label: "Ontario (ON)", value: "Ontario (ON)" },
  { label: "Quebec (QC)", value: "Quebec (QC)" },
];
const orgTypes = [
  { label: "Hospital", value: "Hospital" },
  { label: "Clinic", value: "Clinic" },
];

export default function SmartFormPage() {
  const [step, setStep] = useState(0);

  const methods = useForm<any>({
    resolver: zodResolver(schemas[step]),
    mode: "onTouched",
    defaultValues: allDefaultValues[step],
  });

  useEffect(() => {
    methods.reset(allDefaultValues[step]);
  }, [step]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    if (e.target.files && e.target.files.length > 0) {
      methods.setValue(name, e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      methods.setValue(name, e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const goToNextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const goToPrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const onNext = methods.handleSubmit(() => setStep((prev) => prev + 1));
  const onSubmit = methods.handleSubmit((data) => {
    console.log("Form Data:", data);
    alert(JSON.stringify(data, null, 2));
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar step={step} />
      <main className="flex-1 px-8 py-6">
        {/* Top Navigation */}
        <div className="flex justify-end gap-2 mb-6">
          <Button
            type="button"
            variant="ghost"
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={goToPrevStep}
            disabled={step === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={goToNextStep}
            disabled={step === steps.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <FormProvider {...methods}>
          <form
            className="bg-white p-8 rounded-xl border border-gray-200"
            onSubmit={step < steps.length - 1 ? onNext : onSubmit}
            encType="multipart/form-data"
          >
            <h2 className="font-bold text-xl mb-6">{steps[step]}</h2>

            {/* Step 1: Organization Details */}
            {step === 0 && (
              <>
                <FormItem className="mb-6">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Upload Organization Photo <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                  <div 
                    className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-gray-300 transition-colors relative cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "photo")}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">
                      <label htmlFor="photo-upload" className="text-orange-600 font-medium cursor-pointer">
                        Click to upload
                      </label>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Supports images, max 5MB per file.</p>
                    <Input
                      type="file"
                      id="photo-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "photo")}
                    />
                  </div>
                </FormItem>

                <div className="grid grid-cols-2 gap-5">
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Organization Name</FormLabel>
                    <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                    <FormControl>
                      <Input {...methods.register("orgName")} className="mt-1" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Organization Type</FormLabel>
                    <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                    <Select onValueChange={(value) => methods.setValue("orgType", value)}>
                      <FormControl>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {orgTypes.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-4">
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Official Email Address</FormLabel>
                    <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                    <FormControl>
                      <Input {...methods.register("email")} className="mt-1" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Contact Number (landline or mobile)
                    </FormLabel>
                    <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                    <FormControl>
                      <Input {...methods.register("contactNumber")} className="mt-1" />
                    </FormControl>
                  </FormItem>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-4">
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Organisation Website</FormLabel>
                    <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                    <FormControl>
                      <Input {...methods.register("website")} className="mt-1" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Canadian Business Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                    <FormControl>
                      <Input {...methods.register("businessNumber")} className="mt-1" />
                    </FormControl>
                  </FormItem>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-4">
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Street Address</FormLabel>
                    <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                    <FormControl>
                      <Input {...methods.register("address")} className="mt-1" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Postal Code <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                    <FormControl>
                      <Input {...methods.register("postalCode")} className="mt-1" />
                    </FormControl>
                  </FormItem>
                </div>

                <div className="grid grid-cols-3 gap-5 mt-4">
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Province</FormLabel>
                    <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                    <Select onValueChange={(v) => methods.setValue("province", v)}>
                      <FormControl>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select Province" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {provinces.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      City <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                    <FormControl>
                      <Input {...methods.register("city")} className="mt-1" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Country <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                    <FormControl>
                      <Input {...methods.register("country")} className="mt-1" />
                    </FormControl>
                  </FormItem>
                </div>
              </>
            )}

            {/* Step 2: Contact Information */}
            {step === 1 && (
              <div className="grid grid-cols-3 gap-5">
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Primary Contact Person</FormLabel>
                  <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                  <FormControl>
                    <Input {...methods.register("primaryContact")} className="mt-1" />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Contact Person Name</FormLabel>
                  <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                  <FormControl>
                    <Input {...methods.register("contactName")} className="mt-1" />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Contact Person Designation</FormLabel>
                  <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                  <FormControl>
                    <Input {...methods.register("designation")} className="mt-1" />
                  </FormControl>
                </FormItem>
                <FormItem className="col-span-2">
                  <FormLabel className="text-sm font-medium text-gray-700">Contact Person Email</FormLabel>
                  <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                  <FormControl>
                    <Input {...methods.register("contactEmail")} className="mt-1" />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Contact Person Phone</FormLabel>
                  <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                  <FormControl>
                    <Input {...methods.register("phone")} className="mt-1" />
                  </FormControl>
                </FormItem>
              </div>
            )}

            {/* Step 3: Compliance Verification */}
            {step === 2 && (
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Operating License", name: "operatingLicense" },
                  { label: "Accreditation Certificate", name: "accreditationCertificate" },
                  { label: "Provincial Health License", name: "provincialLicense" },
                  { label: "Accreditation Canada Certificate", name: "canadaCertificate" },
                ].map((f) => (
                  <FormItem key={f.name}>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      {f.label} <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormMessage className="text-red-600 text-xs font-medium mb-1" />
                    <div 
                      className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors relative cursor-pointer"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, f.name)}
                    >
                      <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">
                        <label htmlFor={`${f.name}-upload`} className="text-orange-600 font-medium cursor-pointer">
                          Click to upload
                        </label>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Supports PDF/images, max 10MB per file.</p>
                      <Input
                        type="file"
                        id={`${f.name}-upload`}
                        className="hidden"
                        accept=".pdf,image/*"
                        onChange={(e) => handleFileChange(e, f.name)}
                      />
                    </div>
                  </FormItem>
                ))}
              </div>
            )}

            <div className="flex mt-8 justify-end">
              <Button type="submit" className="bg-[#F4781B] hover:bg-[#d5650e] text-white px-6 py-2 rounded-lg">
                {step === steps.length - 1 ? "Submit" : "Save & continue"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </main>
    </div>
  );
}
