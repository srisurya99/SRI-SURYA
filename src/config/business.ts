/**
 * Centralized business configuration for Sri Surya Natural Tea & Coffee Powders.
 * All WhatsApp redirects and contact touchpoints MUST use the official business number.
 */

export const BUSINESS_CONFIG = {
  brandName: 'Sri Surya Natural Tea & Coffee Powders',
  shortName: 'Sri Surya',
  tagline: "Nature's Finest. India's Favourite Ritual.",
  
  // Official Contact Details
  officialPhone: '7032048859',
  internationalPhone: '917032048859',
  whatsappBaseUrl: 'https://wa.me/917032048859',
  
  // All India Delivery Requirements
  deliveryNotice: 'ALL INDIA DELIVERY AVAILABLE',
  deliveryDescription:
    'Order Sri Surya products from anywhere in India. Contact us to confirm delivery availability, shipping charges, and estimated delivery time for your location.',
  
  // Business Hours
  operatingHours: 'Monday - Saturday: 9:00 AM – 8:00 PM IST',
  supportEmail: 'orders@srisuryanatural.com',
  
  // Partner / Distributor Headline and Copy
  distributorHeadline: 'PARTNER WITH SRI SURYA',
  distributorSubheadline:
    'Bring the authentic taste of Sri Surya Tea & Coffee Powders to customers across India.',
  distributorSupportMessage:
    'We welcome enquiries from distributors, wholesalers, retailers, supermarkets, grocery stores, hotels, restaurants, and institutional buyers interested in our product range.',
  
  // Categories
  categories: [
    { id: 'tea-powders', name: 'Tea Powders', slug: 'tea-powders' },
    { id: 'green-tea', name: 'Green Tea Varieties', slug: 'green-tea' },
    { id: 'black-tea', name: 'Black Tea', slug: 'black-tea' },
    { id: 'coffee-mixes', name: 'Coffee Mixes', slug: 'coffee-mixes' },
    { id: 'health-wellness', name: 'Health & Wellness', slug: 'health-wellness' },
  ],
} as const;
