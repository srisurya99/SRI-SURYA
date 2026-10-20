import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Coffee, Award, Truck, MessageSquare } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
          Our Heritage & Craft
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#063B25]">
          Pure Leaves. Honest Spices. Everyday Rituals.
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Sri Surya was founded on an unwavering devotion: to revive the unhurried purity of Indian tea and coffee, free from artificial syrups, artificial colors, or chemical essences.
        </p>
      </div>

      {/* Feature Image with Story */}
      <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md">
        <img
          src="/src/assets/images/sri_surya_plantation_hills_1792505029315.jpg"
          alt="Lush green tea plantation terraces"
          className="w-full h-80 sm:h-96 object-cover"
        />
        <div className="p-6 sm:p-10 bg-white space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#063B25]">
            From Plantation Terraces to Your Kitchen
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            In every Indian home, morning begins with the whistle of a kettle and the aromatic awakening of chai or coffee. Yet modern commercialization frequently dilutes this cherished tradition with artificial spray-on flavors, exhausted leaf dust, and excessive chemical stabilizers.
          </p>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Sri Surya operates differently. We source direct from selected high-elevation estates in Assam and the Western Ghats. Our spiced formulations use whole green cardamom pods, sun-dried ginger, and aromatic spices crushed gently to retain their natural essential oils.
          </p>
        </div>
      </div>

      {/* Philosophy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
          <Leaf className="w-6 h-6 text-[#0B5836]" />
          <h3 className="font-serif text-lg font-bold text-stone-900">Zero Synthetic Adulteration</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We pledge 100% natural ingredients across all 25 products. No chemical colorants, fake aroma oils, or synthetic preservatives.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
          <Coffee className="w-6 h-6 text-[#0B5836]" />
          <h3 className="font-serif text-lg font-bold text-stone-900">Regional Chai Traditions</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            From our authentic Bellam (Jaggery) Chai blend specially formulated to avoid milk curdling, to traditional chicory filter coffee and comforting Sonti Kaapi.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3">
          <Truck className="w-6 h-6 text-[#0B5836]" />
          <h3 className="font-serif text-lg font-bold text-stone-900">Pan-India Availability</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Whether for your personal kitchen, retail display, or wholesale enterprise, Sri Surya delivers to addresses across every state in India.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-[#063B25] text-white p-8 sm:p-12 rounded-3xl text-center space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FFF9EC]">
          Experience Sri Surya Today
        </h2>
        <p className="text-xs sm:text-sm text-stone-200 max-w-xl mx-auto leading-relaxed">
          Order retail packs directly with All India delivery, or join us as a distributor to bring natural wellness to your city.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/shop"
            className="px-6 py-3 bg-[#D9A62E] hover:bg-[#c29124] text-[#063B25] text-xs font-bold uppercase tracking-wider rounded-md"
          >
            Shop Collection
          </Link>
          <Link
            to="/become-a-distributor"
            className="px-6 py-3 border border-white/20 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-md"
          >
            Become a Distributor
          </Link>
        </div>
      </div>
    </div>
  );
};
