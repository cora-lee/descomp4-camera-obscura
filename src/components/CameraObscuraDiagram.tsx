import React, { useState } from 'react';
import { Eye, Sun, Sliders } from 'lucide-react';
import { APERTURE_PRESETS } from '../data/exhibitData';
import { SatherTowerScene } from './SatherTowerScene';

interface CameraObscuraDiagramProps {
  apertureMm: number;
  onApertureChange: (val: number) => void;
}

export const CameraObscuraDiagram: React.FC<CameraObscuraDiagramProps> = ({
  apertureMm,
  onApertureChange,
}) => {
  const [showRayPaths, setShowRayPaths] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // Aperture normalization: 1.0mm to 16.0mm
  // In SVG coordinates: aperture height in pixels
  // Min aperture pixel height: 4px; Max: 36px
  const aperturePx = 3 + (apertureMm - 1) * 2.2;
  const centerY = 210;
  const wallX = 470;
  const screenX = 820;

  // Key subject points (in SVG coordinates)
  // Sather Tower White Pyramid Spire (Top): (170, 92)
  // Sather Tower Great Clock Center at 12:00 (Mid): (170, 210)
  // Sather Tower Granite Base & Foliage (Base): (170, 325)
  const topPt = { x: 170, y: 92 };
  const midPt = { x: 170, y: 210 };
  const basePt = { x: 170, y: 325 };

  // Optical geometry:
  // Aperture upper edge: centerY - aperturePx / 2
  // Aperture lower edge: centerY + aperturePx / 2
  const apTop = centerY - aperturePx / 2;
  const apBottom = centerY + aperturePx / 2;

  // Magnification ratio M = (screenX - wallX) / (wallX - topPt.x) = (820 - 470) / (470 - 170) = 350 / 300 = 1.167
  const mag = (screenX - wallX) / (wallX - topPt.x);

  // Chief ray hits for each point
  // For top point (y = 95): passes through (wallX, centerY = 210)
  // dy/dx = (210 - 95) / 300 = +115 / 300 = +0.3833
  // y_screen = 210 + 0.3833 * 350 = 210 + 134.17 = 344.2 (bottom of projection screen)
  const topChiefY = centerY + (centerY - topPt.y) * mag;
  const baseChiefY = centerY + (centerY - basePt.y) * mag; // 210 - 134.17 = 75.8 (top of projection screen)
  const midChiefY = centerY; // 210

  // Marginal rays define circle of confusion (blur disc) spread at projection plane:
  // Spread = aperturePx * (1 + mag)
  const blurSpread = aperturePx * (1 + mag);
  const halfSpread = blurSpread / 2;

  // Brightness and Blur factors for real-time CSS rendering
  // Low aperture: very dim (0.35), zero blur (0px)
  // High aperture: bright (1.45), heavy blur (5.8px)
  const brightnessLevel = 0.3 + Math.pow(apertureMm / 16, 0.75) * 1.05;
  const blurPx = Math.max(0, (apertureMm - 1.5) * 0.42);

  // Qualitative evaluations
  const sharpnessScore = Math.max(12, Math.round(100 - (apertureMm - 1) * 6));
  const brightnessScore = Math.min(100, Math.round(18 + (apertureMm / 16) * 82));
  const circleOfConfusionMm = (0.12 + (apertureMm - 1) * 0.16).toFixed(2);

  const activePreset = APERTURE_PRESETS.find(
    (p) => Math.abs(p.diameterMm - apertureMm) < 0.2
  );

  return (
    <section className="bg-white border border-stone-200/90 shadow-sm rounded-none overflow-hidden my-8">
      {/* Exhibit Catalog Sub-Header / Plaque */}
      <div className="border-b border-stone-200 px-6 py-4 bg-[#FBF9F5] flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-stone-500">
            Exhibit Apparatus · Section II · Specimen: Sather Tower (The Campanile, UC Berkeley)
          </span>
          <h2 className="text-2xl font-serif font-medium text-stone-900 mt-0.5">
            Interactive Ray Optics & Diaphragm Simulation
          </h2>
        </div>

        {/* Visibility Toggles */}
        <div className="flex items-center gap-2 text-xs font-sans">
          <button
            type="button"
            onClick={() => setShowRayPaths(!showRayPaths)}
            className={`px-3 py-1.5 border transition-colors whitespace-nowrap ${
              showRayPaths
                ? 'bg-stone-900 text-stone-100 border-stone-900'
                : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
            }`}
          >
            {showRayPaths ? 'Light Beams: Active' : 'Light Beams: Hidden'}
          </button>
          <button
            type="button"
            onClick={() => setShowLabels(!showLabels)}
            className={`px-3 py-1.5 border transition-colors whitespace-nowrap ${
              showLabels
                ? 'bg-stone-900 text-stone-100 border-stone-900'
                : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
            }`}
          >
            {showLabels ? 'Annotations: Visible' : 'Annotations: Clean'}
          </button>
        </div>
      </div>

      {/* Main SVG Visual Diagram Canvas */}
      <div className="relative w-full bg-[#111113] overflow-hidden select-none">
        <svg
          viewBox="0 0 960 420"
          className="w-full h-auto block max-h-[560px]"
          aria-label="Interactive camera obscura ray tracing diagram"
        >
          <defs>
            {/* Gradients */}
            {/* Vintage California Poster Sky Gradient */}
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B8B9B" />
              <stop offset="30%" stopColor="#1E9FB0" />
              <stop offset="60%" stopColor="#67BBA1" />
              <stop offset="85%" stopColor="#D2E49B" />
              <stop offset="100%" stopColor="#EEF2AD" />
            </linearGradient>

            <linearGradient id="chamberWallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E1E22" />
              <stop offset="100%" stopColor="#121215" />
            </linearGradient>

            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5F2EB" />
              <stop offset="100%" stopColor="#E5DFD3" />
            </linearGradient>

            {/* Ray Cones Gradients with dynamic brightness */}
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF3B0" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#F6C85F" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E99732" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="topRayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id="baseRayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.65" />
            </linearGradient>

            <linearGradient id="midRayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.65" />
            </linearGradient>

            {/* Pattern for chamber floor */}
            <pattern id="floorGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#25252B" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* ======================================================== */}
          {/* ZONE 1: EXTERNAL SUNLIT WORLD (x: 0 -> 466) */}
          {/* ======================================================== */}
          {/* Poster Sky Backdrop */}
          <rect x="0" y="0" width="466" height="350" fill="url(#skyGrad)" />
          {/* Ground Terrain */}
          <rect x="0" y="350" width="466" height="70" fill="#0C4F44" />

          {/* Iconic "BERKELEY" Poster Typography in Sky */}
          <text
            x="200"
            y="52"
            fill="#FFFFFF"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="800"
            fontSize="26"
            letterSpacing="2.5"
            opacity="0.95"
          >
            BERKELEY
          </text>

          {/* ======================================================== */}
          {/* EXTERNAL SUBJECT: SATHER TOWER (THE CAMPANILE, UC BERKELEY) */}
          {/* ======================================================== */}
          <g id="external-subject" className="transition-opacity duration-300">
            <SatherTowerScene />
          </g>

          {/* Reference point markers on subject */}
          {showLabels && (
            <g id="subject-markers">
              <circle cx={topPt.x} cy={topPt.y} r="4" fill="#FBBF24" stroke="#1C1917" strokeWidth="1.5" />
              <circle cx={midPt.x} cy={midPt.y} r="4" fill="#60A5FA" stroke="#1C1917" strokeWidth="1.5" />
              <circle cx={basePt.x} cy={basePt.y} r="4" fill="#34D399" stroke="#1C1917" strokeWidth="1.5" />
            </g>
          )}

          {/* ======================================================== */}
          {/* ZONE 2: DARKENED CHAMBER INTERIOR (x: 474 -> 960)       */}
          {/* ======================================================== */}
          <rect x="474" y="0" width="486" height="420" fill="url(#chamberWallGrad)" />
          {/* Floor perspective in chamber */}
          <rect x="474" y="350" width="486" height="70" fill="url(#floorGrid)" opacity="0.4" />
          <line x1="474" y1="350" x2="960" y2="350" stroke="#33333C" strokeWidth="1.5" />

          {/* Back Projection Easel / White Canvas Screen at x = 820 */}
          {/* Wooden Easel Legs */}
          <line x1="826" y1="50" x2="845" y2="400" stroke="#523F2F" strokeWidth="4" />
          <line x1="820" y1="50" x2="805" y2="400" stroke="#3D2E22" strokeWidth="4" />
          <rect x="806" y="355" width="34" height="6" fill="#523F2F" />

          {/* Canvas Screen Board */}
          <rect
            x="816"
            y="55"
            width="12"
            height="300"
            rx="2"
            fill="url(#screenGrad)"
            stroke="#2B2620"
            strokeWidth="1.5"
          />
          {/* Canvas Screen Active Face (where light strikes at x = 816) */}
          <line x1="816" y1="58" x2="816" y2="352" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.9" />

          {/* ======================================================== */}
          {/* THE LIGHT RAYS (PHYSICS SIMULATION CONES & BEAMS)       */}
          {/* ======================================================== */}
          {showRayPaths && (
            <g id="optical-ray-paths" className="pointer-events-none">
              {/* TOP POINT RAYS (Spire: 170, 95 -> Aperture -> Inverted Screen Bottom) */}
              {/* Incident Cone to Aperture */}
              <polygon
                points={`${topPt.x},${topPt.y} ${wallX},${apTop} ${wallX},${apBottom}`}
                fill="url(#topRayGrad)"
                opacity={0.35 + (apertureMm / 16) * 0.3}
              />
              {/* Projected Cone inside Chamber (expanding from aperture to screen) */}
              <polygon
                points={`${wallX},${apTop} ${wallX},${apBottom} ${screenX},${topChiefY + halfSpread} ${screenX},${topChiefY - halfSpread}`}
                fill="url(#topRayGrad)"
                opacity={0.25 + (apertureMm / 16) * 0.4}
              />
              {/* Chief Ray (amber line) */}
              <line
                x1={topPt.x}
                y1={topPt.y}
                x2={screenX}
                y2={topChiefY}
                stroke="#F59E0B"
                strokeWidth={apertureMm <= 3 ? "1.5" : "1"}
                strokeDasharray={apertureMm > 3 ? "4 2" : "none"}
                opacity="0.95"
              />

              {/* BASE POINT RAYS (Portal: 170, 325 -> Aperture -> Inverted Screen Top) */}
              {/* Incident Cone */}
              <polygon
                points={`${basePt.x},${basePt.y} ${wallX},${apTop} ${wallX},${apBottom}`}
                fill="url(#baseRayGrad)"
                opacity={0.3 + (apertureMm / 16) * 0.28}
              />
              {/* Projected Cone inside Chamber */}
              <polygon
                points={`${wallX},${apTop} ${wallX},${apBottom} ${screenX},${baseChiefY + halfSpread} ${screenX},${baseChiefY - halfSpread}`}
                fill="url(#baseRayGrad)"
                opacity={0.25 + (apertureMm / 16) * 0.38}
              />
              {/* Chief Ray (emerald line) */}
              <line
                x1={basePt.x}
                y1={basePt.y}
                x2={screenX}
                y2={baseChiefY}
                stroke="#10B981"
                strokeWidth={apertureMm <= 3 ? "1.5" : "1"}
                strokeDasharray={apertureMm > 3 ? "4 2" : "none"}
                opacity="0.9"
              />

              {/* MID POINT RAYS (Clock: 170, 210 -> Aperture -> Screen Center) */}
              {/* Incident Cone */}
              <polygon
                points={`${midPt.x},${midPt.y} ${wallX},${apTop} ${wallX},${apBottom}`}
                fill="url(#midRayGrad)"
                opacity={0.28 + (apertureMm / 16) * 0.25}
              />
              {/* Projected Cone inside Chamber */}
              <polygon
                points={`${wallX},${apTop} ${wallX},${apBottom} ${screenX},${midChiefY + halfSpread} ${screenX},${midChiefY - halfSpread}`}
                fill="url(#midRayGrad)"
                opacity={0.22 + (apertureMm / 16) * 0.35}
              />
              {/* Chief Ray (blue line) */}
              <line
                x1={midPt.x}
                y1={midPt.y}
                x2={screenX}
                y2={midChiefY}
                stroke="#3B82F6"
                strokeWidth={apertureMm <= 3 ? "1.5" : "1"}
                strokeDasharray={apertureMm > 3 ? "4 2" : "none"}
                opacity="0.85"
              />

              {/* Blurred Circles of Confusion (Blur Discs) on the Screen Face */}
              <line
                x1="816"
                y1={topChiefY - halfSpread}
                x2="816"
                y2={topChiefY + halfSpread}
                stroke="#F59E0B"
                strokeWidth={Math.min(8, 2 + apertureMm * 0.4)}
                strokeLinecap="round"
                opacity="0.9"
              />
              <line
                x1="816"
                y1={baseChiefY - halfSpread}
                x2="816"
                y2={baseChiefY + halfSpread}
                stroke="#10B981"
                strokeWidth={Math.min(8, 2 + apertureMm * 0.4)}
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>
          )}

          {/* ======================================================== */}
          {/* THE PROJECTED IMAGE (ON SCREEN AT x: 816)                */}
          {/* Inverted upside-down and reversed left-to-right           */}
          {/* Dynamic blur and brightness calculated from aperture      */}
          {/* ======================================================== */}
          <g
            id="inverted-projection"
            transform={`translate(${screenX - 70}, ${centerY}) scale(-1.12, -1.12) translate(-170, -210)`}
            style={{
              filter: `blur(${blurPx}px) brightness(${brightnessLevel})`,
              opacity: 0.25 + (apertureMm / 16) * 0.75,
              transition: 'filter 120ms ease-out, opacity 120ms ease-out',
            }}
          >
            {/* Inverted Berkeley Sather Tower Scene */}
            <SatherTowerScene includeBackdrop={true} />
          </g>

          {/* ======================================================== */}
          {/* THE DIVIDING WALL & APERTURE MECHANISM (x: 466 -> 474)  */}
          {/* ======================================================== */}
          {/* Upper Wall Section */}
          <rect x="464" y="0" width="10" height={apTop} fill="#262529" stroke="#171618" strokeWidth="1" />
          <rect x="462" y="0" width="2" height={apTop} fill="#3E3D42" />

          {/* Lower Wall Section */}
          <rect x="464" y={apBottom} width="10" height={420 - apBottom} fill="#262529" stroke="#171618" strokeWidth="1" />
          <rect x="462" y={apBottom} width="2" height={420 - apBottom} fill="#3E3D42" />

          {/* Brass Diaphragm Caliper Plates */}
          {/* Upper blade */}
          <path
            d={`M 460 ${apTop - 12} L 472 ${apTop - 12} L 470 ${apTop} L 462 ${apTop} Z`}
            fill="#B8860B"
            stroke="#785507"
            strokeWidth="0.8"
          />
          {/* Lower blade */}
          <path
            d={`M 460 ${apBottom + 12} L 472 ${apBottom + 12} L 470 ${apBottom} L 462 ${apBottom} Z`}
            fill="#B8860B"
            stroke="#785507"
            strokeWidth="0.8"
          />

          {/* Crossover node dot at aperture center */}
          <circle cx={wallX} cy={centerY} r="2.5" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />

          {/* ======================================================== */}
          {/* LABELED CALLOUTS / ANNOTATIONS                           */}
          {/* ======================================================== */}
          {showLabels && (
            <g id="exhibit-labels" className="font-sans text-[11px] select-none pointer-events-none">
              {/* Label 1: External Illuminated World - Sather Tower */}
              <g transform="translate(26, 28)">
                <rect x="0" y="0" width="228" height="22" fill="#1C1917" rx="2" opacity="0.9" />
                <text x="8" y="15" fill="#FBF9F5" fontWeight="600" letterSpacing="0.3">
                  1. Specimen: Sather Tower (UC Berkeley)
                </text>
              </g>

              {/* Label 2: Rectilinear Light Rays */}
              <g transform="translate(264, 48)">
                <rect x="0" y="0" width="160" height="22" fill="#1C1917" rx="2" opacity="0.88" />
                <text x="8" y="15" fill="#FDE68A" fontWeight="500">
                  2. Straight Rectilinear Rays
                </text>
                <path d="M 80 22 L 80 38" stroke="#FBBF24" strokeWidth="1.2" strokeDasharray="2 2" />
              </g>

              {/* Label 3: The Aperture / Pinhole */}
              <g transform={`translate(378, ${Math.max(16, apTop - 36)})`}>
                <rect x="0" y="0" width="170" height="22" fill="#1C1917" rx="2" opacity="0.9" />
                <text x="8" y="15" fill="#E7E5E4" fontWeight="600">
                  3. Pinhole Aperture ({apertureMm.toFixed(1)} mm)
                </text>
                {/* Pointer to opening */}
                <line x1="85" y1="22" x2={wallX} y2={centerY} stroke="#B8860B" strokeWidth="1.2" />
              </g>

              {/* Label 4: Inversion Node */}
              <g transform="translate(425, 382)">
                <rect x="0" y="0" width="144" height="22" fill="#1C1917" rx="2" opacity="0.9" />
                <text x="8" y="15" fill="#E2E8F0" fontWeight="500">
                  4. Ray Crossover Node
                </text>
                <line x1="72" y1="0" x2={wallX} y2={centerY + 8} stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
              </g>

              {/* Label 5: Darkened Chamber */}
              <g transform="translate(560, 28)">
                <rect x="0" y="0" width="188" height="22" fill="#0A0A0C" rx="2" stroke="#33333C" strokeWidth="0.8" />
                <text x="8" y="15" fill="#D6D3D1" fontStyle="italic" fontWeight="500">
                  5. Darkened Chamber (Camera)
                </text>
              </g>

              {/* Label 6: Inverted Real Image */}
              <g transform="translate(730, 28)">
                <rect x="0" y="0" width="190" height="22" fill="#1C1917" rx="2" opacity="0.92" />
                <text x="8" y="15" fill="#FCD34D" fontWeight="600">
                  6. Inverted & Reversed Image
                </text>
                <line x1="95" y1="22" x2="816" y2="80" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="2 2" />
              </g>

              {/* Bottom Inversion Indicator */}
              <g transform="translate(720, 382)">
                <rect x="0" y="0" width="206" height="22" fill="#0A0A0C" rx="2" stroke="#33333C" strokeWidth="0.8" />
                <text x="8" y="15" fill="#6EE7B7" fontWeight="500">
                  Campanile spire hits lower screen
                </text>
                <line x1="103" y1="0" x2="816" y2={topChiefY} stroke="#10B981" strokeWidth="1" strokeDasharray="2 2" />
              </g>
            </g>
          )}
        </svg>

        {/* Live Optical Microscope / Circle of Confusion Inset Callout */}
        <div className="absolute bottom-4 right-4 bg-stone-900/95 border border-stone-700/80 p-3 shadow-lg max-w-xs text-stone-200 hidden md:block">
          <div className="flex items-center justify-between gap-3 text-xs border-b border-stone-700/70 pb-1.5 mb-2">
            <span className="font-mono uppercase tracking-wider text-stone-400">
              Screen Spot Inspection
            </span>
            <span className="font-mono text-amber-400 font-semibold">
              Ø {circleOfConfusionMm} mm
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Visual representation of single point blur circle */}
            <div className="w-12 h-12 bg-black border border-stone-800 flex items-center justify-center shrink-0">
              <div
                className="rounded-full bg-amber-400 transition-all duration-150"
                style={{
                  width: `${Math.max(3, apertureMm * 2.5)}px`,
                  height: `${Math.max(3, apertureMm * 2.5)}px`,
                  opacity: 0.35 + (apertureMm / 16) * 0.65,
                  filter: `blur(${Math.max(0, (apertureMm - 2) * 0.3)}px)`,
                }}
              />
            </div>
            <div className="text-[11px] leading-tight text-stone-300">
              {apertureMm <= 2.5 ? (
                <span>
                  <strong className="text-emerald-400">Pinhole precision:</strong> Minimal ray divergence. Rays from a single scene point converge to a minute spot.
                </span>
              ) : apertureMm <= 7.0 ? (
                <span>
                  <strong className="text-amber-300">Moderate disc:</strong> Balanced ray bundle. Clean outline with comfortable luminosity.
                </span>
              ) : (
                <span>
                  <strong className="text-rose-400">Expanded blur disc:</strong> Wide cone creates a wide circle of confusion; adjacent points overlap and smear detail.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* THE SIMPLE SLIDER & REAL-TIME DEMONSTRATION CONTROLS    */}
      {/* ======================================================== */}
      <div className="p-6 md:p-8 bg-stone-50 border-t border-stone-200">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Top Slider Label and Value Readout */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-stone-500">
                Primary Experimental Variable
              </span>
              <h3 className="text-xl font-serif font-semibold text-stone-900 flex items-center gap-2 mt-0.5">
                <Sliders className="w-4 h-4 text-stone-700" />
                Aperture Diaphragm Size
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Drag the slider to adjust the physical opening and observe the immediate trade-off between image sharpness and brightness.
              </p>
            </div>

            {/* Readout Pill / Metric Badge */}
            <div className="flex items-center gap-4 bg-white border border-stone-300 px-4 py-2 self-start sm:self-auto shadow-xs">
              <div>
                <span className="block text-[10px] uppercase tracking-wider font-mono text-stone-400">
                  Diameter
                </span>
                <span className="text-xl font-mono font-bold text-stone-900 tabular-nums">
                  {apertureMm.toFixed(1)} <span className="text-xs font-normal text-stone-500">mm</span>
                </span>
              </div>
              <div className="h-7 w-px bg-stone-200" />
              <div>
                <span className="block text-[10px] uppercase tracking-wider font-mono text-stone-400">
                  Approx. Stop
                </span>
                <span className="text-sm font-mono font-medium text-stone-700">
                  {activePreset ? activePreset.fStop : `f/${Math.round(270 / apertureMm)}`}
                </span>
              </div>
            </div>
          </div>

          {/* THE SLIDER CONTROL */}
          <div className="space-y-2">
            <div className="relative flex items-center">
              <input
                id="aperture-slider"
                type="range"
                min="1.0"
                max="16.0"
                step="0.5"
                value={apertureMm}
                onChange={(e) => onApertureChange(parseFloat(e.target.value))}
                className="w-full h-3 bg-stone-200 rounded-none appearance-none cursor-pointer accent-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500"
                aria-label="Aperture diameter size slider in millimeters"
              />
            </div>

            {/* Scale markings */}
            <div className="flex justify-between text-[11px] font-mono text-stone-500 pt-1">
              <span>1.0 mm (Tiny Pinhole)</span>
              <span className="hidden sm:inline">5.0 mm (Standard Chamber)</span>
              <span>10.0 mm</span>
              <span>16.0 mm (Wide Window)</span>
            </div>
          </div>

          {/* Preset Buttons for Quick Exploration */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-medium text-stone-500 mr-2">
              Curated Configurations:
            </span>
            {APERTURE_PRESETS.map((preset) => {
              const isSelected = Math.abs(preset.diameterMm - apertureMm) < 0.3;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onApertureChange(preset.diameterMm)}
                  className={`px-3 py-1.5 text-xs font-medium transition-all border ${
                    isSelected
                      ? 'bg-stone-900 text-stone-100 border-stone-900 shadow-sm'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100 hover:border-stone-400'
                  }`}
                >
                  {preset.name} ({preset.diameterMm}mm)
                </button>
              );
            })}
          </div>

          {/* DUAL GAUGES: VISIBLE DEMONSTRATION OF SHARPNESS & BRIGHTNESS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Image Sharpness Card */}
            <div className="bg-white border border-stone-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-mono tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-stone-700" />
                  Image Sharpness & Definition
                </span>
                <span className="text-xs font-mono font-semibold text-stone-800 tabular-nums">
                  {sharpnessScore}%
                </span>
              </div>
              {/* Progress track */}
              <div className="h-2 w-full bg-stone-100 overflow-hidden mb-2">
                <div
                  className="h-full bg-stone-900 transition-all duration-150"
                  style={{ width: `${sharpnessScore}%` }}
                />
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {apertureMm <= 3 ? (
                  <span className="text-stone-900 font-medium">
                    Extreme acuity: Distinct spire edges, defined stone brickwork, and crisp tree branches.
                  </span>
                ) : apertureMm <= 8 ? (
                  <span>
                    Clean recognizable architectural form with natural edge softening.
                  </span>
                ) : (
                  <span className="text-rose-700">
                    Severe optical blur: Circles of confusion overlap, turning details into hazy silhouettes.
                  </span>
                )}
              </p>
            </div>

            {/* Image Brightness Card */}
            <div className="bg-white border border-stone-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-mono tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  Image Brightness & Illumination
                </span>
                <span className="text-xs font-mono font-semibold text-stone-800 tabular-nums">
                  {brightnessScore}%
                </span>
              </div>
              {/* Progress track */}
              <div className="h-2 w-full bg-stone-100 overflow-hidden mb-2">
                <div
                  className="h-full bg-amber-500 transition-all duration-150"
                  style={{ width: `${brightnessScore}%` }}
                />
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {apertureMm <= 3 ? (
                  <span className="text-stone-700">
                    Dim, darkroom projection: Requires dark-adapted human eyes to perceive details on the back wall.
                  </span>
                ) : apertureMm <= 8 ? (
                  <span>
                    Luminous projection: Clearly visible with comfortable contrast across the canvas.
                  </span>
                ) : (
                  <span className="text-amber-800 font-medium">
                    Flooded with light: High photon flux illuminates the entire interior chamber wall.
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Curatorial Scientific Synthesis */}
          <div className="p-4 bg-stone-100/70 border border-stone-200 text-xs text-stone-700 leading-relaxed">
            <span className="font-semibold text-stone-900 font-serif text-sm mr-2">
              Curator’s Optical Note:
            </span>
            {apertureMm <= 2.5 && (
              <span>
                You have configured a true <em>pinhole</em>. Every ray that reaches the screen originates from a single, unambiguous direction. Although the outline is razor-sharp, the minute opening severely throttles light transmission, creating a very dim projection.
              </span>
            )}
            {apertureMm > 2.5 && apertureMm <= 8.0 && (
              <span>
                You have reached an optimal balance. The aperture is sufficiently wide to allow comfortable viewing without dark-adaptation, yet small enough that the circle of confusion does not degrade gross geometric forms.
              </span>
            )}
            {apertureMm > 8.0 && (
              <span>
                You have enlarged the aperture into a window. Tens of millions of additional photons enter every second, creating a luminous image. However, rays from Sather Tower&apos;s copper spire now land across an area several millimeters wide on the canvas, overlapping rays from the carillon belfry and East Bay clouds.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
