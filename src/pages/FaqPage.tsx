import React, { useState } from 'react';
import { ChevronDown, MessageSquare, Truck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS_CONFIG } from '../config/business';

interface FaqItem {
  q: string;
  a: string;
  category: 'delivery' | 'products' | 'distributor' | 'orders';
}

const FAQS: FaqItem[] = [
  // Delivery
  {
    category: 'delivery',
    q: 'Do you offer delivery to every state in India?',
    a: 'Yes, All India Delivery is available! We ship products across Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Maharashtra, Gujarat, Delhi NCR, and all other Indian states. Please contact us with your destination PIN code to verify courier transit time and shipping charges.',
  },
  {
    category: 'delivery',
    q: 'How are shipping charges calculated?',
    a: 'Shipping charges are calculated transparently based on total consignment weight and destination PIN code. Because courier charges vary between local, regional, and national zones, we confirm the exact delivery fee prior to dispatch.',
  },
  {
    category: 'delivery',
    q: 'How long does standard delivery take?',
    a: 'Orders within Andhra Pradesh and Telangana typically arrive in 2-3 business days. Consignments to neighboring South Indian states arrive in 3-4 days, and all other states generally take 4-7 business days depending on carrier connectivity.',
  },

  // Products
  {
    category: 'products',
    q: 'What is special about Sri Surya Bellam (Jaggery) Tea?',
    a: 'Unlike ordinary black tea that often curdles milk when mixed with jaggery, Sri Surya Bellam Tea is blended with select low-tannin Assam CTC tea granules that dissolve smoothly with organic jaggery powder and hot milk without curdling.',
  },
  {
    category: 'products',
    q: 'Are Sri Surya products free from artificial flavors and preservatives?',
    a: 'Yes, 100% natural. We use real crushed spices (cardamom, dry ginger, cloves, cinnamon, tulasi, lemongrass), natural cocoa, and organic unrefined sweeteners. No artificial synthetic aromas or chemical colors.',
  },
  {
    category: 'products',
    q: 'What is the ratio in your Filter Coffee?',
    a: 'Sri Surya Filter Coffee is a balanced 80:20 blend of high-grown Plantation Arabica & Robusta peaberry coffee beans with 20% French chicory, delivering a thick, viscous decoction and frothy crema.',
  },

  // Distributor
  {
    category: 'distributor',
    q: 'How do I apply for a Sri Surya dealership or distributorship?',
    a: 'Please visit our "Become a Distributor" page (/become-a-distributor) and submit the business enquiry form with your contact details, business type, and target territory. You can also chat directly with our trade desk on WhatsApp at 7032048859.',
  },
  {
    category: 'distributor',
    q: 'Do you supply supermarkets and grocery store chains?',
    a: 'Yes! We supply supermarkets, kirana chains, and gourmet retail outlets with retail-ready barcode-compliant packs across both 1 kg family sizes and 200 g specialty wellness mixes.',
  },

  // Orders
  {
    category: 'orders',
    q: 'How does the online order request flow work?',
    a: 'You can add products to your basket and proceed to the Order Request screen. Once submitted, your order summary is pre-filled for direct confirmation with our team on WhatsApp. We confirm shipping charges and provide direct UPI / bank transfer payment instructions before dispatching your package.',
  },
];

export const FaqPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(
    (f) => activeCategory === 'all' || f.category === activeCategory
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
          Help & Information
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#063B25]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          Find answers to common questions regarding delivery across India, distributor partnerships, brewing suggestions, and order requests.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'delivery', label: 'All India Delivery' },
          { id: 'products', label: 'Products & Ingredients' },
          { id: 'distributor', label: 'Distributor & Wholesale' },
          { id: 'orders', label: 'Orders & Payments' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveCategory(tab.id);
              setOpenIndex(null);
            }}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              activeCategory === tab.id
                ? 'bg-[#063B25] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-stone-900 hover:text-[#063B25]"
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-500 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Banner */}
      <div className="bg-[#063B25] text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-[#FFF9EC]">Have another question?</h3>
          <p className="text-xs text-stone-300 mt-0.5">
            Our customer care team is available on WhatsApp Monday through Saturday.
          </p>
        </div>
        <a
          href={BUSINESS_CONFIG.whatsappBaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-[#D9A62E] hover:bg-[#c29124] text-[#063B25] text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center gap-1.5 shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Ask on WhatsApp: {BUSINESS_CONFIG.officialPhone}</span>
        </a>
      </div>
    </div>
  );
};
