"use client";
import { Info, Mail, FileText } from "lucide-react";
import Link from "next/link";

const steps = [
  { label: "Organization Details", description: "Enter Organization Details", icon: Info },
  { label: "Contact Information", description: "Choose a secure password", icon: Mail },
  { label: "Compliance Verification", description: "Submit Required Compliance Proofs", icon: FileText },
];

export default function Sidebar({ step }: { step: number }) {
  return (
    <aside className="min-h-screen w-72 bg-gray-50 flex flex-col justify-between py-8 border-r border-gray-200">
      <div>
        <div className="px-6 mb-12">
          <h1 className="font-bold text-2xl text-black">
            Me<span className="text-red-600">D</span>Faster<span className="text-gray-400">rrr</span>
          </h1>
        </div>
        <nav className="flex flex-col gap-2 px-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === i;
            return (
              <div key={s.label}>
                <Link href="#">
                  <div
                    className={`flex items-start gap-3 rounded-lg px-4 py-3 transition-colors ${
                      isActive
                        ? ""
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-md ${
                        isActive ? "bg-gray-100" : "bg-gray-200"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-gray-700" : "text-gray-500"}`} />
                    </div>
                    <div>
                      <div className={`font-medium text-sm ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                        {s.label}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.description}</div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
      <div className="px-6 mt-8 flex items-center gap-2 text-gray-400 text-sm">
        <Mail className="w-4 h-4" />
        <a href="mailto:help@medfaster.com">help@medfaster.com</a>
      </div>
    </aside>
  );
}
