import React, { useState } from 'react';
import { Truck, MessageSquare, ShieldCheck, MapPin, Package, Clock, AlertCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { buildWhatsAppUrl, createDeliveryEnquiryMessage } from '../utils/whatsapp';

export const AllIndiaDeliveryPage: React.FC = () => {
  const [pincode, setPincode] = useState('');

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppUrl(createDeliveryEnquiryMessage(pincode.trim()));
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      {/* Hero Announcement */}
      <div className="bg-[#063B25] text-[#FFF9EC] rounded-3xl p-8 sm:p-12 border border-[#0B5836] shadow-xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
          <Truck className="w-4 h-4" />
          <span>Verified National Logistics</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold">
          {BUSINESS_CONFIG.deliveryNotice}
        </h1>

        <p className="text-sm sm:text-base text-stone-200 max-w-2xl mx-auto leading-relaxed">
          {BUSINESS_CONFIG.deliveryDescription}
        </p>

        {/* PIN Code Checker Form */}
        <div className="pt-4 max-w-md mx-auto">
          <form onSubmit={handlePincodeSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter 6-digit destination PIN code"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="px-4 py-3 bg-white text-stone-900 placeholder:text-stone-400 rounded-md text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D9A62E] flex-1"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-[#D9A62E] hover:bg-[#c29124] text-[#063B25] text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Verify On WhatsApp</span>
            </button>
          </form>
          <span className="text-[11px] text-stone-300 mt-2 block">
            Official WhatsApp Desk: <strong className="font-mono text-white">{BUSINESS_CONFIG.officialPhone}</strong>
          </span>
        </div>
      </div>

      {/* Delivery Policy Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#063B25]/10 text-[#063B25] flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#0B5836]" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">Estimated Transit Times</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Consignments typically reach South Indian metro areas in 2-4 business days, and other states within 4-7 business days depending on distance and courier connectivity.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#063B25]/10 text-[#063B25] flex items-center justify-center">
            <Package className="w-5 h-5 text-[#0B5836]" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">Aroma-Lock Packaging</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every product is heat-sealed in heavy-duty moisture-barrier aluminum foil pouches or tins to ensure zero flavor loss during transit across varied climates.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#063B25]/10 text-[#063B25] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#0B5836]" />
          </div>
          <h3 className="font-serif text-lg font-bold text-stone-900">Transparent Shipping Charges</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Shipping fees are calculated accurately based on total parcel weight and destination PIN code, without inflated hidden markups.
          </p>
        </div>
      </div>

      {/* States Covered Section */}
      <div className="bg-white p-8 rounded-2xl border border-stone-200 space-y-6">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
            Network Reach
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#063B25]">
            Serving Customers Across Every State & Territory
          </h2>
          <p className="text-xs text-stone-500">
            We partner with premier Indian express couriers and surface cargo networks for individual cartons and wholesale palettes.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-stone-700">
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <strong className="block text-stone-900">Southern Region</strong>
            Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Kerala
          </div>
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <strong className="block text-stone-900">Western Region</strong>
            Maharashtra, Gujarat, Goa, Rajasthan
          </div>
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <strong className="block text-stone-900">Northern Region</strong>
            Delhi NCR, Punjab, Haryana, Uttar Pradesh, Himachal
          </div>
          <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
            <strong className="block text-stone-900">Eastern & Central</strong>
            West Bengal, Odisha, Bihar, Madhya Pradesh, Assam
          </div>
        </div>
      </div>
    </div>
  );
};
