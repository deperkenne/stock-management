import { CONTACT_INFO, BUSINESS_HOURS } from './Data';

export default function ContactInfo() {
  return (
    <aside className="space-y-6 lg:col-span-1">

      {/* Contact info card */}
      <div className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        {CONTACT_INFO.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              {item.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-0.5 block break-all text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-0.5 whitespace-pre-line text-sm text-slate-300">
                  {item.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Business hours card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Business Hours
        </h2>
        <dl className="space-y-2.5 text-sm">
          {BUSINESS_HOURS.map(({ day, hours }) => (
            <div key={day} className="flex justify-between gap-4">
              <dt className="text-slate-400">{day}</dt>
              <dd
                className={
                  hours === 'Closed' ? 'text-slate-500' : 'font-medium text-white'
                }
              >
                {hours}
              </dd>
            </div>
          ))}
        </dl>
      </div>

    </aside>
  );
}
