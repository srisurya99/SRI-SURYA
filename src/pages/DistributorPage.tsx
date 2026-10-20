import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  Store,
  Hotel,
  CheckCircle2,
  MessageSquare,
  Phone,
  Truck,
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import {
  validateDistributorForm,
  type DistributorFormData,
  type ValidationErrors
} from '../utils/validation';
import { buildWhatsAppUrl, createDistributorEnquiryMessage } from '../utils/whatsapp';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Telangana',
  'Karnataka',
  'Tamil Nadu',
  'Maharashtra',
  'Kerala',
  'Gujarat',
  'Rajasthan',
  'Madhya Pradesh',
  'Uttar Pradesh',
  'West Bengal',
  'Punjab',
  'Haryana',
  'Delhi',
  'Bihar',
  'Odisha',
  'Assam',
  'Goa',
  'Chhattisgarh',
  'Jharkhand',
  'Uttarakhand',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Other State / UT',
];

const BUSINESS_TYPES = [
  'Become a Distributor',
  'Wholesale Enquiry',
  'Retailer Partnership',
  'Supermarket Enquiry',
  'Bulk Order Enquiry',
  'Hotel and Restaurant Supply Enquiry',
];

const PRODUCT_CATEGORIES = [
  'Tea Powders (Assam CTC, Masala, Elachi, Bellam Chai)',
  'Green Tea Varieties (Tulasi, Hibiscus, Ginger Mint)',
  'Black Tea (Orthodox Leaf)',
  'Coffee Mixes (Traditional Filter & Instant)',
  'Health & Wellness Powders (Organic Jaggery, Badam, Ragi Malt)',
];

const ORDER_QUANTITIES = [
  '50 kg - 100 kg / month',
  '100 kg - 250 kg / month',
  '250 kg - 500 kg / month',
  '500 kg - 1000 kg / month',
  '1000+ kg / month (Super stockist / Regional)',
  'Trial / Initial Evaluation Order',
];

