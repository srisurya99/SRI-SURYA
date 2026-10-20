import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidIndianMobile,
  isValidEmail,
  validateDistributorForm,
  validateCheckoutForm,
} from './validation.ts';

test('isValidIndianMobile validates 10-digit Indian numbers starting with 6-9', () => {
  assert.equal(isValidIndianMobile('7032048859'), true);
  assert.equal(isValidIndianMobile('+917032048859'), true);
  assert.equal(isValidIndianMobile('917032048859'), true);
  assert.equal(isValidIndianMobile('07032048859'), true);
  assert.equal(isValidIndianMobile('9849012345'), true);
  assert.equal(isValidIndianMobile('6300123456'), true);
  assert.equal(isValidIndianMobile('8123456789'), true);

  // Invalid numbers
  assert.equal(isValidIndianMobile('1234567890'), false); // starts with 1
  assert.equal(isValidIndianMobile('5555555555'), false); // starts with 5
  assert.equal(isValidIndianMobile('703204885'), false);  // 9 digits
  assert.equal(isValidIndianMobile('70320488599'), false); // 11 digits without prefix
  assert.equal(isValidIndianMobile(''), false);
});

test('isValidEmail validates standard email addresses', () => {
  assert.equal(isValidEmail('distributor@gmail.com'), true);
  assert.equal(isValidEmail('info@srisurya.co.in'), true);
  assert.equal(isValidEmail('notanemail'), false);
  assert.equal(isValidEmail(''), false);
});

test('validateDistributorForm catches missing or invalid fields', () => {
  const invalid = validateDistributorForm({
    fullName: '',
    businessName: '',
    mobileNumber: '123',
    whatsappNumber: '456',
    email: 'bad',
    state: '',
    city: '',
    businessType: '',
    productsInterestedIn: [],
    expectedOrderQuantity: '',
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.mobileNumber);
  assert.ok(invalid.errors.businessType);
  assert.ok(invalid.errors.productsInterestedIn);

  const valid = validateDistributorForm({
    fullName: 'Venkat Rao',
    businessName: 'Surya Enterprises',
    mobileNumber: '7032048859',
    whatsappNumber: '7032048859',
    email: 'partner@example.com',
    state: 'Andhra Pradesh',
    city: 'Vijayawada',
    businessType: 'Supermarket Enquiry',
    productsInterestedIn: ['Tea Powders', 'Coffee Mixes'],
    expectedOrderQuantity: '100 kg - 500 kg / month',
    message: 'Interested in retail display racks.',
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('validateCheckoutForm validates customer delivery details', () => {
  const invalid = validateCheckoutForm({
    fullName: '',
    phone: '',
    whatsapp: '',
    address: '',
    city: '',
    state: '',
    pincode: '12',
  });
  assert.equal(invalid.isValid, false);

  const valid = validateCheckoutForm({
    fullName: 'Ramesh Kumar',
    phone: '9848012345',
    whatsapp: '9848012345',
    address: 'Flat 402, Green Meadows, Main Road',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500081',
  });
  assert.equal(valid.isValid, true);
});
