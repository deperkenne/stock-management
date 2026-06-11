import {logos} from "./Data"

export default function TrustedBySection() {
  return (
    <section className="bg-slate-900 py-12 border-b border-slate-800 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Title centered above the marquee */}
        <div className="text-center mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Over <span className="text-indigo-400 font-bold">500 companies</span> manage their stock with us
          </h2>
        </div>

        {/* Marquee wrapper */}
        <div className="relative flex overflow-x-hidden w-full mask-gradient">

          {/* Left & right edge fades */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

          {/* First logo track */}
          <div className="flex space-x-16 shrink-0 pr-16 animate-marquee text-slate-500">
            {logos.map((logo) => (
              <div key={`track1-${logo.id}`} className="flex items-center justify-center w-32 hover:text-slate-400 transition-colors duration-200">
                {logo.content}
              </div>
            ))}
          </div>

          {/* Second logo track — exact duplicate for seamless loop */}
          <div className="flex space-x-16 shrink-0 pr-16 animate-marquee text-slate-500" aria-hidden="true">
            {logos.map((logo) => (
              <div key={`track2-${logo.id}`} className="flex items-center justify-center w-32 hover:text-slate-400 transition-colors duration-200">
                {logo.content}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
