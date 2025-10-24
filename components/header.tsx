'use client';

import { ArrowDownToLine, Menu } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Find Jobs', href: '/jobs' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

export default function MedFasterNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('Home');

  return (
    <header className="relative w-full bg-white flex items-center py-3 px-4">
      {/* Hamburger for Mobile - left */}
      <Button
        className="md:hidden bg-[#F4781B] text-white rounded-full p-2 z-20"
        onClick={() => setMobileOpen((o) => !o)}
      >
        <Menu />
      </Button>

      {/* Logo (center on mobile, left on desktop) */}
      <div className="flex flex-grow justify-center md:justify-start md:flex-grow-0 z-20">
        <Image
          src="/logo.png"
          height={42}
          width={300}
          alt="Medfasterrrrr"
          className="object-contain w-44 h-auto sm:w-52 md:w-[380px]"
        />
      </div>

      {/* Navbar (centered on desktop) */}
      <nav
        className="
          absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
          hidden md:flex bg-gray-100 rounded-full py-3 px-4 items-center gap-2
          min-w-[380px] max-w-xl justify-center flex-wrap
        "
      >
        {navLinks.map((link) => (
          <Button
            key={link.label}
            className={
              active === link.label
                ? 'bg-[#F4781B] text-white rounded-full font-light px-6 py-3 whitespace-nowrap'
                : 'bg-transparent text-gray-700 rounded-full font-light px-3 py-3 hover:bg-orange-100 whitespace-nowrap'
            }
            variant="ghost"
            asChild
            onClick={() => setActive(link.label)}
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </nav>

      {/* Download App Button (right side) */}
      <div className="ml-auto flex items-center z-20">
        <Button
          className="
            flex items-center bg-[#F4781B] rounded-full pl-5 pr-6 py-2 sm:pl-6 sm:pr-8 sm:py-3
            relative overflow-hidden group border-none shadow-none h-auto
            transition-all duration-300
          "
        >
          <span className="text-white text-sm sm:text-base md:text-lg font-light pr-6 pl-2">
            Download App
          </span>
          <span
            className="
              absolute right-3 sm:right-2 top-1/2 -translate-y-1/2 
              bg-white rounded-full w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center
              border border-[#F4781B]
              group-hover:bg-gray-100 transition
            "
          >
            <ArrowDownToLine
              strokeWidth={1}
              className="text-black w-5 h-5 sm:w-6 sm:h-6"
            />
          </span>
        </Button>
      </div>

      {/* Mobile Navbar Drawer */}
      {mobileOpen && (
        <div className="absolute top-[56px] left-0 w-full z-50 flex flex-col items-center bg-white border-b pb-4 md:hidden animate-fadeIn">
          {navLinks.map((link) => (
            <Button
              key={link.label}
              className={
                active === link.label
                  ? 'bg-[#F4781B] text-white rounded-full font-medium w-11/12 my-1'
                  : 'bg-transparent text-gray-700 rounded-full font-medium w-11/12 my-1 hover:bg-orange-100'
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
        </div>
      )}
    </header>
  );
}
