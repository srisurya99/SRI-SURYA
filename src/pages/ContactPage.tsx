import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { isValidIndianMobile, isValidEmail } from '../utils/validation';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [topic, setTopic] = useState('Product Enquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim() || !message.trim()) {
      setError('Please fill in your name, mobile number, and message.');
      return;
    }
    if (!isValidIndianMobile(mobile)) {
      setError('Please provide a valid 10-digit Indian mobile number.');
      return;
    }
    setError('');

    // Pre-fill WhatsApp message
    const waMsg = [
      `*SRI SURYA - GENERAL CONTACT INQUIRY*`,
      `Name: ${name.trim()}`,
      `Mobile: ${mobile.trim()}`,
      `Topic: ${topic}`,
      `Message: ${message.trim()}`,
    ].join('\n');

    const url = buildWhatsAppUrl(waMsg);
    setSent(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
          Get in Touch
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#063B25]">
          Contact Sri Surya
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          Have a question about our teas, delivery to your location, or trade partnerships? Our team is always ready to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Official WhatsApp Card */}
          <div className="bg-[#063B25] text-white p-6 sm:p-8 rounded-2xl border border-[#0B5836] space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D9A62E]">
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Official WhatsApp Helpdesk</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white font-mono">
              {BUSINESS_CONFIG.officialPhone}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Connect instantly on WhatsApp for product guidance, order status, shipping estimates, or wholesale catalog access.
            </p>
            <div className="pt-2">
              <a
                href={BUSINESS_CONFIG.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 text-xs font-bold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Details list */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4 text-xs text-stone-700">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#0B5836] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Working Hours</strong>
                <span>{BUSINESS_CONFIG.operatingHours}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#0B5836] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Official Email</strong>
                <span>{BUSINESS_CONFIG.supportEmail}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#0B5836] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-stone-900">Dispatch Hub</strong>
                <span>Andhra Pradesh & Telangana, India (Pan-India Shipping)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h2 className="font-serif text-xl font-bold text-stone-900">
            Send Us a Direct Message
          </h2>
          <p className="text-xs text-stone-500">
            Fill this quick enquiry and it will directly connect with our customer care team on WhatsApp.
          </p>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md">
              {error}
            </div>
          )}

          {sent && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Message submitted! WhatsApp has been opened to finalize your enquiry.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                10-Digit Mobile / WhatsApp Number *
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="e.g. 7032048859"
                className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Enquiry Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
              >
                <option value="Product Enquiry">Product Enquiry / Buying</option>
                <option value="All India Delivery Check">All India Delivery / PIN Code Check</option>
                <option value="Distributor & Wholesale">Distributor & Wholesale Partnership</option>
                <option value="Existing Order Status">Existing Order Status</option>
                <option value="Other">Other Enquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Message *
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you today?"
                className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#063B25] hover:bg-[#0B5836] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message to WhatsApp Desk</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
