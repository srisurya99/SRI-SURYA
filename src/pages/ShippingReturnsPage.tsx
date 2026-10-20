import React from 'react';
import { Truck, RotateCcw, ShieldCheck, MessageSquare } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      <div className="space-y-2 border-b border-stone-200 pb-4">
        <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
          Customer Policies
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#063B25]">
          Shipping, Delivery & Returns Policy
        </h1>
        <p className="text-xs text-stone-500">
          Last updated: October 2026 · Transparent dispatch guidelines for Sri Surya customers
        </p>
      </div>

      <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-stone-900">1. All India Delivery Policy</h2>
          <div className="bg-[#FFF9EC] p-4 rounded-xl border border-[#D9A62E]/40 text-stone-800 space-y-1">
            <strong className="block text-[#063B25] font-semibold">{BUSINESS_CONFIG.deliveryNotice}</strong>
            <p className="text-xs">{BUSINESS_CONFIG.deliveryDescription}</p>
          </div>
          <p>
            Sri Surya Natural Tea & Coffee Powders ships consignments to all serviceable pin codes across India. Deliveries are dispatched using trusted third-party courier services and freight logistics partners.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-stone-900">2. Dispatch & Transit Timelines</h2>
          <p>
            Standard retail and wholesale orders are processed and packed within 24 to 48 hours of order confirmation. Transit times vary by location:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Intra-State (Andhra Pradesh & Telangana):</strong> 2 to 3 business days</li>
            <li><strong>South India Metros (Bengaluru, Chennai, etc.):</strong> 3 to 4 business days</li>
            <li><strong>Rest of India:</strong> 4 to 7 business days depending on carrier network</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-stone-900">3. Shipping Charges & Tracking</h2>
          <p>
            Shipping fees are calculated accurately based on total parcel weight, volume, and destination pin code. We do not claim free shipping unconditionally. Once your package is handed over to the courier, a tracking ID is provided over WhatsApp/SMS.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-stone-900">4. Food Product Returns & Replacements</h2>
          <p>
            Because Sri Surya produces consumable tea, coffee, and food powders, products once opened cannot be returned for health and hygiene safety.
          </p>
          <p>
            However, if a package is received in a physically damaged or tampered state, please share unboxing photographs/video with our WhatsApp customer care desk at <strong>{BUSINESS_CONFIG.officialPhone}</strong> within 48 hours of delivery. We will immediately arrange a replacement or refund.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-bold text-stone-900">5. Contact Information</h2>
          <p>
            For any delivery or return queries, please connect with our official customer desk:
          </p>
          <p className="font-mono text-xs">
            WhatsApp: +91 {BUSINESS_CONFIG.officialPhone}<br />
            Email: {BUSINESS_CONFIG.supportEmail}
          </p>
        </section>
      </div>
    </div>
  );
};
