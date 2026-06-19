
import { 
  BarChart3, 
  Layers, 
  AlertCircle, 
  Package, 
  MapPin, 
  RefreshCw, 
  TrendingUp, 
  Users, 
  Sliders 
} from 'lucide-react';
 

  // Style de base pour éviter la perte de background au scroll (Sticky)
  export const baseSidebarClasses = `
    sticky top-14 h-[calc(100vh-3.5rem)] 
    bg-[#161b22] border-r border-[#21262d] 
    flex flex-col justify-between py-6 px-3 
    select-none transition-all duration-300 ease-in-out z-40
  `;

  export const Data= [
    { id: 'kpis', label: 'KPIs temps réel', icon: BarChart3, iconColor: 'text-[#4ade80]' }, // Vert/Multi
    { id: 'allocation', label: 'Allocation Queue', icon: Layers, iconColor: 'text-[#fb923c]' }, // Orange/Brun
    { id: 'alerts', label: 'Alertes actives', icon: AlertCircle, iconColor: 'text-[#f87171]' }, // Rouge
    { id: 'sku', label: 'SKU Manager', icon: Package, iconColor: 'text-[#e879f9]' }, // Violet/Jaune
    { id: 'locations', label: 'Locations', icon: MapPin, iconColor: 'text-[#fb7185]' }, // Rose
    { id: 'events', label: 'Événements', icon: RefreshCw, iconColor: 'text-[#60a5fa]' }, // Bleu
    { id: 'metrics', label: 'Métriques', icon: TrendingUp, iconColor: 'text-[#93c5fd]' }, // Bleu clair
    { id: 'users', label: 'Utilisateurs', icon: Users, iconColor: 'text-[#a78bfa]' }, // Violet
    { id: 'config', label: 'Configuration', icon: Sliders, iconColor: 'text-[#cbd5e1]' }, // Gris
  ];