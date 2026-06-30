import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open('https://wa.me/6281234567890?text=Halo%20Gerakan%20Hasan%20Peduli,%20saya%20ingin%20silaturahmi%20dan%20bertanya%20mengenai%20aktivitas%20sosial%20GHP.', '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center group">
      {/* Tooltip text */}
      <button
        onClick={handleClick}
        className={`mr-3 px-4 py-2 rounded-xl bg-primary text-secondary-cream font-medium text-xs shadow-lg border border-primary-light/20 transition-all duration-300 origin-right ${
          showTooltip 
            ? 'opacity-100 scale-100 translate-x-0' 
            : 'opacity-0 scale-75 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0'
        }`}
      >
        Mari Bergerak Bersama
      </button>

      {/* Circle button */}
      <button
        onClick={handleClick}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-500 hover:scale-110 active:scale-95 transition-all duration-300 border border-emerald-500/20 group/btn"
        aria-label="Hubungi Kami di WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white group-hover/btn:rotate-12 transition-transform duration-300" />
      </button>
    </div>
  );
};
