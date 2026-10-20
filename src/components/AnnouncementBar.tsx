import React from 'react';
import { Truck, Phone, MessageSquare } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { Link } from 'react-router-dom';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#063B25] text-[#FFF9EC] text-xs font-medium border-b border-[#0B5836]/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Truck className="w-3.5 h-3.5 text-[#D9A62E] shrink-0" />
          <span className="font-semibold tracking-wide text-[#D9A62E]">
            {BUSINESS_CONFIG.deliveryNotice}
          </span>
          <span className="hidden md:inline text-stone-300">·</span>
          <span className="hidden md:inline text-stone-300">
            Dispatching pure natural tea & coffee powders across all states
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] sm:text-xs">
          <Link
            to="/all-india-delivery"
            className="hover:text-[#D9A62E] transition-colors underline decoration-stone-500 underline-offset-2 whitespace-nowrap"
          >
            Delivery Info
          </Link>
          <span className="text-stone-500">|</span>
          <a
            href={BUSINESS_CONFIG.whatsappBaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#D9A62E] transition-colors whitespace-nowrap"
            aria-label="Contact official WhatsApp"
          >
            <MessageSquare className="w-3 h-3 text-[#D9A62E]" />
            <span>WhatsApp: {BUSINESS_CONFIG.officialPhone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
