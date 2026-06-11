
import type { ReactNode } from 'react';
import { Data } from './Data';

export interface Feature {
  icon:         ReactNode;
  iconAccent?:  string;
  title:        string;
  description:  string;
  visual:       ReactNode;
  reversed?:    boolean;
}

export interface FeaturesSectionProps {
  eyebrow?:  string;
  title?:    string;
  features?: Feature[];
}


const DEFAULT_FEATURES: Feature[] = Data


// ─── Sub-component (DRY: one block = one FeatureBlock) ────────────────────────

function FeatureBlock({
   icon, 
   iconAccent = 'bg-indigo-500/10 text-indigo-400', 
   title, 
   description, 
   visual, 
   reversed = false }: Feature) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div className={`space-y-6 text-center lg:text-left ${reversed ? 'lg:order-2' : ''}`}>
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${iconAccent}`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h3>
        <p className="text-base text-slate-400 leading-relaxed">{description}</p>
      </div>
      <div className={`relative mx-auto w-full max-w-md lg:max-w-none ${reversed ? 'lg:order-1' : ''}`}>
        {visual}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FeaturesSection({
  eyebrow  = 'Built for your daily workflow',
  title    = 'Stop suffering from stock management. Master it.',
  features = DEFAULT_FEATURES,
}: FeaturesSectionProps) {
  return (
    <section className="bg-slate-950 py-20 lg:py-28 border-b border-slate-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-400">
            {eyebrow}
          </h2>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {title}
          </p>
        </div>

        {/* Feature blocks */}
        <div className="space-y-24 lg:space-y-36">
          {features.map((feature, i) => (
            <FeatureBlock key={i} {...feature} />
          ))}
        </div>

      </div>
    </section>
  );
}
