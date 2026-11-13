import React, { useState } from 'react';
import { ExhibitHeader } from './components/ExhibitHeader';
import { CameraObscuraDiagram } from './components/CameraObscuraDiagram';
import { StepCards } from './components/StepCards';
import { HistoricalContext } from './components/HistoricalContext';
import { Footer } from './components/Footer';

export default function App() {
  // State for the primary experimental variable: Aperture size in millimeters (1.0mm - 16.0mm)
  const [apertureMm, setApertureMm] = useState<number>(5.0);

  const handleReset = () => {
    setApertureMm(5.0);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col selection:bg-[#EAE4D9]">
      {/* Top Bar with Navigation and Reset Button */}
      <ExhibitHeader onResetApparatus={handleReset} />

      {/* Main Exhibition Reading & Interactive Canvas */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Core Apparatus: Interactive SVG Ray Diagram with Aperture Slider */}
        <section id="simulation" className="scroll-mt-20">
          <CameraObscuraDiagram
            apertureMm={apertureMm}
            onApertureChange={setApertureMm}
          />
        </section>

        {/* 3 Step-by-Step Educational Cards */}
        <section id="steps" className="scroll-mt-20">
          <StepCards onSelectAperturePreset={setApertureMm} />
        </section>

        {/* Historical Context & Optic Philosophy */}
        <HistoricalContext />
      </main>

      {/* Required Homework Journal Footer */}
      <Footer />
    </div>
  );
}
