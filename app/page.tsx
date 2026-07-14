'use client';

import { useState } from 'react';
import UtilityBar from '@/components/UtilityBar';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import OrganizerGrid from '@/components/OrganizerGrid';
import EventSection from '@/components/EventSection';
import Footer from '@/components/Footer';
import KTAModal from '@/components/KTAModal';
import WhatsAppWidget from '@/components/WhatsAppWidget';

type TabType = 'beranda' | 'struktur-pengurus' | 'agenda-absensi';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('beranda');
  const [selectedMember, setSelectedMember] = useState<any>(null);

  return (
    <div className="w-full min-h-screen h-auto bg-white flex flex-col overflow-x-hidden">
      {/* Header - Static */}
      <div className="relative w-full">
        <UtilityBar />
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Content Area */}
      <main className="flex-1 w-full h-auto flex flex-col">
        {/* Beranda Tab */}
        {activeTab === 'beranda' && (
          <HeroBanner title="Tentang PSI" showDescription={true} />
        )}

        {/* Struktur Pengurus Tab */}
        {activeTab === 'struktur-pengurus' && (
          <OrganizerGrid onMemberClick={setSelectedMember} />
        )}

        {/* Agenda Absensi Tab */}
        {activeTab === 'agenda-absensi' && (
          <EventSection />
        )}

        {/* Footer */}
        <Footer />
      </main>

      {/* KTA Modal */}
      {selectedMember && (
        <KTAModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}

      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </div>
  );
}