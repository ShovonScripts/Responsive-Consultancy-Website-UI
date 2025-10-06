import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '8801733956590';
  const message = encodeURIComponent('Hello! 👋 I\'d like to learn more about Nas Digital Growth.');
  
  return (
    <div className="fixed bottom-24 right-6 z-50">
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-14 h-14 bg-[#16A34A] hover:bg-[#15803d] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-foreground text-background text-sm rounded-lg whitespace-nowrap shadow-lg">
          Chat with us on WhatsApp
          <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground"></div>
        </div>
      )}
    </div>
  );
}