'use client';

import { Phone } from 'lucide-react';

export default function WhatsAppWidget() {
  const handleWhatsAppClick = () => {
    window.open('https://api.whatsapp.com/send?phone=6285691442135', '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer flex items-center justify-center w-14 h-14"
      aria-label="Contact via WhatsApp"
    >
      <Phone size={24} />
    </button>
  );
}