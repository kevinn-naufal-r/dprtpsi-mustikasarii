'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroBannerProps {
  title: string;
  showDescription?: boolean;
}

export default function HeroBanner({ title, showDescription = false }: HeroBannerProps) {
  // ── MOBILE-ONLY AUTO-SHRINK TITLE ──────────────────────────────────────
  // Bug: judul panjang (mis. "AGENDA/ABSENSI") wrap ke baris ke-2 di mobile.
  // Fix: ukur lebar judul vs lebar box, lalu turunin font-size sampai muat
  // 1 baris. Ini HANYA jalan di bawah 768px (breakpoint `md:` Tailwind).
  // Di ≥768px, fontSize inline langsung dilepas (undefined) sehingga class
  // desktop yang sudah ada (text-5xl, md:leading-[1], md:pt-[82px], dst)
  // kembali 100% yang mengontrol tampilan — tidak ada yang berubah di desktop.
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mobileFontSizePx, setMobileFontSizePx] = useState<number | undefined>(undefined);

  useEffect(() => {
    const MOBILE_BREAKPOINT = 768; // sama dengan breakpoint md: Tailwind
    const MAX_FONT_SIZE = 48; // px, setara text-5xl (ukuran awal/maksimal)
    const MIN_FONT_SIZE = 22; // px, batas bawah biar judul tetap kebaca

    const fitTitleToOneLine = () => {
      const wrap = titleWrapRef.current;
      const heading = titleRef.current;
      if (!wrap || !heading) return;

      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setMobileFontSizePx(undefined); // desktop: serahkan lagi ke class md:
        return;
      }

      let size = MAX_FONT_SIZE;
      heading.style.fontSize = `${size}px`;

      while (heading.scrollWidth > wrap.clientWidth && size > MIN_FONT_SIZE) {
        size -= 1;
        heading.style.fontSize = `${size}px`;
      }

      setMobileFontSizePx(size);
    };

    fitTitleToOneLine();
    window.addEventListener('resize', fitTitleToOneLine);
    return () => window.removeEventListener('resize', fitTitleToOneLine);
  }, [title]);

  return (
    <>
      {/* Red Banner with Title */}
      <div className="bg-[#CE0000] w-full min-h-[139px] md:h-[140px] flex items-end md:items-start justify-start px-3 pb-1 md:pb-0">
        <div ref={titleWrapRef} className="w-full min-w-0 md:min-w-[auto] overflow-hidden">
          <h1
            ref={titleRef}
            style={mobileFontSizePx ? { fontSize: `${mobileFontSizePx}px` } : undefined}
            className="text-5xl font-bold tracking-tight text-white uppercase leading-tight md:leading-[1] md:pt-[82px] whitespace-nowrap md:whitespace-normal break-words md:break-normal"
          >
            {title}
          </h1>
        </div>
      </div>

      {/* Description Section - Only show for beranda */}
      {showDescription && (
        <div className="bg-white px-4 md:px-8 py-12 md:py-10">
          <div className="max-w-full">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              Partai Solidaritas Indonesia adalah kekuatan politik baru yang ingin mengembalikan politik ke tempat yang terhormat. 
              PSI lahir dari kesadaran bahwa politik adalah sebuah tugas mulia untuk mewujudkan kebahagiaan bagi semua orang.
            </p>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
              Atas dasar itulah kami bertekad mengakhiri sengkarut politik hari ini dengan mengembalikan politik kepada nilainya yang luhur. 
              Kami ingin mendedikasikan kembali politik dengan nilai-nilai kebajikan agar lahir NEGARAWAN yang seluruh pikiran dan tindakannya 
              didaksarkan atas kepentingan yang lebih besar untuk bangsa dan negara Indonesia, bukan sekadang kepentingan pribadi politik jangka pendek.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 md:mt-12 mb-4">Visi, Misi, &amp; DNA PSI</h2>
            
            <div className="mb-4 md:mb-6">
              <h3 className="text-3xl md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Visi PSI</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Indonesia yang berkarakter kerakyatan, berkemanusiaan, berkeragaman, berkeadilan, berkemajuan dan bermartabat.
              </p>
            </div>

            <div className="mb-4 md:mb-6">
              <h3 className="text-3xl md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Misi PSI</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                1. Menggalang kekuatan nasional melalui sebuah kepemimpinan politik yang ideologis, terorganisir, dan terstruktur.
                <br />
                2. Menggalang perjuangan politik dengan nilai solidaritas nasional melanjutkan agenda reformasi dan demokratisasi.
                <br />
                3. Membangun kembali semangat republikanisme, merajut kembali rasa kebangsaan yang terserak, menanam kembali benih-benih idealisme, mendirikan kembali benteng-benteng kebhinnekaan dan membangun kembali pondasi gotong royong.
                <br />
                4. Mendorong martabat Indonesia dalam pergaulan internasional, sesuai prinsip politik bebas aktif dengan melibatkan kondisi geopolitik internasional yang sedang berkembang.
              </p>
            </div>

            <div className="mb-4 md:mb-6">
              <h3 className="text-3xl md:text-xl font-bold text-gray-900 mb-1 md:mb-2">DNA PSI</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                • Kebajikan (anti korupsi)
                <br />
                • Keragaman (anti intoleransi)
              </p>
            </div>

            <div className="mb-4 md:mb-6">
              <h3 className="text-3xl md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Trilogi identitas PSI</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                1. Menebar kebajikan
                <br />
                2. Merawat keragaman
                <br />
                3. Meneguhkan solidaritas
              </p>
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-3">Kenapa PSI?</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Hasil yang baru tidak mungkin dicapai melalui cara lama. PSI hadir bersama semua yang baru: ide baru, gagasan baru, cara baru, orang baru dan mesin yang baru. Tentu tidak mudah menjalankan hal yang baru. Karenanya KAMI membutuhkan ANDA, terutama anak muda dan perempuan Indonesia yang selama ini merasa jauh dari politik. PSI kami persembahkan untuk ANDA… karena KAMI bukan siapa-siapa TANPA ANDA! PSI sebagai partai baru tidak lagi tersandera dengan kepentingan politik lama, klientalisme, rekam jejak yang buruk, beban sejarah dan citra yang buruk terhadap partai politik sebelumnya. PSI memberikan porsi yang besar pada perempuan, sehingga gerakan politik PSI tidak hanya sekedar memenuhi syarat 30% persen perempuan, tapi juga seluruh keputusan politiknya diambil melalui keterlibatan aktif perempuan di dalamnya. PSI secara konsisten memisahkan antara dua hal yang selama ini kadang menjadi kabur, antara mengurus partai dan mengurus politik. Sejak awal PSI telah memisahkan struktur politik dengan struktur administratifnya. Tidak akan terjadi politisi mengurus administrasi partai lalu menggunakannya untuk kepentingan kekuasaan, karena partai akan diurus oleh orang-orang muda profesional yang paham betul bagaimana mengurus organisasi yang modern, profesional, bersih dan transparan.
              </p>
            </div>

            {/* CTA Button - Direct to PSI Pusat */}
            <div className="mt-10 md:mt-12">
              <a 
                href="https://psi.id/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
              >
                Partai Solidaritas Indonesia
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}