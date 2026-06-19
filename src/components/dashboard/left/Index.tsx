import React, { useState } from 'react';
import { Data,baseSidebarClasses } from './Data';
import { 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';


interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}


interface LeftBarProps {
  /** Permet de synchroniser l'état d'ouverture sur mobile avec le bouton du Header si besoin */
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}


const SidebarItems: SidebarItem [] = Data


export const LeftBar: React.FC<LeftBarProps>= ({ 
  isMobileOpen = false, 
  setIsMobileOpen 
}) => {
  const [activeId, setActiveId] = useState<string>('kpis');
  // State pour réduire la barre en mode Desktop (MD et supérieur)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);



  // Gestion dynamique de la largeur Desktop
  const desktopWidthClass = isCollapsed ? 'md:w-16' : 'md:w-64';

  // Gestion du positionnement Mobile (Masqué à gauche par défaut, glisse à l'écran si activé)
  const mobileVisibilityClass = isMobileOpen 
    ? 'translate-x-0 w-64' 
    : '-translate-x-full md:translate-x-0';

  return (
    <>
      {/* 1. BACKDROP MOBILE : Assombrit l'écran quand le menu est ouvert sur smartphone */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen?.(false)}
        />
      )}

      {/* 2. LE CONTENEUR ASIDE RESPONSIVE */}
      <aside className={`${baseSidebarClasses} ${desktopWidthClass} ${mobileVisibilityClass} fixed md:sticky left-0`}>
        
        {/* Partie supérieure : Titre & Navigation */}
        <div className="flex flex-col space-y-6">
          
          {/* Header interne de la Sidebar (Bouton de réduction Desktop) */}
          <div className="flex items-center justify-between px-3 h-6">
            <p className={`text-xs font-semibold uppercase tracking-wider text-[#8b949e] transition-opacity duration-200 ${
              isCollapsed ? 'md:opacity-0 md:w-0 overflow-hidden' : 'opacity-100'
            }`}>
              Navigation
            </p>
            
            {/* Toggle Collapse - Uniquement visible sur écran Desktop */}
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-1 rounded-md border border-[#21262d] bg-[#1f242c] text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
              aria-label={isCollapsed ? "Agrandir la barre" : "Réduire la barre"}
            >
              {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Liste des Menus */}
          <nav className="space-y-1" aria-label="Sidebar Navigation">
            {SidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveId(item.id);
                    // Sur mobile, on ferme automatiquement le tiroir après un clic
                    if (window.innerWidth < 768) {
                      setIsMobileOpen?.(false);
                    }
                  }}
                  className={`w-full flex items-center rounded-lg p-3 text-sm font-medium transition-all duration-150 group relative ${
                    isActive
                      ? 'bg-[#21262d] text-[#58a6ff]'
                      : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#1f242c]'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#58a6ff]' : item.iconColor} group-hover:scale-105 transition-transform`} />
                  
                  {/* Texte masqué si la barre est réduite sur desktop */}
                  <span className={`ml-3 truncate transition-opacity duration-200 ${
                    isCollapsed ? 'md:opacity-0 md:w-0 md:overflow-hidden' : 'opacity-100'
                  }`}>
                    {item.label}
                  </span>

                  {/* Tooltip ultra-pro en mode réduit au survol */}
                  {isCollapsed && (
                    <div className="absolute left-14 hidden group-hover:md:block bg-[#21262d] text-[#c9d1d9] text-xs py-1.5 px-3 rounded-md border border-[#30363d] shadow-xl z-50 whitespace-nowrap pointer-events-none">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Partie inférieure : Widget d'alerte global */}
        <div className="mt-auto">
          <div className="flex items-center justify-center md:justify-start bg-[#2a1a1f] border border-[#442326] rounded-xl p-3 text-[#f87171] cursor-pointer hover:bg-[#341e24] transition-colors duration-150">
            <div className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f87171] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ef4444]"></span>
            </div>
            
            <span className={`ml-3 text-xs font-semibold tracking-wide truncate transition-opacity duration-200 ${
              isCollapsed ? 'md:opacity-0 md:w-0 md:overflow-hidden' : 'opacity-100'
            }`}>
              2 alertes actives
            </span>
          </div>
        </div>

      </aside>
    </>
  );
};

export default LeftBar;