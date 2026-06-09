import type { ReactNode } from 'react';

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

// ─── Visuals (DRY: defined once, referenced in DEFAULT_CARDS) ─────────────────

const ChartVisual = (
  <div className="mt-4 pt-4 border-t border-slate-900/60 flex items-end justify-between h-20 px-2">
    <div className="w-8 bg-slate-800 rounded-t h-[40%]" />
    <div className="w-8 bg-slate-800 rounded-t h-[65%]" />
    <div className="w-8 bg-indigo-500/80 rounded-t h-[95%]" />
    <div className="w-8 bg-slate-800 rounded-t h-[55%]" />
  </div>
);

const WarehouseVisual = (
  <div className="shrink-0 flex flex-col gap-2 w-full sm:w-auto bg-slate-900/50 p-3 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-400">
    <div className="flex items-center justify-between gap-4">
      <span className="text-white">📍 Paris Depot</span>
      <span className="font-bold text-indigo-400">840 u.</span>
    </div>
    <div className="w-full bg-slate-800 h-1 rounded overflow-hidden">
      <div className="bg-indigo-500 h-full w-[75%]" />
    </div>
    <div className="flex items-center justify-between gap-4 pt-1">
      <span className="text-white">📍 Lyon Depot</span>
      <span className="font-bold text-slate-400">120 u.</span>
    </div>
    <div className="w-full bg-slate-800 h-1 rounded overflow-hidden">
      <div className="bg-slate-500 h-full w-[20%]" />
    </div>
  </div>
);

// ─── Default data ─────────────────────────────────────────────────────────────

const DEFAULT_CARDS: BentoCard[] = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    iconAccent:  'bg-indigo-500/10 text-indigo-400',
    title:       'Analytics & Reports',
    description: 'Instantly identify your most profitable products and anticipate cash flow needs with clear, live-updated charts.',
    visual:      ChartVisual,
    gridClass:   'md:col-span-2 lg:col-span-1 lg:row-span-2',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0V11m0 0h4m-4 0v3m4-3v3m1-3h3m-3-3h3m-2-3h2m-2 3h2M5 21V5a2 2 0 012-2h2" />
      </svg>
    ),
    iconAccent:  'bg-indigo-500/10 text-indigo-400',
    title:       'Multi-Warehouse',
    description: 'Manage all your stock whether you have a storage garage, a large logistics warehouse, or three separate retail stores. Redistribute volumes in one click.',
    visual:      WarehouseVisual,
    gridClass:   'lg:col-span-2',
    horizontal:  true,
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconAccent:  'bg-indigo-500/10 text-indigo-400',
    title:       'Full Audit Trail',
    description: 'Keep complete traceability: every entry, exit, and manual change is logged to permanently eliminate mysterious losses or theft.',
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconAccent:  'bg-indigo-500/10 text-indigo-400',
    title:       '24/7 Support',
    description: 'A question in the middle of a night-time stocktake? Our technical team responds by chat or phone in under 10 minutes, any time of day.',
  },
];

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
