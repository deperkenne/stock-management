// ─── Navigation bar data ──────────────────────────────────────────────────────

export const NavigationData = [
  { label: 'Home', href: '/' },
  { label: 'Orders', href: '/orders' },
  { label: 'About',  href: '/about'  },
  { label: 'Contact', href: '/contact' },
];

export const DropdownsData = [
  {
    label: 'Admin',
    links: [
      { label: 'Dashboard', href: '#dashboard' },
      { label: 'Inventory',  href: '#inventory' },
      { label: 'Users',      href: '#users'     },
    ],
  },
];

export const logoData = (
  <>
    <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
    <span className="text-white font-bold text-lg tracking-wider hidden sm:block">StockMaster</span>
  </>
);