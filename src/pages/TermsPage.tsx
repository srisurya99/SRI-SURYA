import React from 'react';
import { BUSINESS_CONFIG } from '../config/business';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      <div className="space-y-2 border-b border-stone-200 pb-4">
        <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
          Customer Terms
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#063B25]">
          Terms & Conditions
        </h1>
        <p className="text-xs text-stone-500">
          Last updated: October 2026 · Sri Surya Natural Tea & Coffee Powders
        </p>
      </div>

      <div className="text-xs sm:text-sm text-stone-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-stone-900">1. Agreement to Terms</h2>
          <p>
            By accessing or using the website of Sri Surya Natural Tea & Coffee Powders, requesting products, or applying for distribution rights, you agree to comply with these terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-stone-900">2. Pricing & Product Accuracy</h2>
          <p>
            All product specifications, pack weights, and prices listed in Indian Rupees (INR) reflect our genuine retail rate card. While we endeavor to keep all information current, prices and packaging formats may be updated to reflect raw spice and agricultural harvest indices.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-stone-900">3. Order Requests & Payment Confirmation</h2>
          <p>
            Submitting an order request on this website initiates a purchase inquiry. Final confirmation occurs upon verification of shipping availability and payment through verified banking/UPI channels. We do not represent an automated payment debit until payment is explicitly processed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-stone-900">4. Intellectual Property</h2>
          <p>
            The brand name Sri Surya, packaging designs, product formulations, photography, and written text are proprietary assets of Sri Surya Natural Tea & Coffee Powders.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-stone-900">5. Governing Law & Jurisdiction</h2>
          <p>
            These terms are governed by the laws of India. Any disputes arising in connection with orders or trade partnerships shall be subject to the exclusive jurisdiction of the competent courts in Andhra Pradesh, India.
          </p>
        </section>
      </div>
    </div>
  );
};
