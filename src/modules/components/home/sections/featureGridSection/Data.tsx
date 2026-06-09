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

export const Data = [
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