export const DistributorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');

  let defaultType = 'Become a Distributor';
  if (typeParam === 'wholesale') defaultType = 'Wholesale Enquiry';
  if (typeParam === 'supermarket') defaultType = 'Supermarket Enquiry';
  if (typeParam === 'hacc') defaultType = 'Hotel and Restaurant Supply Enquiry';

  const [formData, setFormData] = useState<DistributorFormData>({
    fullName: '',
    businessName: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    state: 'Andhra Pradesh',
    city: '',
    businessType: defaultType,
    productsInterestedIn: ['Tea Powders (Assam CTC, Masala, Elachi, Bellam Chai)'],
    expectedOrderQuantity: '100 kg - 250 kg / month',
    message: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<DistributorFormData | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleProductToggle = (category: string) => {
    setFormData((prev) => {
      const exists = prev.productsInterestedIn.includes(category);
      const updated = exists
        ? prev.productsInterestedIn.filter((c) => c !== category)
        : [...prev.productsInterestedIn, category];
      return { ...prev, productsInterestedIn: updated };
    });
    if (errors.productsInterestedIn) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.productsInterestedIn;
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateDistributorForm(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    // Save to local enquiries log
    try {
      const enquiries = JSON.parse(localStorage.getItem('sri_surya_b2b_enquiries') || '[]');
      enquiries.unshift({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('sri_surya_b2b_enquiries', JSON.stringify(enquiries));
    } catch {
      // ignore
    }

    setSubmittedData(formData);
    setSubmitted(true);
  };

  const whatsappDirectUrl = submittedData
    ? buildWhatsAppUrl(createDistributorEnquiryMessage(submittedData))
    : buildWhatsAppUrl(createDistributorEnquiryMessage(formData));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      {/* Hero Header */}
      <div className="bg-[#063B25] text-[#FFF9EC] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#0B5836] relative overflow-hidden shadow-xl">
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
            <Building2 className="w-4 h-4" />
            <span>Official B2B & Trade Desk</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            {BUSINESS_CONFIG.distributorHeadline}
          </h1>

          <p className="text-base sm:text-lg text-stone-200 font-medium leading-relaxed">
            {BUSINESS_CONFIG.distributorSubheadline}
          </p>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
            {BUSINESS_CONFIG.distributorSupportMessage}
          </p>
        </div>
      </div>

      {/* Trade Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#063B25]/10 text-[#063B25] flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-[#0B5836]" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">Distributors & Wholesalers</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Territory-focused distribution rights with wholesale carton pricing, consistent supply, and marketing support for district markets.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#063B25]/10 text-[#063B25] flex items-center justify-center">
            <Store className="w-5 h-5 text-[#0B5836]" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">Supermarkets & Retailers</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Attractive shelf packaging, ready barcode-compliant packs, and proven consumer repeat purchases across tea powders and filter coffees.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#063B25]/10 text-[#063B25] flex items-center justify-center">
            <Hotel className="w-5 h-5 text-[#0B5836]" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">Hotels, Cafes & Canteens</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            1 kg commercial packs of Premium Chai CTC and pure Filter Coffee ensuring consistent decoction yield and flavor batch after batch.
          </p>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Business Enquiry Form */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          {submitted ? (
            /* Confirmation state */
            <div className="py-8 text-center space-y-6 animate-in fade-in">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#D9A62E]">
                  Enquiry Registered
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#063B25] mt-1">
                  Thank You for Partnering With Sri Surya
                </h2>
                <p className="text-xs text-stone-600 max-w-md mx-auto mt-2 leading-relaxed">
                  Your business enquiry for <strong className="text-stone-900">{submittedData?.businessName}</strong> ({submittedData?.businessType}) has been recorded.
                </p>
              </div>

              {/* Clarification on backend and direct WhatsApp handoff */}
              <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl max-w-lg mx-auto text-left space-y-3 text-xs text-stone-600">
                <h4 className="font-serif text-sm font-bold text-stone-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Immediate WhatsApp Trade Desk Handoff</span>
                </h4>
                <p>
                  To accelerate onboarding and receive our trade catalog and wholesale price slabs immediately, you can send this enquiry directly to our official WhatsApp trade desk at <strong className="text-stone-900 font-mono">{BUSINESS_CONFIG.officialPhone}</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 font-bold text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat With Sri Surya Trade Desk</span>
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-3.5 border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-md transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
                  Trade Application
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063B25] mt-1">
                  Business Partnership Enquiry Form
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Please provide your business and location details to receive our wholesale price list.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Full Name & 2. Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      1. Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Contact person full name"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
                    />
                    {errors.fullName && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.fullName}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      2. Business Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Firm, agency, or store name"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
                    />
                    {errors.businessName && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.businessName}</span>
                    )}
                  </div>
                </div>

                {/* 3. Mobile Number & 4. WhatsApp Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      3. Mobile Number (Calls) *
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="10-digit Indian mobile number"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25] font-mono"
                    />
                    {errors.mobileNumber && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.mobileNumber}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      4. WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      placeholder="10-digit WhatsApp number"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25] font-mono"
                    />
                    {errors.whatsappNumber && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.whatsappNumber}</span>
                    )}
                  </div>
                </div>

                {/* 5. Email Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    5. Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="official@yourbusiness.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
                  />
                  {errors.email && (
                    <span className="text-[11px] text-rose-600 mt-1 block">{errors.email}</span>
                  )}
                </div>

                {/* 6. State & 7. City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      6. State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.state}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      7. City / Operating Town *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Hyderabad, Vijayawada, Guntur"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
                    />
                    {errors.city && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.city}</span>
                    )}
                  </div>
                </div>

                {/* 8. Business Type */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    8. Business Type *
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
                  >
                    {BUSINESS_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.businessType && (
                    <span className="text-[11px] text-rose-600 mt-1 block">{errors.businessType}</span>
                  )}
                </div>

                {/* 9. Products Interested In (Checkboxes) */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                    9. Products Interested In *
                  </label>
                  <div className="space-y-2 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                    {PRODUCT_CATEGORIES.map((cat) => {
                      const checked = formData.productsInterestedIn.includes(cat);
                      return (
                        <label
                          key={cat}
                          className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleProductToggle(cat)}
                            className="mt-0.5 rounded border-stone-300 text-[#063B25] focus:ring-[#063B25]"
                          />
                          <span>{cat}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.productsInterestedIn && (
                    <span className="text-[11px] text-rose-600 mt-1 block">
                      {errors.productsInterestedIn}
                    </span>
                  )}
                </div>

                {/* 10. Expected Order Quantity */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    10. Expected Order Quantity *
                  </label>
                  <select
                    name="expectedOrderQuantity"
                    value={formData.expectedOrderQuantity}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
                  >
                    {ORDER_QUANTITIES.map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                  {errors.expectedOrderQuantity && (
                    <span className="text-[11px] text-rose-600 mt-1 block">
                      {errors.expectedOrderQuantity}
                    </span>
                  )}
                </div>

                {/* 11. Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    11. Message / Business Profile (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your distribution reach, existing brands handled, or retail outlets..."
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#063B25] hover:bg-[#0B5836] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>SUBMIT BUSINESS ENQUIRY</span>
                    <ArrowRight className="w-4 h-4 text-[#D9A62E]" />
                  </button>
                  <p className="text-[11px] text-stone-500 text-center mt-2">
                    Enquiries are answered by the Sri Surya trade management team within 24 hours.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Right Column: Contact Card & B2B Assurance */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#063B25] text-white p-6 sm:p-8 rounded-3xl border border-[#0B5836] space-y-4 shadow-sm">
            <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
              Direct Contact
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFF9EC]">
              Talk Directly with Trade Desk
            </h3>
            <p className="text-xs text-stone-200 leading-relaxed">
              Prefer an immediate voice or WhatsApp conversation? Reach out directly to our official business coordinator.
            </p>

            <div className="pt-2 space-y-3">
              <a
                href={BUSINESS_CONFIG.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 text-xs font-bold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {BUSINESS_CONFIG.officialPhone}</span>
              </a>

              <div className="text-center">
                <span className="text-[11px] text-stone-300">
                  Business Hours: {BUSINESS_CONFIG.operatingHours}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4 text-xs text-stone-700">
            <h4 className="font-serif text-base font-bold text-stone-900">
              Trade Partner Commitments
            </h4>
            <div className="space-y-3">
              <div className="flex gap-2.5 items-start">
                <PackageCheck className="w-4 h-4 text-[#0B5836] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900">Fresh Small-Batch Blending:</strong> Tea and coffee packs dispatched within weeks of harvest and processing.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <Truck className="w-4 h-4 text-[#0B5836] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900">All India Logistics:</strong> Established freight and express courier tie-ups across Tier 1, 2, and 3 cities.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <Building2 className="w-4 h-4 text-[#0B5836] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900">Consistent Supply:</strong> Reliable stock availability across all 25 catalogue SKUs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
