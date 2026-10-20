import { BUSINESS_CONFIG } from '../config/business.ts';
import { formatINR } from './pricing.ts';
import type { CartItemLike } from './pricing.ts';
import type { DistributorFormData, CheckoutFormData } from './validation.ts';

/**
 * Generate official WhatsApp link with URI-encoded message
 */
export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `${BUSINESS_CONFIG.whatsappBaseUrl}?text=${encoded}`;
}

/**
 * Message for individual product quick enquiry or buy
 */
export function createProductEnquiryMessage(product: {
  name: string;
  weight: string;
  price: number;
}): string {
  return [
    `*SRI SURYA PRODUCT ENQUIRY*`,
    `Hello Sri Surya team,`,
    ``,
    `I am interested in purchasing:`,
    `*Product:* ${product.name}`,
    `*Pack Size:* ${product.weight}`,
    `*Price:* ${formatINR(product.price)}`,
    ``,
    `Please confirm All India delivery availability and shipping charges to my location.`,
  ].join('\n');
}

/**
 * Message for Cart Order Request
 */
export function createOrderRequestMessage(options: {
  orderRef: string;
  customer: CheckoutFormData;
  items: Array<CartItemLike & { name: string; weight: string }>;
  subtotal: number;
}): string {
  const { orderRef, customer, items, subtotal } = options;
  
  const itemListText = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} (${item.weight}) x ${item.quantity} = ${formatINR(
          item.price * item.quantity
        )}`
    )
    .join('\n');

  return [
    `*NEW ORDER REQUEST - SRI SURYA*`,
    `Order Reference: *#${orderRef}*`,
    ``,
    `*Customer Details:*`,
    `Name: ${customer.fullName}`,
    `Phone: ${customer.phone}`,
    `WhatsApp: ${customer.whatsapp}`,
    `Delivery Address: ${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}`,
    customer.deliveryNotes ? `Notes: ${customer.deliveryNotes}` : '',
    ``,
    `*Order Items:*`,
    itemListText,
    ``,
    `*Subtotal:* ${formatINR(subtotal)}`,
    ``,
    `*Delivery Note:* All India delivery confirmation requested. Please verify delivery timeline, shipping charges, and payment options for my address.`,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Message for Distributor & Wholesale Enquiries
 */
export function createDistributorEnquiryMessage(data: DistributorFormData): string {
  return [
    `*SRI SURYA - BUSINESS & DISTRIBUTOR ENQUIRY*`,
    `Hello Sri Surya team, I would like to partner with you.`,
    ``,
    `*Contact Person:* ${data.fullName}`,
    `*Business Name:* ${data.businessName}`,
    `*Mobile:* ${data.mobileNumber}`,
    `*WhatsApp:* ${data.whatsappNumber}`,
    `*Email:* ${data.email}`,
    `*Location:* ${data.city}, ${data.state}`,
    `*Business Type:* ${data.businessType}`,
    `*Products Interested In:* ${data.productsInterestedIn.join(', ')}`,
    `*Expected Order Quantity:* ${data.expectedOrderQuantity}`,
    data.message ? `*Message:* ${data.message}` : '',
    ``,
    `Please share your distributor catalog, wholesale pricing, and onboarding process.`,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Message for All India Delivery check
 */
export function createDeliveryEnquiryMessage(pincode?: string): string {
  return [
    `*ALL INDIA DELIVERY ENQUIRY - SRI SURYA*`,
    `Hello Sri Surya team,`,
    ``,
    `I would like to check delivery availability and shipping charges for Sri Surya tea & coffee powders.`,
    pincode ? `*Delivery PIN Code:* ${pincode}` : '',
    ``,
    `Please let me know estimated delivery time and courier options.`,
  ]
    .filter(Boolean)
    .join('\n');
}
