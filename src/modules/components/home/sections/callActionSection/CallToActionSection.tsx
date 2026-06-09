import Button from "../../../../../shared/components/Button";
import { Data } from "./Data";

export interface CtaBadge {
  text: string;
}

export interface FinalCtaProps {
  title?:           string;
  highlightedText?: string;
  subtitle?:        string;
  ctaLabel?:        string;
  onCtaClick?:      () => void;
  badges?:          CtaBadge[];
}

const DEFAULT_BADGES: CtaBadge[] = Data

function BadgeItem({ text }: CtaBadge) {
  return (
    <span className="flex items-center gap-1.5">
      <svg className="h-4 w-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {text}
    </span>
  );
}

export default function CallToActionSection({
  title           = "Ready to say goodbye to",
  highlightedText = "complicated spreadsheets?",
  subtitle        = "Join hundreds of merchants who have automated their logistics. Set up your account in less than 5 minutes.",
  ctaLabel        = "Create my free account",
  onCtaClick,
  badges          = DEFAULT_BADGES,
}: FinalCtaProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 sm:py-32 border-b border-slate-900">

      {/* Textured background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

      {/* Ambient spotlight */}
      <div className="absolute -top-40 left-1/2 -z-10 h-100 w-200 -translate-x-1/2 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8 z-10">

        {/* Title */}
        <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-white sm:text-4xl md:text-5xl">
          {title}{' '}
          <span className="bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {highlightedText}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-400">
          {subtitle}
        </p>

        {/* CTA button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            type="button"
            onClick={onCtaClick}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20 font-bold px-8 py-4 rounded-xl text-lg transition-all hover:-translate-y-0.5"
          >
            {ctaLabel}
          </Button>
        </div>

        {/* Reassurance badges */}
        {badges.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
            {badges.map((badge) => (
              <BadgeItem key={badge.text} text={badge.text} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
