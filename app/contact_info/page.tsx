'use client'

import HeroSection from '@/components/herosection'
import Sidebar from '@/components/sidebar'
import React from 'react'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from 'next/navigation';


const ContactInfo = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    primaryContact: "",
    contactName: "",
    contactDesignation: "",
    contactEmail: "",
    contactPhone: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleLeftArrow() {
    router.push("/org_details");
  }

  function handleRightArrow() {
    router.push("/compliance");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Submit or navigate...
    router.push("/compliance");
  }
  return (
    <div className="h-full w-full flex">
        <div className=""> 
        <Sidebar />
        </div>
        <div className="absolute top-0 right-0 flex gap-6 pr-6 pt-6 z-10 py-4">
        <Button
          type="button"
          variant="ghost"
          className="w-12 h-12 bg-white border border-gray-300  shadow-none flex items-center justify-center"
          onClick={handleLeftArrow}
       >
          <ArrowLeft className="h-6 w-6 text-black" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-12 h-12 bg-white border border-gray-300  shadow-none flex items-center justify-center"
       onClick={handleRightArrow}
       >
          <ArrowRight className="h-8 w-8 text-black" />
        </Button>
      </div>
        {/* Main Content */}
      <main className="flex-1 flex flex-col mt-15">
        {/* Form Card */}
        <div className="flex justify-center items-start mt-10">
          <Card className="w-full max-w-6xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="col-span-3 grid grid-cols-3 gap-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="primaryContact" className='mb-3'>Primary Contact Person</Label>
                  <Input
                    id="primaryContact"
                    name="primaryContact"
                    value={form.primaryContact}
                    onChange={handleChange}
                    placeholder="Sanjay Shah"
                  />
                </div>
                <div>
                  <Label htmlFor="contactName" className='mb-3'>Contact Person Name</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={form.contactName}
                    onChange={handleChange}
                    placeholder="Ajay Shah"
                  />
                </div>
                <div>
                  <Label htmlFor="contactDesignation" className='mb-3'>Contact Person Designation</Label>
                  <Input
                    id="contactDesignation"
                    name="contactDesignation"
                    value={form.contactDesignation}
                    onChange={handleChange}
                    placeholder="HR"
                  />
                </div>
                <div />
                <div className="col-span-4 grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contactEmail" className='mb-3'>Contact Person Email</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={form.contactEmail}
                      onChange={handleChange}
                      placeholder="sanjayshah@narayana.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone" className='mb-3'>Contact Person Phone</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      value={form.contactPhone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div className="col-span-3 flex justify-end">
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white mt-3">
                    Save & continue
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default ContactInfo
