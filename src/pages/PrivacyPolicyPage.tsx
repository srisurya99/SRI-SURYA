import React from 'react';
import { BUSINESS_CONFIG } from '../config/business';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      <div className="space-y-2 border-b border-stone-200 pb-4">
        <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
          Legal & Trust
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#063B25]">
          Privacy Policy
        </h1>
        <p className="text-xs text-stone-500">
          Last updated: October 2026 · Sri Surya Natural Tea & Coffee Powders
        </p>
      </div>

      <div className="text-xs sm:text-sm text-stone-700 space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-stone-900">1. Information We Collect</h2>
          <p>
            When you place an order request or submit a distributor enquiry with Sri Surya, we collect personal information including your full name, business name, mobile phone number, WhatsApp number, email address, and delivery shipping address.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-stone-900">2. How We Use Your Data</h2>
          <p>
            Your information is used exclusively to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Process and fulfill your beverage order requests and coordinate dispatch.</li>
            <li>Verify delivery charges and communicate delivery timelines via WhatsApp/SMS.</li>
            <li>Review and respond to dealership, wholesale, and supermarket supply enquiries.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-stone-900">3. Data Sharing & Privacy</h2>
          <p>
            We do not sell, rent, or trade your personal or business data to third-party advertisers. Information is shared only with certified courier and delivery partners strictly for package transit.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-stone-900">4. Contact Desk</h2>
          <p>
            For inquiries regarding privacy or your data records, reach us at:
            <br />
            <strong>WhatsApp:</strong> +91 {BUSINESS_CONFIG.officialPhone}
            <br />
            <strong>Email:</strong> {BUSINESS_CONFIG.supportEmail}
          </p>
        </section>
      </div>
    </div>
  );
};
