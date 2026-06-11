
const StockChartVisual = (
  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
    <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Stock levels — Black T-Shirt (M)
      </span>
      <span className="inline-flex items-center rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-medium text-rose-400 ring-1 ring-inset ring-rose-500/20 animate-pulse">
        Alert
      </span>
    </div>
    <div className="relative h-40 w-full flex items-end">
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
        <div className="w-full border-t border-white" />
        <div className="w-full border-t border-white" />
        <div className="w-full border-t border-white" />
      </div>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M 0 20 L 25 25 L 50 45 L 75 85 L 100 85" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
      <div className="absolute left-0 bottom-7 text-[10px] text-rose-500 font-semibold bg-slate-950 px-1.5 py-0.5 rounded border border-rose-500/20">
        Critical threshold: 10 units
      </div>
    </div>
  </div>
);

const OrderNotificationVisual = (
  <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl space-y-4">
    <div className="flex gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
      <div className="h-2 w-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
      <div className="space-y-1">
        <p className="text-xs font-bold text-white">Low stock detected</p>
        <p className="text-[11px] text-slate-400">Only 3 units of "MacBook Air M3" remaining.</p>
      </div>
    </div>
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-xs">
      <div className="bg-slate-900/50 px-4 py-2 border-b border-slate-800 text-[11px] text-slate-500 flex justify-between">
        <span>Recipient: apple-sales@europe.com</span>
        <span className="text-indigo-400 font-semibold">Auto-Draft</span>
      </div>
      <div className="p-4 space-y-2 font-mono text-slate-300 text-[11px]">
        <p className="text-slate-500">// Purchase Order #PO-2026</p>
        <p>Hello Apple Team,</p>
        <p>Please deliver to main warehouse:</p>
        <p className="text-emerald-400 font-semibold">+25x MacBook Air M3 (SKU: APL-MBA3)</p>
      </div>
    </div>
  </div>
);

export const MobileScannerVisual = (
  <div className="relative mx-auto h-70 w-45 rounded-[2.5rem] border-4 border-slate-800 bg-slate-950 p-3 shadow-2xl overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-16 bg-slate-800 rounded-b-xl z-20" />
    <div className="absolute inset-x-0 top-1/3 h-0.5 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,1)] z-10 animate-bounce" />
    <div className="h-full w-full rounded-[1.8rem] bg-slate-900/40 border border-slate-800/50 p-3 flex flex-col justify-between relative">
      <div className="text-[9px] font-bold tracking-wider text-purple-400 uppercase pt-2">Scanner Active</div>
      <div className="mx-auto h-24 w-24 border-2 border-dashed border-purple-500/40 rounded-xl flex items-center justify-center bg-slate-950/40">
        <div className="w-16 h-8 flex items-center justify-between opacity-30">
          {[1,2,3,4,5,6,7].map((i) => <div key={i} className="h-full bg-white w-0.5" />)}
        </div>
      </div>
      <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-[10px] space-y-1">
        <p className="font-bold text-white text-center">✓ Product identified</p>
        <p className="text-slate-500 text-[9px] text-center">Stock updated (+1)</p>
      </div>
    </div>
  </div>
);


export const Data = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    iconAccent: 'bg-indigo-500/10 text-indigo-400',
    title: 'Real-time tracking, effortlessly',
    description:
      'Your stock levels are synced everywhere, instantly. Whether you sell in-store, on Shopify, or on Amazon, StockMaster centralises everything to prevent accidental sales of out-of-stock products.',
    visual: StockChartVisual,
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.033 6.033 0 00-4.553-5.827M15 17a3 3 0 11-6 0m6 0H9m3 0V4" />
      </svg>
    ),
    iconAccent: 'bg-emerald-500/10 text-emerald-400',
    title: 'Smart order automation',
    description:
      'Never be caught off-guard by a stockout again. The intelligent alert threshold detects critical drops, notifies you instantly, and automatically generates a purchase order ready to send to your supplier in one click.',
    visual: OrderNotificationVisual,
    reversed: true,
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 18h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    ),
    iconAccent: 'bg-purple-500/10 text-purple-400',
    title: 'Inventory counts 10x faster on mobile',
    description:
      'No need for expensive hardware or handheld scanners. Simply use your smartphone camera to scan barcodes on the fly during parcel reception or your annual stocktakes.',
    visual: MobileScannerVisual,
  },
];