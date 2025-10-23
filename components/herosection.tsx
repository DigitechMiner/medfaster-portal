'use client'

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FileUploadZone } from "./FileUploadZone";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  const [form, setForm] = useState({
    photo: null as File | null,
    orgName: "",
    orgType: "hospital",
    email: "",
    contact: "",
    website: "",
    businessNumber: "",
    address: "",
    postalCode: "",
    province: "ontario",
    city: "",
    country: "Canada",
  });
  const [loading, setLoading] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, photo: e.target.files?.[0] || null });
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleOrgTypeChange(value: string) { setForm({ ...form, orgType: value }); }
  function handleProvinceChange(value: string) { setForm({ ...form, province: value }); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });

    await fetch("/api/organization", {
      method: "POST",
      body: formData,
    });
    setLoading(false);

    router.push("contact_info")
  }

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="absolute top-0 right-0 flex gap-6 pl-250 pt-6 z-10 scale-120">
        <Button
          type="button"
          variant="ghost"
          className="w-12 h-12 bg-white border border-gray-300  shadow-none flex items-center justify-center"
        >
          <ArrowLeft className="h-6 w-6 text-gray-400" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-12 h-12 bg-white border border-gray-300  shadow-none flex items-center justify-center"
       onClick={()=>  router.push("contact_info")}
       >
          <ArrowRight className="h-8 w-8 text-black" />
        </Button>
      </div>

      {/* Form Card */}
      <Card className="w-full max-w-7xl border shadow-lg p-0 mt-25 h-[780px]">
        <CardHeader className="pb-2 px-6 pt-6">
          <CardTitle className="text-2xl font-semibold">Organization Details</CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <form className="grid grid-cols-2 gap-x-6 gap-y-4" onSubmit={handleSubmit}>
            <div className="col-span-2 mb-1">
              <Label htmlFor="photo">Upload Organization Photo *</Label>
          <FileUploadZone />
              <p className="text-muted-foreground text-xs mt-1">Supports images, max 5MB per file.</p>
            </div>
            <div>
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                name="orgName"
                id="orgName"
                value={form.orgName}
                onChange={handleChange}
                placeholder="Narayana Hospital"
                className="focus:border-orange-500"
              />
            </div>
            <div>
              <Label htmlFor="orgType">Organization Type</Label>
              <Select value={form.orgType} onValueChange={handleOrgTypeChange}>
                <SelectTrigger id="orgType" className="w-full focus:border-orange-500">
                  <SelectValue placeholder="Hospital" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="clinic">Clinic</SelectItem>
                  <SelectItem value="ngo">NGO</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="email">Official Email Address</Label>
              <Input
                name="email"
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="narayanahospital@gmail.com"
                className="focus:border-orange-500"
              />
            </div>
            <div>
              <Label htmlFor="contact">Contact Number (landline or mobile)</Label>
              <Input
                name="contact"
                id="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="022 7647 7363"
                className="focus:border-orange-500"
              />
            </div>
            <div>
              <Label htmlFor="website">Organisation Website</Label>
              <Input
                name="website"
                id="website"
                value={form.website}
                onChange={handleChange}
                placeholder="www.narayanahospital.com"
                className="focus:border-orange-500"
              />
            </div>
            <div>
              <Label htmlFor="businessNumber">Canadian Business Number *</Label>
              <Input
                name="businessNumber"
                id="businessNumber"
                value={form.businessNumber}
                onChange={handleChange}
                placeholder="AHSGH56A"
                className="focus:border-orange-500"
              />
            </div>
            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input
                name="address"
                id="address"
                value={form.address}
                onChange={handleChange}
                placeholder="1234 Maple Street"
                className="focus:border-orange-500"
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code *</Label>
              <Input
                name="postalCode"
                id="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="M5H 2N2"
                className="focus:border-orange-500"
              />
            </div>
            <div>
              <Label htmlFor="province">Province</Label>
              <Select value={form.province} onValueChange={handleProvinceChange}>
                <SelectTrigger id="province" className="w-full focus:border-orange-500">
                  <SelectValue placeholder="Ontario (ON)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ontario">Ontario (ON)</SelectItem>
                  <SelectItem value="quebec">Quebec (QC)</SelectItem>
                  <SelectItem value="bc">British Columbia (BC)</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                name="city"
                id="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Ontario"
                className="focus:border-orange-500"
              />
            </div>
            <div>
              <Label htmlFor="country">Country *</Label>
              <Input
                name="country"
                id="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Canada"
                className="focus:border-orange-500"
              />
            </div>
            <div className="col-span-2 flex justify-end pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {loading ? "Saving..." : "Save & continue"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
