import type { ReactNode } from 'react';

export interface HeroBullet {
  text: string;
}

export interface HeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  bullets?: HeroBullet[];
  actions?: ReactNode;
  trustNote?: string;
  visual?: ReactNode;
}

function BulletItem({ text }: HeroBullet) {
  return (
    <li className="flex items-center space-x-3">
      <svg className="h-5 w-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span>{text}</span>
    </li>
  );
}

function DashboardMockup (){
    return (
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
            {/* Window chrome */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3">
            <div className="flex space-x-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/40" />
                <div className="h-3 w-3 rounded-full bg-amber-500/40" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/40" />
            </div>
            <div className="rounded bg-slate-950 px-3 py-1 text-xs font-medium text-slate-500 tracking-tight">
                stockmaster.app/dashboard
            </div>
            <div className="w-12" />
            </div>

            {/* Dashboard content */}
            <div className="p-6 space-y-6 text-left">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Items</p>
                <p className="mt-2 text-2xl font-bold text-white tracking-tight">1,482</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Stock Value</p>
                <p className="mt-2 text-2xl font-bold text-emerald-400 tracking-tight">$45,210</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-amber-500/5 p-4">
                <p className="text-xs font-medium text-amber-400 uppercase tracking-wider">Low Stock</p>
                <p className="mt-2 text-2xl font-bold text-amber-500 tracking-tight">3</p>
                </div>
            </div>

            {/* Table preview */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/30 overflow-hidden">
                <div className="bg-slate-950/80 px-4 py-3 text-xs font-semibold text-slate-400 border-b border-slate-800 grid grid-cols-4">
                <span>Product</span>
                <span>SKU</span>
                <span>Stock</span>
                <span className="text-right">Status</span>
                </div>
                <div className="divide-y divide-slate-900 text-xs">
                <div className="px-4 py-3 grid grid-cols-4 items-center text-slate-300">
                    <span className="font-medium text-white">iPhone 15 Pro</span>
                    <span className="text-slate-500 font-mono">APL-IP15P</span>
                    <span className="font-semibold">42 units</span>
                    <span className="text-right">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">Optimal</span>
                    </span>
                </div>
                <div className="px-4 py-3 grid grid-cols-4 items-center text-slate-300 bg-amber-500/5">
                    <span className="font-medium text-white">MacBook Air M3</span>
                    <span className="text-slate-500 font-mono">APL-MBA3</span>
                    <span className="font-semibold text-amber-500">2 units</span>
                    <span className="text-right">
                    <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 font-medium text-amber-400 ring-1 ring-inset ring-amber-500/20">Critical</span>
                    </span>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default function HeroSection({ badge, title, subtitle, bullets, actions, trustNote, visual = <DashboardMockup /> }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-slate-900">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.15),transparent_50%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">

          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center text-center lg:text-left">

            {badge && (
              <div className="inline-flex items-center mx-auto lg:mx-0 w-fit rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20 mb-6 animate-pulse">
                {badge}
              </div>
            )}

            <h1 className="text-3xl font-extrabold tracking-tight leading-tight text-slate-100 sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-6 text-base text-slate-400 sm:text-lg max-w-xl mx-auto lg:mx-0">
                {subtitle}
              </p>
            )}

            {bullets && bullets.length > 0 && (
              <ul className="mt-8 space-y-3 text-sm text-slate-300 flex flex-col items-center lg:items-start">
                {bullets.map((bullet, i) => (
                  <BulletItem key={i} text={bullet.text} />
                ))}
              </ul>
            )}

            {(actions || trustNote) && (
              <div className="mt-10 flex flex-col sm:items-center lg:items-start gap-3">
                {actions && (
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start">
                    {actions}
                  </div>
                )}
                {trustNote && (
                  <p className="mt-3 text-xs text-slate-500 flex items-center justify-center gap-1.5">
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {trustNote}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          {visual && (
            <div className="relative max-w-md mx-auto w-full sm:max-w-xl lg:max-w-none">
              <div className="absolute -inset-4 rounded-2xl bg-linear-to-tr from-indigo-500 to-purple-500 opacity-20 blur-lg pointer-events-none" />
              {visual}
            </div>
          )}
          

        </div>
      </div>
    </section>
  );
}
