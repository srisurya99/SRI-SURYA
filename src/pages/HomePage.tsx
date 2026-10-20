import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Coffee,
  Flame,
  Award,
  Users
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { BUSINESS_CONFIG } from '../config/business';
import { buildWhatsAppUrl, createDeliveryEnquiryMessage } from '../utils/whatsapp';

export const HomePage: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 6);
  const teaPowders = PRODUCTS.filter((p) => p.category === 'tea-powders').slice(0, 4);
  const coffeeAndGreen = PRODUCTS.filter(
    (p) => p.category === 'coffee-mixes' || p.category === 'green-tea'
  ).slice(0, 4);

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    const url = buildWhatsAppUrl(createDeliveryEnquiryMessage(cleanPin));
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const faqs = [
    {
      q: 'Do you deliver Sri Surya products across all Indian states and pin codes?',
      a: 'Yes, All India Delivery is available! We dispatch products across Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Maharashtra, and all other Indian states. You can contact us with your destination pin code to verify shipping fees and transit time.',
    },
    {
      q: 'How can I become an authorized Sri Surya distributor or retailer?',
      a: 'We welcome partnership applications from distributors, wholesalers, supermarkets, grocery merchants, and institutional buyers. Visit our "Become a Distributor" page or connect on WhatsApp at 7032048859 with your business profile.',
    },
    {
      q: 'What makes Sri Surya Bellam (Jaggery) Tea special?',
      a: 'Our Bellam Tea is formulated with specially processed CTC black tea with a balanced tannin profile. When brewed with pure organic jaggery powder and milk, it preserves the velvety consistency without curdling, yielding an authentic rustic chai.',
    },
    {
      q: 'What is the shelf life and packaging standard of Sri Surya products?',
      a: 'All our products are packed in multi-barrier moisture-proof food grade pouches and tins to lock in essential volatile oils and natural aromatics for 12 months from packing date.',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#042416]">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/sri_surya_hero_tea_1792505027408.jpg"
            alt="Steaming cup of freshly brewed Indian tea with Nilgiri tea hills"
            className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#042416] via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 text-white w-full">
          <div className="max-w-2xl space-y-6">
            {/* Delivery Badge / Pill-free text */}
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
              <Truck className="w-4 h-4" />
              <span>{BUSINESS_CONFIG.deliveryNotice}</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-[#FFF9EC] text-balance">
              Nature's Finest. <br />
              <span className="italic font-normal text-[#D9A62E]">India's Favourite</span> Ritual.
            </h1>

            {/* Description */}
            <p className="text-stone-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
              Discover authentic tea, aromatic coffee blends, and traditional drink mixes from Sri Surya. Handcrafted from prime estate leaves and wholesome native spices.
            </p>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/shop"
                className="px-6 py-3.5 bg-[#D9A62E] hover:bg-[#c29124] text-[#063B25] text-xs font-bold uppercase tracking-wider rounded-md text-center transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop Our Collection</span>
              </Link>

              <Link
                to="/become-a-distributor"
                className="px-6 py-3.5 bg-[#063B25]/80 hover:bg-[#063B25] border border-white/20 text-[#FFF9EC] text-xs font-bold uppercase tracking-wider rounded-md text-center backdrop-blur-xs transition-all flex items-center justify-center gap-2"
              >
                <span>Become a Distributor</span>
                <ArrowRight className="w-4 h-4 text-[#D9A62E]" />
              </Link>
            </div>

            {/* Micro Trust markers */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-stone-300">
              <div>
                <span className="block font-mono text-base font-bold text-white tabular-nums">25</span>
                <span className="text-[11px] text-stone-400">Pure Formulations</span>
              </div>
              <div>
                <span className="block font-mono text-base font-bold text-white tabular-nums">100%</span>
                <span className="text-[11px] text-stone-400">Natural Ingredients</span>
              </div>
              <div>
                <span className="block font-mono text-base font-bold text-white">All India</span>
                <span className="text-[11px] text-stone-400">Direct Courier</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Announcement Strip & Pincode Checker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#063B25] text-[#FFF9EC] rounded-2xl p-6 sm:p-8 shadow-xl border border-[#0B5836] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D9A62E]">
              <Truck className="w-4 h-4" />
              <span>{BUSINESS_CONFIG.deliveryNotice}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF9EC]">
              Order From Anywhere In India
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              {BUSINESS_CONFIG.deliveryDescription}
            </p>
          </div>

          <form onSubmit={handlePincodeSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              placeholder="Enter 6-digit PIN code"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="px-4 py-2.5 bg-white text-stone-900 placeholder:text-stone-400 rounded-md text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#D9A62E] w-full sm:w-48"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#D9A62E] hover:bg-[#c29124] text-[#063B25] text-xs font-bold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Check On WhatsApp</span>
            </button>
          </form>
        </div>
      </section>

      {/* 3. Featured Signatures */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold mb-1">
              Curated Selection
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#063B25]">
              Featured Sri Surya Blends
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#063B25] hover:text-[#0B5836] transition-colors"
          >
            <span>View Full Catalogue (25 Products)</span>
            <ArrowRight className="w-4 h-4 text-[#D9A62E]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Category Navigator Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
            Product Categories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#063B25] mt-1">
            Explore By Beverage Ritual
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group p-5 bg-white rounded-xl border border-stone-200 hover:border-[#0B5836] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#0B5836] transition-colors block">
                  {cat.name}
                </span>
                <p className="mt-2 text-xs text-stone-500 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#063B25] group-hover:text-[#0B5836]">
                <span>Browse Products</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Deep Dive: Tea Powders Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold mb-1">
              Tea Powders · Assam CTC & Traditional Spices
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#063B25]">
              Authentic Indian Chai Blends
            </h2>
          </div>
          <Link
            to="/category/tea-powders"
            className="text-xs font-bold uppercase tracking-wider text-[#063B25] hover:underline"
          >
            Explore all 8 tea powders →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teaPowders.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Cinematic Brewing Story / Ritual */}
      <section className="bg-[#063B25] text-[#FFF9EC] py-16 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 shadow-2xl border border-[#0B5836]">
              <img
                src="/src/assets/images/sri_surya_packaging_showcase_1792505029345.jpg"
                alt="Sri Surya authentic tea packages and whole spices"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-stone-200">
                Crafted with selected Assam tea leaves and freshly ground native spices.
              </div>
            </div>

            {/* Story Text */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
                The Heritage Craft
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF9EC] leading-tight">
                From Estate Gardens To Your Morning Cup
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed">
                At Sri Surya, we believe tea and coffee are sacred daily rituals across Indian households. We meticulously select high-grown tea granules, sun-dried ginger, green cardamom from the Western Ghats, and whole spices ground in small batches to preserve volatile essential oils.
              </p>

              {/* Steps */}
              <div className="space-y-4 pt-2">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#0B5836] text-[#D9A62E] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    01
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-white">Estate Harvest & Sorting</h4>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Selected tender shoots from premier tea estates, processed for optimal strength, briskness, and liquor color.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#0B5836] text-[#D9A62E] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    02
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-white">Pure Natural Spice Grinding</h4>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Whole cardamom, dried ginger, cinnamon, and cloves slowly ground to preserve pungent aromatics without burnt notes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#0B5836] text-[#D9A62E] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    03
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-white">Moisture-Proof Barrier Packaging</h4>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Hermetically sealed at source to guarantee fresh garden fragrance when unsealed in your kitchen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#D9A62E] hover:underline"
                >
                  <span>Learn more about our sourcing & philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Green Tea & Coffee Mixes Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold mb-1">
              Antioxidants & South Indian Kaapi
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#063B25]">
              Green Teas & Traditional Coffee Mixes
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
            <Link to="/category/green-tea" className="text-[#063B25] hover:underline">
              Green Teas →
            </Link>
            <span className="text-stone-300">·</span>
            <Link to="/category/coffee-mixes" className="text-[#063B25] hover:underline">
              Coffee Mixes →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coffeeAndGreen.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. Why Choose Sri Surya (Only Verified Facts) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
            Quality Commitments
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#063B25] mt-1">
            Why Discerning Chai & Coffee Lovers Choose Sri Surya
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#063B25]/10 text-[#063B25] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#0B5836]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              100% Pure Natural Ingredients
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              No artificial chemical enhancers, synthetic essences, or synthetic colors. Every pack contains real tea leaves, wholesome spices, and unrefined sweeteners.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#063B25]/10 text-[#063B25] flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#0B5836]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Authentic South Indian Heritage
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              From our famous Bellam (Jaggery) Chai formulated to avoid curdling, to traditional chicory filter coffee and restorative Sonti Kaapi.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#063B25]/10 text-[#063B25] flex items-center justify-center">
              <Truck className="w-5 h-5 text-[#0B5836]" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Verified All India Dispatch
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Order directly to your home, retail grocery outlet, or supermarket from any location across India with transparent courier tracking and support.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Major Distributor & Wholesale Acquisition Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl overflow-hidden bg-[#063B25] text-white shadow-2xl border border-[#0B5836]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
                  Business & Trade Opportunities
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#FFF9EC]">
                  {BUSINESS_CONFIG.distributorHeadline}
                </h2>
                <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                  {BUSINESS_CONFIG.distributorSubheadline}
                </p>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {BUSINESS_CONFIG.distributorSupportMessage}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-200">
                <div className="border border-white/10 p-2.5 rounded-md bg-white/5">
                  <span className="block font-semibold text-white">Distributors</span>
                  <span className="text-[11px] text-stone-400">Territory supply</span>
                </div>
                <div className="border border-white/10 p-2.5 rounded-md bg-white/5">
                  <span className="block font-semibold text-white">Supermarkets</span>
                  <span className="text-[11px] text-stone-400">Retail shelf packs</span>
                </div>
                <div className="border border-white/10 p-2.5 rounded-md bg-white/5">
                  <span className="block font-semibold text-white">Hotels & Cafes</span>
                  <span className="text-[11px] text-stone-400">1kg bulk packs</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/become-a-distributor"
                  className="px-6 py-3.5 bg-[#D9A62E] hover:bg-[#c29124] text-[#063B25] text-xs font-bold uppercase tracking-wider rounded-md text-center transition-colors flex items-center justify-center gap-2"
                >
                  <span>Become a Distributor →</span>
                </Link>

                <a
                  href={BUSINESS_CONFIG.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 border border-white/20 hover:bg-white/10 text-white text-xs font-medium rounded-md text-center transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Trade Desk: {BUSINESS_CONFIG.officialPhone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img
                src="/src/assets/images/sri_surya_plantation_hills_1792505029315.jpg"
                alt="Southern India tea plantation hills"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#063B25] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ Preview Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
            Common Questions
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#063B25] mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
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

        <div className="text-center mt-6">
          <Link
            to="/faq"
            className="text-xs font-semibold text-[#063B25] hover:text-[#0B5836] underline underline-offset-4"
          >
            View all delivery, order & distributor FAQs →
          </Link>
        </div>
      </section>
    </div>
  );
};
