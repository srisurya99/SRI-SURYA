/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { DistributorPage } from './pages/DistributorPage';
import { AboutPage } from './pages/AboutPage';
import { AllIndiaDeliveryPage } from './pages/AllIndiaDeliveryPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ShippingReturnsPage } from './pages/ShippingReturnsPage';
import { MessageSquare } from 'lucide-react';
import { BUSINESS_CONFIG } from './config/business';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#FFFDF8] text-stone-900 font-sans selection:bg-[#D9A62E]/30 selection:text-[#063B25]">
          <ScrollToTop />
          <AnnouncementBar />
          <Navbar />

          <main className="flex-1">
            <Routes>
              {/* 1. Homepage */}
              <Route path="/" element={<HomePage />} />

              {/* 2. Shop (All Products) */}
              <Route path="/shop" element={<ShopPage />} />

              {/* 3-7. Specific Categories */}
              <Route path="/category/:categorySlug" element={<CategoryPage />} />

              {/* 8. Product Details */}
              <Route path="/product/:slug" element={<ProductDetailPage />} />

              {/* 9. Shopping Cart */}
              <Route path="/cart" element={<CartPage />} />

              {/* 10. Checkout / Order Request */}
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* 11. About Sri Surya */}
              <Route path="/about" element={<AboutPage />} />

              {/* 12. All India Delivery Information */}
              <Route path="/all-india-delivery" element={<AllIndiaDeliveryPage />} />

              {/* 13. Distributor & Wholesale Business Enquiries */}
              <Route path="/become-a-distributor" element={<DistributorPage />} />

              {/* 14. Contact */}
              <Route path="/contact" element={<ContactPage />} />

              {/* 15. FAQ */}
              <Route path="/faq" element={<FaqPage />} />

              {/* 16. Privacy Policy */}
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

              {/* 17. Terms & Conditions */}
              <Route path="/terms-and-conditions" element={<TermsPage />} />

              {/* 18. Shipping & Returns */}
              <Route path="/shipping-and-returns" element={<ShippingReturnsPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <CartDrawer />

          {/* Floating WhatsApp Quick Connect Button */}
          <a
            href={BUSINESS_CONFIG.whatsappBaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 z-30 bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 p-3.5 rounded-full shadow-lg flex items-center gap-2 group transition-all duration-300 hover:scale-105 focus:outline-none"
            aria-label={`Chat with Sri Surya on WhatsApp: ${BUSINESS_CONFIG.officialPhone}`}
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider pr-1">
              WhatsApp Trade Desk
            </span>
          </a>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
