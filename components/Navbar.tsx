'use client';

import Image from 'next/image';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Navbar({ activeTab = 'beranda', onTabChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    handleTabClick('beranda');
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block md:bg-white md:border-b md:border-gray-200 w-full">
        {/*
          NAVBAR_HEIGHT: this fixed height controls the navbar's box.
          Because the logo and menu below are positioned with `absolute`,
          resizing/repositioning them will NEVER change this container's
          height anymore — the two are now fully decoupled.
          👉 Change the navbar's overall height here (currently 100px).
        */}
        <div className="relative w-full h-[117px]">

          {/*
            LOGO_POSITION_AND_SIZE
            - Position on screen: controlled by `left-[24px]` (distance from
              left edge) and `top-1/2 -translate-y-1/2` (vertically centered).
              ⚠️ Always use square brackets like `left-[30px]` for a custom
              number — plain `left-30` is NOT a valid Tailwind class (Tailwind's
              spacing scale skips straight from 28 to 32) so it silently does
              nothing. `left-[Npx]` accepts ANY number.
              Swap the vertical centering for a fixed `top-[Npx]` if you'd
              rather set the vertical position manually instead of auto-center.
            - Size: controlled ONLY by the w-[...] h-[...] on the inner
              `relative` div a few lines below (currently 300px x 92px).
              Change that div freely — it will no longer affect navbar height.
          */}
          <button
            onClick={handleLogoClick}
            className="absolute left-[0px] top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="relative w-[350px] h-[142px]"> {/* 👈 LOGO SIZE: edit w-[...] h-[...] here */}
              <Image
                src="https://res.cloudinary.com/dyromez82/image/upload/v1783281334/Artboard_25_300x_cgubub.png"
                alt="PSI Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </button>

          {/*
            MENU_POSITION_AND_SIZE
            - Position on screen: controlled by `right-[24px]` (distance from
              right edge) and `top-1/2 -translate-y-1/2` (vertically centered).
              Same rule applies: use `right-[Npx]`, not plain `right-30`.
            - Spacing between items: `gap-[24px]` below (same bracket rule).
            - Font size of each link: `text-[15px]` on each individual button.
          */}
          <div className="absolute right-[24px] top-1/2 -translate-y-1/2 flex items-center gap-[24px]">
            <button
              onClick={() => handleTabClick('beranda')}
              className={`text-[17px] font-medium whitespace-nowrap transition-colors ${
                activeTab === 'beranda'
                  ? 'text-[#2F2F2F]'
                  : 'text-[#CE0000]'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => handleTabClick('struktur-pengurus')}
              className={`text-[17px] font-medium  whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'struktur-pengurus'
                  ? 'text-[#2F2F2F]'
                  : 'text-[#CE0000]'
              }`}
            >
              Struktur Pengurus
            </button>
            <button
              onClick={() => handleTabClick('agenda-absensi')}
              className={`text-[17px] font-medium  whitespace-nowrap transition-colors ${
                activeTab === 'agenda-absensi'
                  ? 'text-[#2F2F2F]'
                  : 'text-[#CE0000]'
              }`}
            >
              Agenda & Absensi
            </button>
            <button className="text-[#2F2F2F] hover:opacity-70 transition-opacity flex-shrink-0 ml-3">
              <Search size={19} strokeWidth={4} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - Static flow */}
      <nav className="md:hidden bg-white border-b border-gray-200 w-full h-[120px] flex items-center justify-between px-4">
        {/* Logo Mobile — cropped to icon + "PSI" only (tagline hidden).
            Uses object-cover (NOT object-contain) — contain never crops, it
            only shrinks the whole image to fit, which is why the tagline
            kept showing before. object-cover fills/crops the box, anchored
            left via object-left.
            Nav parent sudah `flex items-center`, jadi logo otomatis center
            vertikal di dalam box navbar (h-[120px]).
            Ukuran w-[235px] h-[79px] ini hasil ukur pixel langsung dari
            screenshot referensi (bukan tebakan) — supaya "PSI" kebaca utuh
            (sebelumnya cuma "P" yang kelihatan) dan skala logo match sama
            besar-kecilnya di referensi.
            👉 h-[...] = tinggi tampilan logo (bukan tinggi navbar).
            👉 w-[...] = seberapa banyak yang kelihatan — sempitkan kalau
               tagline "Partai Super Tbk." masih nongol, lebarkan kalau
               tulisan "PSI"-nya sendiri masih kepotong. */}
        <button 
          onClick={handleLogoClick}
          className="cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0 relative w-[235px] h-[79px] overflow-hidden"
        >
          <Image
            src="https://res.cloudinary.com/dyromez82/image/upload/v1783281334/Artboard_25_300x_cgubub.png"
            alt="PSI Logo"
            fill
            priority
            className="object-cover object-left"
          />
        </button>

        {/* Mobile Menu Icons - Right side */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button className="text-black stroke-[2.5] w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
            <Search size={22} strokeWidth={2.5} />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#CE0000] stroke-[2.5] w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
          >
            <Menu size={22} strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      {/* Backdrop Overlay — fade in/out mengikuti mobileMenuOpen (inline style,
          bukan class Tailwind, biar animasinya pasti jalan apapun config-nya) */}
      <div 
        className="md:hidden fixed inset-0 bg-black/50 z-40"
        style={{
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transition: 'opacity 300ms ease-in-out',
        }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer — slide in dari kiri saat mobileMenuOpen, slide out saat
          ditutup (inline style, bukan class Tailwind, biar animasinya pasti
          jalan apapun config-nya) */}
      <div
        className="md:hidden fixed top-0 left-0 h-screen w-[75vw] bg-red-600 z-50 flex flex-col"
        style={{
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transition: 'transform 300ms ease-out',
        }}
      >
          {/* Close Button - Top Right */}
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="self-end p-6 text-white hover:text-gray-200 transition-colors"
          >
            <X size={32} />
          </button>

          {/* Menu Items - Vertical */}
          <div className="flex flex-col gap-6 px-6 py-4">
            <button
              onClick={() => handleTabClick('beranda')}
              className={`text-left text-xl font-bold transition-colors ${
                activeTab === 'beranda'
                  ? 'text-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => handleTabClick('struktur-pengurus')}
              className={`text-left text-xl font-bold transition-colors ${
                activeTab === 'struktur-pengurus'
                  ? 'text-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Struktur Pengurus
            </button>
            <button
              onClick={() => handleTabClick('agenda-absensi')}
              className={`text-left text-xl font-bold transition-colors ${
                activeTab === 'agenda-absensi'
                  ? 'text-white'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Agenda & Absensi
            </button>
          </div>
      </div>
    </>
  );
}