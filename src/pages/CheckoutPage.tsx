import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  MessageSquare,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/pricing';
import { validateCheckoutForm, type CheckoutFormData, type ValidationErrors } from '../utils/validation';
import { buildWhatsAppUrl, createOrderRequestMessage } from '../utils/whatsapp';
import { BUSINESS_CONFIG } from '../config/business';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Telangana',
  'Karnataka',
  'Tamil Nadu',
  'Maharashtra',
  'Kerala',
  'Gujarat',
  'Rajasthan',
  'Madhya Pradesh',
  'Uttar Pradesh',
  'West Bengal',
  'Punjab',
  'Haryana',
  'Delhi',
  'Bihar',
  'Odisha',
  'Assam',
  'Goa',
  'Chhattisgarh',
  'Jharkhand',
  'Uttarakhand',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Other State / UT',
];

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    whatsapp: '',
    address: '',
    city: '',
    state: 'Andhra Pradesh',
    pincode: '',
    deliveryNotes: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState('');
  const [copied, setCopied] = useState(false);

  // If basket is empty and no order submitted, redirect to shop
  if (items.length === 0 && !orderSubmitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-stone-900">Your Basket is Empty</h1>
        <p className="text-xs text-stone-500">
          Please add items to your cart before requesting an order.
        </p>
        <Link
          to="/shop"
          className="inline-block px-5 py-2.5 bg-[#063B25] text-white text-xs font-semibold rounded-md"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateCheckoutForm(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    // Generate deterministic readable order reference
    const generatedRef = `SS-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderRef(generatedRef);
    setOrderSubmitted(true);

    // Save order request locally
    try {
      const orderRecord = {
        orderRef: generatedRef,
        customer: formData,
        items: items.map((i) => ({
          name: i.product.name,
          weight: i.product.weight,
          price: i.product.price,
          quantity: i.quantity,
        })),
        subtotal,
        date: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem('sri_surya_orders') || '[]');
      existing.unshift(orderRecord);
      localStorage.setItem('sri_surya_orders', JSON.stringify(existing));
    } catch {
      // ignore
    }

    clearCart();
  };

  // WhatsApp link for the submitted order request
  const orderItemsSummary = items.map((i) => ({
    id: i.product.id,
    name: i.product.name,
    weight: i.product.weight,
    price: i.product.price,
    quantity: i.quantity,
  }));

  const whatsappOrderUrl = buildWhatsAppUrl(
    createOrderRequestMessage({
      orderRef,
      customer: formData,
      items: orderItemsSummary,
      subtotal,
    })
  );

  const copyOrderRef = () => {
    navigator.clipboard.writeText(orderRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {orderSubmitted ? (
        /* Order Request Confirmation State */
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-lg space-y-6 animate-in fade-in">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D9A62E]">
              Order Request Submitted
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#063B25]">
              Thank You, {formData.fullName}!
            </h1>
            <p className="text-xs text-stone-500">
              Your Sri Surya order request has been generated successfully.
            </p>
          </div>

          {/* Reference Card */}
          <div className="bg-[#FFF9EC] p-4 rounded-xl border border-[#D9A62E]/40 flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wide text-stone-500 font-medium">
                Order Request Reference
              </span>
              <div className="font-mono text-xl font-bold text-[#063B25]">{orderRef}</div>
            </div>
            <button
              onClick={copyOrderRef}
              className="p-2 text-stone-500 hover:text-[#063B25] transition-colors flex items-center gap-1 text-xs"
              aria-label="Copy order reference"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Delivery & Payment Clarification (Honest, anti-slop) */}
          <div className="space-y-3 text-xs text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-200 leading-relaxed">
            <h4 className="font-serif text-sm font-bold text-stone-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#063B25]" />
              <span>Next Step: Confirm Shipping & Payment on WhatsApp</span>
            </h4>
            <p>
              To ensure transparent courier pricing, shipping charges vary depending on package weight and destination PIN code ({formData.pincode}, {formData.city}, {formData.state}).
            </p>
            <p>
              Click below to send your pre-filled order summary directly to our official WhatsApp desk. Our team will verify exact shipping fees and provide secure payment options (UPI, GPay, PhonePe, or Net Banking).
            </p>
          </div>

          {/* Official WhatsApp Action Button */}
          <div className="space-y-3 pt-2">
            <a
              href={whatsappOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-stone-950 font-bold text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm Order on Official WhatsApp</span>
            </a>

            <div className="text-center">
              <Link
                to="/shop"
                className="text-xs text-stone-500 hover:text-[#063B25] underline underline-offset-2"
              >
                Return to Product Catalogue
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Order Request Form + Review */
        <div className="space-y-8">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Link to="/cart" className="hover:text-[#063B25] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Cart</span>
            </Link>
            <span>/</span>
            <span className="text-stone-900 font-medium">Order Request</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D9A62E] font-semibold">
                  Delivery Details
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#063B25] mt-1">
                  All India Order Request
                </h1>
                <p className="text-xs text-stone-500 mt-1">
                  Enter your address details to request dispatch across India.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-rose-600 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                {/* Mobile & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      Mobile Number (Calls) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25] font-mono"
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.phone}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="10-digit WhatsApp number"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25] font-mono"
                    />
                    {errors.whatsapp && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.whatsapp}</span>
                    )}
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Complete Street Address *
                  </label>
                  <textarea
                    name="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House/Flat number, building name, street, locality"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
                  />
                  {errors.address && (
                    <span className="text-[11px] text-rose-600 mt-1 block">{errors.address}</span>
                  )}
                </div>

                {/* City, State, PIN */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City name"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
                    />
                    {errors.city && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.city}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      State *
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.state}</span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                      PIN Code (6 Digits) *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="e.g. 500081"
                      className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25] font-mono"
                    />
                    {errors.pincode && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{errors.pincode}</span>
                    )}
                  </div>
                </div>

                {/* Delivery Notes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    name="deliveryNotes"
                    value={formData.deliveryNotes}
                    onChange={handleChange}
                    placeholder="Nearby landmarks, preferred delivery hours, or packaging notes"
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-[#063B25]"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#063B25] hover:bg-[#0B5836] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-sm"
                  >
                    Submit Order Request ({formatINR(subtotal)})
                  </button>
                  <p className="text-[11px] text-stone-500 text-center mt-2">
                    Payment is made via direct UPI / Bank transfer upon WhatsApp confirmation.
                  </p>
                </div>
              </form>
            </div>

            {/* Order Review Column */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
                Order Review ({items.length} items)
              </h2>

              <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto pr-1 space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-stone-900">{item.product.name}</div>
                      <div className="text-stone-500 text-[11px]">
                        {item.product.weight} · Qty: {item.quantity}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-stone-900 tabular-nums">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="font-mono font-bold text-stone-900 tabular-nums">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Shipping</span>
                  <span className="text-[#063B25] font-medium">Confirmed via WhatsApp</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-100 text-sm font-bold text-[#063B25]">
                  <span>Total Amount</span>
                  <span className="font-mono tabular-nums">{formatINR(subtotal)}</span>
                </div>
              </div>

              <div className="bg-[#FFF9EC] p-3 rounded-lg border border-[#D9A62E]/30 text-[11px] text-stone-700 space-y-1">
                <div className="font-semibold text-[#063B25] flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#D9A62E]" />
                  <span>{BUSINESS_CONFIG.deliveryNotice}</span>
                </div>
                <p>
                  No payment is charged on this screen. After submission, you will confirm the order on WhatsApp where exact shipping rates are provided.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
