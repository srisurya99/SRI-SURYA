import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, ArrowRight, MessageSquare, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_CONFIG } from '../config/business';

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchInput(false);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Shop All', to: '/shop' },
    { name: 'Tea Powders', to: '/category/tea-powders' },
    { name: 'Green Tea', to: '/category/green-tea' },
    { name: 'Coffee Mixes', to: '/category/coffee-mixes' },
    { name: 'Delivery', to: '/all-india-delivery' },
    { name: 'Become a Distributor', to: '/become-a-distributor' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          className="flex flex-col whitespace-nowrap shrink-0 group focus:outline-none"
          aria-label="Sri Surya Homepage"
        >
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#063B25] group-hover:text-[#0B5836] transition-colors">
            SRI SURYA
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#D9A62E] font-medium -mt-1">
            Natural Tea & Coffee
          </span>
        </Link>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `whitespace-nowrap shrink-0 transition-colors py-1 relative hover:text-[#063B25] ${
                  isActive
                    ? 'text-[#063B25] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#D9A62E]'
                    : ''
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Actions (Search, Cart, Distributor CTA) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search */}
          {showSearchInput ? (
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search teas, coffee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-48 lg:w-56 pl-3 pr-8 py-1.5 text-xs bg-stone-100 rounded-lg border border-stone-300 focus:outline-none focus:border-[#0B5836]"
              />
              <button
                type="button"
                onClick={() => setShowSearchInput(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                aria-label="Close search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowSearchInput(true)}
              className="p-2 text-stone-600 hover:text-[#063B25] rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-stone-700 hover:text-[#063B25] rounded-full hover:bg-stone-100 transition-colors"
            aria-label={`Open shopping cart with ${totalItems} items`}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#D9A62E] text-[#063B25] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                {totalItems}
              </span>
            )}
          </button>

          {/* Become a Distributor CTA (Desktop) */}
          <Link
            to="/become-a-distributor"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#063B25] hover:bg-[#0B5836] rounded-md transition-colors shadow-xs whitespace-nowrap"
          >
            <span>Partner / B2B</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-[#063B25] rounded-md focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FFFDF8] px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-10 py-2.5 text-sm bg-stone-100 rounded-lg border border-stone-300 focus:outline-none focus:border-[#0B5836]"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-stone-500"
              aria-label="Submit search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="flex flex-col space-y-2 pt-2 border-t border-stone-100">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#063B25] text-white'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
            <Link
              to="/become-a-distributor"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#063B25] text-white text-sm font-semibold rounded-md shadow-xs"
            >
              <span>Partner With Sri Surya (Distributor Enquiry)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={BUSINESS_CONFIG.whatsappBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#25D366]/10 text-[#063B25] text-sm font-medium border border-[#25D366]/40 rounded-md"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp: {BUSINESS_CONFIG.officialPhone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
