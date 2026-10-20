import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingBag,
  MessageSquare,
  Truck,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  Sparkles,
  Coffee,
  RotateCcw
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { formatINR } from '../utils/pricing';
import { useCart } from '../context/CartContext';
import { buildWhatsAppUrl, createProductEnquiryMessage } from '../utils/whatsapp';
import { BUSINESS_CONFIG } from '../config/business';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappUrl = buildWhatsAppUrl(createProductEnquiryMessage(product));

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link to="/shop" className="hover:text-[#063B25]">
          Shop
        </Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-[#063B25]">
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="text-stone-900 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid (Contiguous purchase module) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left: Product Media Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-[#fbf9f4] border border-stone-200/80 shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Sourcing & Purity Badges */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs text-stone-600 bg-white p-3.5 rounded-xl border border-stone-200">
            <div>
              <span className="block font-semibold text-stone-900">100% Pure</span>
              <span className="text-[11px] text-stone-500">No Preservatives</span>
            </div>
            <div className="border-x border-stone-200">
              <span className="block font-semibold text-stone-900">Pack Size</span>
              <span className="text-[11px] text-stone-500">{product.weight}</span>
            </div>
            <div>
              <span className="block font-semibold text-stone-900">All India</span>
              <span className="text-[11px] text-stone-500">Direct Courier</span>
            </div>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            {/* Zero-Pill Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0B5836] uppercase tracking-wider">
              <span>{product.categoryName}</span>
              <span aria-hidden="true">·</span>
              <span>Net Weight: {product.weight}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-mono text-3xl font-bold text-[#063B25] tabular-nums">
                {formatINR(product.price)}
              </span>
              <span className="text-xs text-stone-500">
                (Inclusive of all taxes · Delivery calculated by PIN code)
              </span>
            </div>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed">{product.description}</p>

          {/* Quantity Selector & Action Buttons */}
          <div className="pt-2 border-t border-stone-200 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Quantity
              </span>
              <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-stone-600 hover:text-stone-900"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-mono font-bold tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-stone-600 hover:text-stone-900"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className={`py-3.5 px-6 rounded-md font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm ${
                  added
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#063B25] text-white hover:bg-[#0B5836]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Basket</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart ({formatINR(product.price * quantity)})</span>
                  </>
                )}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-md font-semibold text-xs uppercase tracking-wider border border-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#063B25] flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Buy On WhatsApp</span>
              </a>
            </div>
          </div>

          {/* ALL INDIA DELIVERY BOX */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#FFF9EC] border border-[#D9A62E]/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#063B25] uppercase tracking-wide">
              <Truck className="w-4 h-4 text-[#D9A62E]" />
              <span>{BUSINESS_CONFIG.deliveryNotice}</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              {BUSINESS_CONFIG.deliveryDescription}
            </p>
            <div className="pt-1">
              <a
                href={buildWhatsAppUrl(
                  `Hello Sri Surya, I would like to check delivery charges and transit time for ${product.name} (${product.weight}) to my PIN code:`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#063B25] hover:text-[#0B5836] underline underline-offset-2 flex items-center gap-1"
              >
                <span>Ask delivery charge for your PIN code on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Ingredients & Brewing Info Tabs */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <div>
              <h3 className="font-serif text-base font-bold text-stone-900 mb-2">
                Ingredients & Composition
              </h3>
              <ul className="text-xs text-stone-600 space-y-1 list-disc pl-4">
                {product.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-base font-bold text-stone-900 mb-2">
                Brewing & Preparation Guide
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3.5 rounded-lg border border-stone-200">
                {product.brewingInstructions}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-stone-200 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-[#063B25]">
              More from {product.categoryName}
            </h2>
            <Link
              to={`/category/${product.category}`}
              className="text-xs font-semibold text-[#063B25] hover:underline"
            >
              View Category →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
