import type { ReactNode } from 'react';
import { Data } from './Data';
export interface BentoCard {
  icon:         ReactNode;
  iconAccent?:  string;
  title:        string;
  description:  string;
  visual?:      ReactNode;
  gridClass?:   string;
  horizontal?:  boolean;
}

export interface BentoSectionProps {
  eyebrow?:  string;
  title?:    string;
  cards?:    BentoCard[];
}


const DEFAULT_CARDS: BentoCard[] = Data


// ─── Sub-component (DRY: one card = one BentoCardItem) ────────────────────────

function BentoCardItem({
  icon,
  iconAccent = 'bg-indigo-500/10 text-indigo-400',
  title,
  description,
  visual,
  gridClass = '',
  horizontal = false,
}: BentoCard) {
  return (
    <div className={`${gridClass} rounded-3xl border border-slate-800 bg-slate-950 p-8 flex hover:border-slate-700 transition-colors duration-200
      ${horizontal ? 'flex-col sm:flex-row gap-6 items-start justify-between' : 'flex-col justify-between'}`}
    >
      <div className={`space-y-4 ${horizontal ? 'max-w-md' : ''}`}>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconAccent}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">{description}</p>
        </div>
      </div>
      {visual}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FeatureGridSection({
  eyebrow = 'And much more',
  title   = 'Everything you need to grow',
  cards   = DEFAULT_CARDS,
}: BentoSectionProps) {
  return (
    <section className="bg-slate-900 py-20 lg:py-28 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-400">
            {eyebrow}
          </h2>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {title}
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px]">
          {cards.map((card, i) => (
            <BentoCardItem key={i} {...card} />
          ))}
        </div>

      </div>
    </section>
  );
}
