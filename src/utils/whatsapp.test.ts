import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppUrl,
  createProductEnquiryMessage,
  createDistributorEnquiryMessage,
  createOrderRequestMessage,
  createDeliveryEnquiryMessage,
} from './whatsapp.ts';

test('buildWhatsAppUrl points to the exact official number 917032048859', () => {
  const url = buildWhatsAppUrl('Test message');
  assert.ok(url.startsWith('https://wa.me/917032048859?text='));
  assert.ok(url.includes('Test%20message'));
});

test('createProductEnquiryMessage includes product details and delivery check', () => {
  const msg = createProductEnquiryMessage({
    name: 'Masala Tea',
    weight: '1 kg',
    price: 900,
  });
  assert.ok(msg.includes('Masala Tea'));
  assert.ok(msg.includes('1 kg'));
  assert.ok(msg.includes('₹900'));
  assert.ok(msg.includes('All India delivery'));
});

test('createOrderRequestMessage formats itemized list and customer info', () => {
  const msg = createOrderRequestMessage({
    orderRef: 'ORD-12345',
    customer: {
      fullName: 'Anita Devi',
      phone: '9849012345',
      whatsapp: '9849012345',
      address: 'Plot 12, Sunrise Colony',
      city: 'Visakhapatnam',
      state: 'Andhra Pradesh',
      pincode: '530002',
    },
    items: [
      { id: '1', name: 'Premium Tea', weight: '1 kg', price: 810, quantity: 2 },
    ],
    subtotal: 1620,
  });

  assert.ok(msg.includes('ORD-12345'));
  assert.ok(msg.includes('Anita Devi'));
  assert.ok(msg.includes('Premium Tea (1 kg) x 2 = ₹1,620'));
  assert.ok(msg.includes('Subtotal:* ₹1,620'));
});

test('createDistributorEnquiryMessage includes all business fields', () => {
  const msg = createDistributorEnquiryMessage({
    fullName: 'Suresh Patel',
    businessName: 'Patel Wholesalers',
    mobileNumber: '7032048859',
    whatsappNumber: '7032048859',
    email: 'suresh@patel.in',
    state: 'Gujarat',
    city: 'Surat',
    businessType: 'Wholesale Enquiry',
    productsInterestedIn: ['Tea Powders', 'Green Tea Varieties'],
    expectedOrderQuantity: '500+ kg / month',
    message: 'Looking for regional distribution rights.',
  });

  assert.ok(msg.includes('Patel Wholesalers'));
  assert.ok(msg.includes('Wholesale Enquiry'));
  assert.ok(msg.includes('500+ kg / month'));
});
