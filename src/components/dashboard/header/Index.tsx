import React, { useState } from 'react';
import { Settings, Menu, X } from 'lucide-react';
import { Data } from './Data';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = Data

export const logoData = (
  <>
      <Settings 
              className="w-5 h-5 text-[#8b949e] group-hover:rotate-45 transition-transform duration-300 ease-in-out" 
              aria-hidden="true"
            />
  </>
);

export const Header: React.FC = () => {


  const [activeTab, setActiveTab] = useState<string>('overview');
  // State pour le menu mobile (toggle)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="w-full bg-[#161b22] border-b border-[#21262d] relative select-none">
      {/* Conteneur Principal de la Barre */}
      <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* À gauche : Logo & Navigation Desktop */}
        <div className="flex items-center space-x-6 lg:space-x-8 h-full">
          
          {/* Zone Logo / Brand */}
          <div className="flex items-center space-x-2.5 group cursor-pointer shrink-0">
            {logoData}
            <span className="text-[#58a6ff] font-bold text-base sm:text-lg tracking-wide whitespace-nowrap">
              WMS Admin
            </span>
          </div>

          {/* Navigation Version Desktop (Masquée sur Mobile / Tablette verticale) */}
          <nav className="hidden md:flex items-center space-x-1 h-full" aria-label="Desktop Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#21262d] text-[#58a6ff] shadow-sm'
                      : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#1f242c]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* À droite : Email Desktop & Menu Trigger Mobile */}
        <div className="flex items-center space-x-4">
          {/* Email (Masqué sur petit mobile si l'écran est minuscule) */}
          <span className="hidden sm:inline-block text-sm font-medium text-[#8b949e] hover:text-[#c9d1d9] transition-colors duration-150 cursor-pointer truncate max-w-[180px] lg:max-w-none">
            admin@klinkhammer.de
          </span>

          {/* Bouton Menu Hamburger (Uniquement visible sur Mobile / Tablette) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d] md:hidden focus:outline-none focus:ring-2 focus:ring-[#58a6ff] focus:ring-offset-2 focus:ring-offset-[#161b22]"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* --- MENU RESPONSIVE MOBILE & TABLETTE --- */}
      {/* S'ouvre avec un effet d'accordéon fluide si isMobileMenuOpen est vrai */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#0d1117] border-t border-[#21262d] ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3 space-y-1.5">
          {/* Navigation Links Mobile */}
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false); // Ferme le menu après sélection
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-[#21262d] text-[#58a6ff]'
                    : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          {/* Séparateur pour l'email en mode mobile */}
          <div className="border-t border-[#21262d] my-2 pt-2 sm:hidden">
            <p className="px-4 py-1.5 text-xs text-[#8b949e] italic truncate">
              Connecté en tant que : admin@klinkhammer.de
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default 
Header;