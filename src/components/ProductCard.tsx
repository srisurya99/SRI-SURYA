import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageSquare, Check, ArrowUpRight } from 'lucide-react';
import type { Product } from '../data/products';
import { formatINR } from '../utils/pricing';
import { useCart } from '../context/CartContext';
import { buildWhatsAppUrl, createProductEnquiryMessage } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const whatsappUrl = buildWhatsAppUrl(createProductEnquiryMessage(product));

  return (
    <div className="group relative bg-white rounded-xl border border-stone-200/80 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Product Image Area */}
      <Link
        to={`/product/${product.slug}`}
        className="relative aspect-4/3 sm:aspect-square w-full bg-[#fbf9f4] overflow-hidden block"
        aria-label={`View ${product.name}`}
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-stone-100">
            <span className="font-serif text-lg font-bold text-[#063B25]">{product.name}</span>
            <span className="text-xs text-stone-500 mt-1">{product.categoryName}</span>
          </div>
        )}

        {/* Bestseller or subtle label */}
        {product.isBestseller && (
          <div className="absolute top-3 left-3 bg-[#063B25]/90 backdrop-blur-xs text-[#FFF9EC] text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded-sm">
            Popular Ritual
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium tracking-wide">
            <span>{product.categoryName}</span>
            <span aria-hidden="true">·</span>
            <span>{product.weight}</span>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.slug}`}
            className="mt-1.5 block group-hover:text-[#0B5836] transition-colors"
          >
            <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-tight">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-stone-600 font-medium">Price</span>
              <span className="font-mono text-lg font-bold text-[#063B25] tabular-nums">
                {formatINR(product.price)}
              </span>
            </div>
            <span className="text-[11px] text-[#063B25] font-semibold flex items-center gap-0.5">
              <span>All India Delivery</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className={`w-full py-2 px-2.5 text-xs font-semibold rounded-md flex items-center justify-center gap-1.5 transition-colors ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#063B25] text-white hover:bg-[#0B5836]'
              }`}
              aria-label={`Add ${product.name} to cart`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-2.5 text-xs font-medium border border-stone-300 hover:border-[#25D366] hover:bg-[#25D366]/5 text-stone-800 rounded-md flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
              aria-label={`Buy ${product.name} on WhatsApp`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="mt-2 text-center">
            <Link
              to={`/product/${product.slug}`}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-500 hover:text-[#063B25] transition-colors"
            >
              <span>View full details & brewing notes</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
