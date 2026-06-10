import { Link } from 'react-router-dom';
import NavigationBar from '../modules/components/home/navigationBar/NavigationBar';
import LoginButton from '../modules/auth/presentation/components/Login';
import ContactForm from '../components/contact/contactForm/ContactForm';
import ContactInfo from '../components/contact/contactInfo/ContactInfo';

const FOOTER_LINKS = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms',   href: '#' },
  { label: 'Support', href: '#' },
] as const;

export default function ContactScreen() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950">

      {/* ─── Header ───────────────────────────────────────────────────────────── */}
      <NavigationBar
        actions={<LoginButton ButtonName="Sign in" />}
        mobileActions={<LoginButton ButtonName="Sign in" className="w-full" />}
      />

      {/* ─── Main ─────────────────────────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

        {/* Page header */}
        <div className="mb-14">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to Home
          </Link>

          <p className="text-base font-semibold uppercase tracking-wider text-indigo-400">
            Get in touch
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            We'd love to hear from you.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">
            Have a question about StockMaster, need a demo, or want to discuss a
            custom plan? Our team usually responds within 24 hours.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">

          <ContactInfo />

          {/* ─── Form panel ───────────────────────────────────────────────────── */}
          <section
            aria-labelledby="contact-form-heading"
            className="lg:col-span-2"
          >
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
              <h2
                id="contact-form-heading"
                className="mb-6 text-xl font-semibold text-white"
              >
                Send us a message
              </h2>
              <ContactForm />
            </div>
          </section>

        </div>
      </main>

      {/* ─── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800 bg-slate-900/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} StockMaster. All rights reserved.
          </p>
          <nav aria-label="Footer navigation" className="flex gap-6">
            {FOOTER_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm text-slate-500 transition-colors hover:text-slate-300"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </footer>

    </div>
  );
}
