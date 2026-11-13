import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-[#F7F4EE] py-8 px-6 text-stone-600">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        {/* Curatorial Attribution */}
        <div className="text-center sm:text-left">
          <p className="font-serif text-sm font-medium text-stone-800">
            Camera Obscura Explorer
          </p>
          <p className="text-stone-500 text-[11px] mt-0.5">
            A study in geometrical optics, rectilinear ray propagation, and aperture dynamics.
          </p>
        </div>

        {/* Required Homework Journal Footer Note */}
        <div className="px-3.5 py-1.5 bg-white border border-stone-300 text-stone-800 font-mono text-xs tracking-tight shadow-xs">
          Homework Journal – App 1: Non-agentic App
        </div>
      </div>
    </footer>
  );
};
