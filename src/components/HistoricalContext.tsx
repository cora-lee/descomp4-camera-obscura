import React from 'react';

interface TimelineEvent {
  period: string;
  figure: string;
  region: string;
  contribution: string;
}

const TIMELINE: TimelineEvent[] = [
  {
    period: 'c. 400 BCE',
    figure: 'Mozi (Mohist School)',
    region: 'China',
    contribution:
      'First written recording of an inverted image formed through a small pinhole. Mozi observed that light rays from an illuminated person cross at the hole, placing the head at the bottom and feet at the top of the "collecting place".',
  },
  {
    period: '1021 CE',
    figure: 'Ibn al-Haytham (Alhazen)',
    region: 'Cairo / Basra',
    contribution:
      'In his landmark Kitāb al-Manāẓir (Book of Optics), Alhazen conducted rigorous experiments using five candles and a small puncture to prove that light rays travel in independent, straight geometric lines and do not intermingle at the pinhole.',
  },
  {
    period: 'c. 1490 CE',
    figure: 'Leonardo da Vinci',
    region: 'Milan, Italy',
    contribution:
      'Detailed the camera obscura in his Codex Atlanticus, famously realizing that the optical mechanism inside a darkened room mirrors the internal structure of the human eye, with the pupil acting as the aperture and the retina as the projection wall.',
  },
  {
    period: '1604 CE',
    figure: 'Johannes Kepler',
    region: 'Prague, Holy Roman Empire',
    contribution:
      'Formally coined the Latin term "Camera Obscura" in his treatise Ad Vitellionem Paralipomena. Kepler designed portable tent versions with lenses and mirrors for surveying landscapes and safely tracking sunspots without eye damage.',
  },
];

export const HistoricalContext: React.FC = () => {
  return (
    <section id="chronology" className="my-12 pt-8 border-t border-stone-200">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-widest font-mono text-stone-500">
          Chronology · The History of Optic Philosophy
        </span>
        <h2 className="text-2xl font-serif font-medium text-stone-900 mt-1">
          From Ancient Shadows to Modern Photography
        </h2>
        <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
          Over two millennia of scientific inquiry connected the pinhole phenomenon to the emergence of modern cameras, lenses, and optical sensors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {TIMELINE.map((item) => (
          <div
            key={item.period}
            className="bg-white border border-stone-200/90 p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2 border-b border-stone-100 pb-2">
                <span className="font-semibold text-stone-800">{item.period}</span>
                <span>{item.region}</span>
              </div>
              <h3 className="text-base font-serif font-semibold text-stone-900 mb-1.5">
                {item.figure}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {item.contribution}
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-stone-100 text-[10px] font-mono text-stone-400">
              Archival Record
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
