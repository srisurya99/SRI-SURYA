import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, MessageSquare, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/pricing';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { BUSINESS_CONFIG } from '../config/business';

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  // Build quick WhatsApp cart message
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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF8] border-l border-stone-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#063B25]" />
              <h2 className="font-serif text-xl font-bold text-[#063B25]">Your Basket</h2>
              <span className="text-xs text-stone-500 font-mono">({totalItems} items)</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Reminder Notice */}
          <div className="px-5 py-2.5 bg-[#063B25]/5 border-b border-[#063B25]/10 text-xs text-[#063B25] flex items-center justify-between">
            <span className="font-medium">All India Delivery Available</span>
            <span className="text-[11px] text-stone-500">Shipping confirmed at checkout</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-800">Your basket is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  Discover our pure Assam tea blends, South Indian filter coffees, and wellness drink powders.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="mt-2 px-5 py-2.5 bg-[#063B25] text-white text-xs font-semibold rounded-md hover:bg-[#0B5836] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 pb-4 border-b border-stone-100 last:border-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-stone-100 shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm font-bold text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-0.5 ml-2"
                          aria-label={`Remove ${item.product.name} from basket`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {item.product.weight} · {formatINR(item.product.price)} each
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-stone-900"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-mono font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-stone-500 hover:text-stone-900"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total for item */}
                      <span className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-white space-y-3">
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-stone-600 font-medium">Subtotal</span>
                <span className="font-mono text-xl font-bold text-[#063B25] tabular-nums">
                  {formatINR(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                Taxes included. Delivery charges calculated based on destination PIN code.
              </p>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-3 bg-[#063B25] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#0B5836] flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Proceed to Order Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 border border-[#25D366] bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#063B25] text-xs font-semibold rounded-md flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Order Directly via WhatsApp</span>
                </a>

                <div className="text-center pt-1">
                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs text-stone-500 hover:text-[#063B25] underline underline-offset-2"
                  >
                    View detailed cart page
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
