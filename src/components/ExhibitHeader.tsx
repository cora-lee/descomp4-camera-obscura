import React from 'react';
import { RotateCcw } from 'lucide-react';

interface ExhibitHeaderProps {
  onResetApparatus: () => void;
}

export const ExhibitHeader: React.FC<ExhibitHeaderProps> = ({ onResetApparatus }) => {
  return (
    <div>
      {/* ======================================================== */}
      {/* 1. TOP BAR (Strict 3-Zone Contract)                     */}
      {/* ======================================================== */}
      <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-stone-200 bg-white sticky top-0 z-20">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-serif font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors"
        >
          Camera Obscura Explorer
        </a>

        {/* Zone 2: 4 single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-stone-600">
          <a
            href="#explanation"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            How It Works
          </a>
          <a
            href="#simulation"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Ray Diagram
          </a>
          <a
            href="#steps"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Three Steps
          </a>
          <a
            href="#chronology"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Historical Milestones
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onResetApparatus}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-stone-500" />
            <span>Reset Apparatus</span>
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. EXHIBIT HERO & CONCISE EXPLANATION                   */}
      {/* ======================================================== */}
      <section id="explanation" className="pt-10 pb-8 border-b border-stone-200">
        {/* Archival metadata line */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-widest mb-3">
          <span>Gallery IV · Natural Philosophy</span>
          <span aria-hidden="true">·</span>
          <span>Geometrical Optics</span>
          <span aria-hidden="true">·</span>
          <span>Accession No. OPT-1604</span>
        </div>

        {/* Main Exhibit Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight text-balance leading-tight max-w-4xl">
          The Darkened Chamber: How Light Projects the Living World
        </h1>

        {/* Concise Curatorial Explanation */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4 text-stone-700 leading-relaxed font-sans text-sm sm:text-base max-w-prose">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900">
              A <strong className="text-stone-900 font-semibold">camera obscura</strong> (Latin for <em>"darkened chamber"</em>) is an ancient optical instrument that forms a living picture without any glass lenses. When a completely darkened room or enclosed box is fitted with a tiny puncture or pinhole on one wall, light from the sunlit outside world enters the interior.
            </p>
            <p>
              Because light travels strictly in straight rectilinear lines, each point of the external scene can only cast a single narrow beam through the aperture. Light rays originating from the gilded finial atop UC Berkeley&apos;s Sather Tower (The Campanile) must travel downward to pass through the opening, landing at the bottom of the opposite wall. Conversely, rays from the granite esplanade and surrounding redwoods travel upward through the hole to strike near the ceiling.
            </p>
            <p>
              The straight paths of light cross at the pinpoint threshold, casting a naturally <strong className="text-stone-900 font-semibold">inverted (upside-down)</strong> and <strong className="text-stone-900 font-semibold">reversed (left-to-right)</strong>, but vivid, dynamic image onto the back surface.
            </p>
          </div>

          {/* Curatorial Plaque Sidebar with Core Physical Invariants */}
          <div className="lg:col-span-4 bg-white border border-stone-200/90 p-5 shadow-xs">
            <span className="text-[11px] uppercase tracking-wider font-mono text-stone-400 block mb-2">
              Foundational Principles & Specimen
            </span>
            <div className="mb-3 pb-2.5 border-b border-stone-100 text-xs text-stone-600">
              <strong className="text-stone-900 block font-serif text-sm">Specimen: Sather Tower (The Campanile)</strong>
              <span>UC Berkeley campus landmark (307 ft), featuring Beaux-Arts granite masonry, a 16-ft Great Clock, and 61-bell carillon.</span>
            </div>
            <ul className="space-y-3 text-xs text-stone-700">
              <li className="pb-2.5 border-b border-stone-100 flex items-start gap-2">
                <span className="text-stone-900 font-mono font-semibold">I.</span>
                <span>
                  <strong className="text-stone-900">Rectilinear Propagation:</strong> Light moves in uninterrupted straight rays unless reflected or refracted.
                </span>
              </li>
              <li className="pb-2.5 border-b border-stone-100 flex items-start gap-2">
                <span className="text-stone-900 font-mono font-semibold">II.</span>
                <span>
                  <strong className="text-stone-900">Aperture Filtering:</strong> The pinhole isolates individual rays, preventing chaotic wash-out from ambient scattering.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-stone-900 font-mono font-semibold">III.</span>
                <span>
                  <strong className="text-stone-900">Natural Inversion:</strong> Geometric ray intersection flips the image axes mechanically without mirrors.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
