import React from 'react';
import { STEP_CARDS } from '../data/exhibitData';
import { Sun, ArrowDownUp, SlidersHorizontal } from 'lucide-react';

interface StepCardsProps {
  onSelectAperturePreset?: (val: number) => void;
}

export const StepCards: React.FC<StepCardsProps> = ({ onSelectAperturePreset }) => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Sun className="w-5 h-5 text-amber-600" />;
      case 1:
        return <ArrowDownUp className="w-5 h-5 text-stone-700" />;
      case 2:
        return <SlidersHorizontal className="w-5 h-5 text-stone-700" />;
      default:
        return null;
    }
  };

  return (
    <section className="my-12">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-widest font-mono text-stone-500">
          Curatorial Guide · 3-Stage Progression
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-stone-900 mt-1">
          How Light Forms the Living Image
        </h2>
        <p className="text-sm text-stone-600 mt-1.5 max-w-2xl leading-relaxed">
          The camera obscura is not magic, but pure geometry. Follow the three steps that transform natural daylight into an inverted optical reproduction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEP_CARDS.map((card, idx) => (
          <article
            key={card.number}
            className="bg-white border border-stone-200/90 p-6 flex flex-col justify-between hover:border-stone-400 transition-colors duration-200 shadow-xs"
          >
            <div>
              {/* Header with Step Number and Icon */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
                <span className="text-2xl font-serif font-semibold text-stone-400 font-mono">
                  {card.number}
                </span>
                <div className="p-1.5 bg-stone-50 border border-stone-200/60">
                  {getIcon(idx)}
                </div>
              </div>

              {/* Title & Subtitle */}
              <span className="text-[11px] uppercase font-mono tracking-wider text-stone-500 block mb-1">
                {card.subtitle}
              </span>
              <h3 className="text-lg font-serif font-semibold text-stone-900 mb-2">
                {card.title}
              </h3>

              {/* Concise summary */}
              <p className="text-xs font-medium text-stone-800 leading-relaxed mb-3">
                {card.summary}
              </p>

              {/* Scientific detail */}
              <p className="text-xs text-stone-600 leading-relaxed">
                {card.scientificDetail}
              </p>
            </div>

            {/* Subtle footer accent or actionable link for card 3 */}
            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-400">
              <span>Stage {card.number} of 03</span>
              {idx === 2 && onSelectAperturePreset && (
                <button
                  type="button"
                  onClick={() => onSelectAperturePreset(1.5)}
                  className="text-stone-700 hover:text-stone-900 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Test Pinhole in Diagram →
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
