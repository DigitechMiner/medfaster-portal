'use client';

import { ArrowDownToLine, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/' },
  { label: 'Find Jobs', href: '/' },
  { label: 'Blog', href: '/' },
  { label: 'Contact Us', href: '/' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('Home');

  return (
    <header className="relative w-full bg-white flex items-center justify-between rounded-lg p-2 lg:p-4">
      {/* Left Side - Mobile Menu + Logo */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu Button */}
        <Button
          className="lg:hidden rounded p-2 z-20"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>

        {/* Logo */}
        <div className="flex-shrink-0 w-40 md:w-48 lg:w-[200px] flex items-center">
          <Image
            src="/img/logo.png"
            height={50}
            width={200}
            alt="MeDFaster"
            objectFit="contain"
            priority
          />
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex bg-gray-100 rounded-full py-2 px-4 items-center gap-1">
        {navLinks.map((link) => (
          <Button
            key={link.label}
            className={
              active === link.label
                ? 'bg-[#F4781B] text-white rounded-full font-medium px-6 py-2 whitespace-nowrap'
                : 'bg-transparent text-gray-700 rounded-full font-medium px-6 py-2 whitespace-nowrap'
            }
            variant="ghost"
            asChild
            onClick={() => setActive(link.label)}
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </nav>

      {/* Download Button - Desktop Only */}
      <Button className="hidden md:flex pl-6 pr-0 py-5 items-center gap-3 relative overflow-hidden">
        Download App
        <div className="bg-white rounded-full p-2 border border-[#F4781B]">
          <ArrowDownToLine className="w-4 h-4 text-black" />
        </div>
      </Button>


      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="absolute top-[calc(100%+10px)] left-0 w-full max-w-sm h-[calc(100vh-100%-30px)] z-50 flex flex-col items-center bg-white border-b rounded-lg shadow-lg lg:hidden">
          <div className="w-full max-w-sm py-4 px-4">
            {navLinks.map((link) => (
              <Button
                key={link.label}
                className={
                  active === link.label
                    ? 'bg-[#F4781B] text-white rounded-full font-medium w-full my-1'
                    : 'bg-transparent text-gray-700 rounded-full font-medium w-full my-1 hover:bg-orange-100'
                }
                variant="ghost"
                asChild
                onClick={() => {
                  setActive(link.label);
                  setMobileOpen(false);
                }}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
            
            {/* Download Button in Mobile Sidebar */}
            <Button className="pl-6 pr-0 py-5 flex items-center gap-3 relative overflow-hidden w-full my-2">
              Download App
              <div className="bg-white rounded-full p-2 border border-[#F4781B]">
                <ArrowDownToLine className="w-4 h-4 text-black" />
              </div>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
