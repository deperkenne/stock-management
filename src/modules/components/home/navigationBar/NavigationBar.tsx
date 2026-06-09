import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from '../../../../shared/components/Link';
import {NavigationData,DropdownsData,logoData} from "./Data"

export interface NavLink {
  label: string;
  href: string;
}

export interface DropdownConfig {
  label: string;
  links: NavLink[];
}

interface NavigationBarProps {
  logo?: ReactNode;
  navigationLinks?: NavLink[];
  dropdowns?: DropdownConfig[];
  actions?: ReactNode;
  mobileActions?: ReactNode;
}



// ─── Navigation bar data ──────────────────────────────────────────────────────

const navigationLinks: NavLink[] = NavigationData

const dropdowns: DropdownConfig[] = DropdownsData

const logo = logoData

function NavDropdown({ label, links }: DropdownConfig) {
  return (
    <div className="relative group">
      <button className="text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 focus:outline-none">
        <span>{label}</span>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {/* Dropdown panel (visible on group-hover) */}
      <div className="absolute right-0 w-48 mt-2 py-1 bg-slate-800 border border-slate-700 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}


export default function NavigationBar({
  actions,
  mobileActions,
}: NavigationBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <div className="shrink-0 flex items-center space-x-3">
            {logo}
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            {dropdowns.map((dropdown) => (
              <NavDropdown key={dropdown.label} {...dropdown} />
            ))}
          </div>

          {/* ACTIONS (Desktop) */}
          <div className="hidden md:block">
            {actions}
          </div>

          {/* HAMBURGER MENU BUTTON (Mobile) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                // Close icon (X)
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Burger icon
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Each dropdown becomes a flat labeled section on mobile */}
            {dropdowns.map((dropdown) => (
              <div key={dropdown.label} className="border-t border-slate-800 my-2 pt-2">
                <span className="block px-3 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {dropdown.label}
                </span>
                {dropdown.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-slate-400 hover:bg-slate-800 hover:text-white px-5 py-2 rounded-md text-base font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}

            {/* ACTIONS (Mobile) */}
            {(mobileActions ?? actions) && (
              <div className="w-full pt-4 pb-2 border-t border-slate-800">
                {mobileActions ?? actions}
              </div>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}
