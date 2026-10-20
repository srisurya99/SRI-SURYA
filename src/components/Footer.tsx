import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, MessageSquare, Phone, MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#063B25] text-[#FFF9EC] border-t border-[#0B5836]/50">
      {/* Top Banner inside Footer: All India Delivery Announcement */}
      <div className="border-b border-[#0B5836]/60 bg-[#042B1B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-[#0B5836] flex items-center justify-center shrink-0 mx-auto md:mx-0 text-[#D9A62E]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#D9A62E]">
                {BUSINESS_CONFIG.deliveryNotice}
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                {BUSINESS_CONFIG.deliveryDescription}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/all-india-delivery"
              className="px-4 py-2.5 bg-[#D9A62E] hover:bg-[#c29124] text-[#063B25] text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
            >
              Delivery Details
            </Link>
            <a
              href={BUSINESS_CONFIG.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 border border-[#D9A62E]/60 hover:bg-[#D9A62E]/10 text-[#FFF9EC] text-xs font-medium rounded-md transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Pin Check</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FFF9EC]">
                SRI SURYA
              </span>
              <span className="block text-xs uppercase tracking-widest text-[#D9A62E] font-medium">
                Natural Tea & Coffee Powders
              </span>
            </Link>
            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              Discover authentic Indian teas, freshly roasted filter coffee blends, and wholesome wellness drink mixes sourced and blended with uncompromising purity.
            </p>

            <div className="pt-2 space-y-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D9A62E] shrink-0" />
                <span>Customer Care & WhatsApp: <strong className="text-white font-mono">{BUSINESS_CONFIG.officialPhone}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D9A62E] shrink-0" />
                <span>Business Inquiries: <span className="text-stone-300">{BUSINESS_CONFIG.supportEmail}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D9A62E] shrink-0" />
                <span>Andhra Pradesh & Telangana, India (All India Dispatch)</span>
              </div>
            </div>

            {/* Become a distributor spotlight */}
            <div className="pt-3">
              <Link
                to="/become-a-distributor"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D9A62E] hover:underline underline-offset-4"
              >
                <span>Become a Sri Surya Regional Distributor</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#D9A62E] mb-4">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link to="/category/tea-powders" className="hover:text-white transition-colors">
                  Tea Powders (Assam CTC & Spiced)
                </Link>
              </li>
              <li>
                <Link to="/category/green-tea" className="hover:text-white transition-colors">
                  Green Tea Varieties
                </Link>
              </li>
              <li>
                <Link to="/category/black-tea" className="hover:text-white transition-colors">
                  Black Tea (Orthodox)
                </Link>
              </li>
              <li>
                <Link to="/category/coffee-mixes" className="hover:text-white transition-colors">
                  Coffee Mixes (Filter & Instant)
                </Link>
              </li>
              <li>
                <Link to="/category/health-wellness" className="hover:text-white transition-colors">
                  Health & Wellness Powders
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#D9A62E] transition-colors font-medium">
                  View Full Catalogue (25 Products)
                </Link>
              </li>
            </ul>
          </div>

          {/* Business & Partnerships */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#D9A62E] mb-4">
              Partnerships
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link to="/become-a-distributor" className="text-[#D9A62E] font-semibold hover:underline">
                  Become a Distributor →
                </Link>
              </li>
              <li>
                <Link to="/become-a-distributor?type=wholesale" className="hover:text-white transition-colors">
                  Wholesale Enquiry
                </Link>
              </li>
              <li>
                <Link to="/become-a-distributor?type=supermarket" className="hover:text-white transition-colors">
                  Supermarket & Retail Supply
                </Link>
              </li>
              <li>
                <Link to="/become-a-distributor?type=hacc" className="hover:text-white transition-colors">
                  Hotel & Cafe Bulk Supply
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Sri Surya
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#D9A62E] mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <Link to="/all-india-delivery" className="hover:text-white transition-colors">
                  All India Delivery Information
                </Link>
              </li>
              <li>
                <Link to="/shipping-and-returns" className="hover:text-white transition-colors">
                  Shipping & Returns Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#0B5836]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Sri Surya Natural Tea & Coffee Powders. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-stone-300">Official WhatsApp: <strong className="text-white font-mono">{BUSINESS_CONFIG.officialPhone}</strong></span>
            <span>·</span>
            <span>All India Dispatch</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
