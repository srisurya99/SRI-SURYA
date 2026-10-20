import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, MessageSquare, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/pricing';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { BUSINESS_CONFIG } from '../config/business';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  const quickCartMessage = [
    `*SRI SURYA - CART ORDER ENQUIRY*`,
    `Hello Sri Surya team, I would like to place an order for:`,
    ...items.map(
      (item, i) =>
        `${i + 1}. ${item.product.name} (${item.product.weight}) x ${item.quantity} = ${formatINR(
          item.product.price * item.quantity
        )}`
    ),
    ``,
    `*Subtotal:* ${formatINR(subtotal)}`,
    ``,
    `Please confirm All India delivery availability and shipping charges for my address.`,
  ].join('\n');

  const whatsappUrl = buildWhatsAppUrl(quickCartMessage);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-stone-900">Your Basket is Empty</h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
          You haven't added any products to your basket yet. Explore our genuine tea powders, green teas, and coffee mixes.
        </p>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#063B25] text-white text-xs font-semibold rounded-md hover:bg-[#0B5836] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Products</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#063B25]">Shopping Basket</h1>
          <p className="text-xs text-stone-500 mt-1">
            Review your selected tea, coffee, and wellness products ({totalItems} items)
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-stone-500 hover:text-rose-600 transition-colors self-start sm:self-auto"
        >
          Clear entire basket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items Table */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 overflow-hidden divide-y divide-stone-100 shadow-xs">
          {items.map((item) => (
            <div key={item.product.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg bg-stone-100 border border-stone-200 shrink-0"
                />
                <div>
                  <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wide">
                    {item.product.categoryName} · {item.product.weight}
                  </span>
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="font-serif text-base sm:text-lg font-bold text-stone-900 hover:text-[#063B25] block mt-0.5"
                  >
                    {item.product.name}
                  </Link>
                  <span className="font-mono text-xs text-stone-600 tabular-nums">
                    {formatINR(item.product.price)} each
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                {/* Quantity */}
                <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1.5 text-stone-600 hover:text-stone-900"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono font-bold tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1.5 text-stone-600 hover:text-stone-900"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[80px]">
                  <span className="font-mono text-sm sm:text-base font-bold text-[#063B25] tabular-nums block">
                    {formatINR(item.product.price * item.quantity)}
                  </span>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                  aria-label={`Remove ${item.product.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-stone-200 p-6 space-y-5 shadow-xs">
          <h2 className="font-serif text-xl font-bold text-[#063B25]">Order Summary</h2>

          <div className="space-y-2.5 text-xs text-stone-600 border-b border-stone-100 pb-4">
            <div className="flex justify-between">
              <span>Items Total ({totalItems} items)</span>
              <span className="font-mono text-stone-900 tabular-nums">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>All India Delivery</span>
              <span className="text-[#063B25] font-medium">Calculated upon request</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span className="text-stone-500">Included</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline">
            <span className="font-serif text-base font-bold text-stone-900">Estimated Total</span>
            <span className="font-mono text-2xl font-bold text-[#063B25] tabular-nums">
              {formatINR(subtotal)}
            </span>
          </div>

          {/* Delivery Note */}
          <div className="bg-[#FFF9EC] p-3.5 rounded-lg border border-[#D9A62E]/30 text-xs text-stone-700 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-[#063B25]">
              <Truck className="w-3.5 h-3.5 text-[#D9A62E]" />
              <span>{BUSINESS_CONFIG.deliveryNotice}</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Delivery charges and transit estimates are confirmed directly via order request or WhatsApp based on your destination address.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-[#063B25] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#0B5836] flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>Proceed to Order Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 border border-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#063B25] text-xs font-semibold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Order via WhatsApp</span>
            </a>
          </div>

          <div className="pt-2 text-center">
            <Link
              to="/shop"
              className="text-xs text-stone-500 hover:text-[#063B25] underline underline-offset-2"
            >
              Continue shopping other blends
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
