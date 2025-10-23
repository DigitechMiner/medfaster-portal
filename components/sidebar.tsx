'use client'

import Image from "next/image";
import img from '@/public/image.png'
import { Mail, FileText, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Step data
const sidebarSteps = [
  {
    key: 'organization',
    label: 'Organization Details',
    description: 'Enter Organization Details',
    icon: <Info className="h-5 w-5" />,
    href: '/org_details',
  },
  {
    key: 'contact',
    label: 'Contact Information',
    description: 'Choose a secure password',
    icon: <Mail className="h-5 w-5" />,
    href: '/contact_info',
  },
  {
    key: 'compliance',
    label: 'Compliance Verification',
    description: 'Submit Required Compliance Proofs',
    icon: <FileText className="h-5 w-5" />,
    href: '/compliance',
  },
];

// Sidebar component - accepts activeHref prop, falls back to pathname, then first step
export default function Sidebar({ activeHref }: { activeHref?: string }) {
  const pathname = usePathname();
  // Pick activeHref if set, else match with route, else default to first step
  const currentActive = activeHref ?? pathname ?? sidebarSteps[0].href;

  return (
    <div className="min-h-screen bg-white">
      <div className="sidebar bg-gray-50 h-screen">
        <Image
          src={img}
          width={300}
          height={1}
          alt="LOGO"
        />
        <div className="flex-1 mt-7 ml-4">
          <nav className="grid gap-3">
            {sidebarSteps.map((step, i) => {
              const active = currentActive === step.href;
              const isLast = i === sidebarSteps.length - 1;
              return (
                <Link
                  key={step.key}
                  href={step.href}
                  className={cn(
                    "flex gap-3 items-start rounded-xl px-4 py-5 group transition cursor-pointer",
                    active
                      ? "bg-gray-100 font-semibold"
                      : "hover:bg-gray-50 text-gray-700"
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  <span className="relative flex flex-col items-center">
                    <span className={cn(
                      "rounded-lg border p-2 flex items-center justify-center bg-white z-10",
                      active ? "border-black text-black" : "border-gray-200 text-gray-400"
                    )}>
                      {step.icon}
                    </span>
                    {!isLast && (
                      <span className="absolute left-1/2 top-full -translate-x-1/2 w-px h-16 bg-gray-200" />
                    )}
                  </span>
                  <span className="flex flex-col">
                    <span className={cn(
                      "text-[15px]",
                      active ? "text-black" : "text-gray-800"
                    )}>{step.label}</span>
                    <span className="text-[13px] text-gray-500">{step.description}</span>
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="px-6 pt-6 text-xs text-gray-400 flex items-center gap-2 mt-56">
          <Mail className="w-4 h-4 mr-1" /> 
          <a href="mailto:help@medfaster.com">help@medfaster.com</a>
        </div>
      </div>
    </div>
  );
}
