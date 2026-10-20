/**
 * Validates a standard Indian 10-digit mobile number.
 * Accepts formats: 9876543210, +919876543210, 919876543210, 09876543210
 * Valid Indian mobile numbers start with 6, 7, 8, or 9.
 */
export function isValidIndianMobile(phone: string): boolean {
  if (!phone) return false;
  // Strip whitespace, hyphens, parentheses, plus
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  
  // If prefixed with 91 and has 12 digits total
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    const local = cleaned.slice(2);
    return /^[6-9]\d{9}$/.test(local);
  }
  
  // If prefixed with 0 and has 11 digits
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    const local = cleaned.slice(1);
    return /^[6-9]\d{9}$/.test(local);
  }
  
  // Standard 10 digits
  if (cleaned.length === 10) {
    return /^[6-9]\d{9}$/.test(cleaned);
  }
  
  return false;
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email.trim());
}

export interface DistributorFormData {
  fullName: string;
  businessName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  state: string;
  city: string;
  businessType: string;
  productsInterestedIn: string[];
  expectedOrderQuantity: string;
  message?: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export function validateDistributorForm(data: DistributorFormData): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required (minimum 2 characters)';
  }

  if (!data.businessName || data.businessName.trim().length < 2) {
    errors.businessName = 'Business Name is required';
  }

  if (!data.mobileNumber || !isValidIndianMobile(data.mobileNumber)) {
    errors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (starts with 6-9)';
  }

  if (!data.whatsappNumber || !isValidIndianMobile(data.whatsappNumber)) {
    errors.whatsappNumber = 'Please enter a valid 10-digit WhatsApp number';
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.state || data.state.trim().length === 0) {
    errors.state = 'State is required';
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.city = 'City is required';
  }

  if (!data.businessType || data.businessType.trim().length === 0) {
    errors.businessType = 'Please select your business type';
  }

  if (!Array.isArray(data.productsInterestedIn) || data.productsInterestedIn.length === 0) {
    errors.productsInterestedIn = 'Please select at least one product category';
  }

  if (!data.expectedOrderQuantity || data.expectedOrderQuantity.trim().length === 0) {
    errors.expectedOrderQuantity = 'Please select expected order quantity';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  deliveryNotes?: string;
}

export function validateCheckoutForm(data: CheckoutFormData): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required';
  }

  if (!data.phone || !isValidIndianMobile(data.phone)) {
    errors.phone = 'Valid 10-digit mobile number required (starts with 6-9)';
  }

  if (!data.whatsapp || !isValidIndianMobile(data.whatsapp)) {
    errors.whatsapp = 'Valid 10-digit WhatsApp number required';
  }

  if (!data.address || data.address.trim().length < 10) {
    errors.address = 'Full street address is required (min 10 characters)';
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.city = 'City is required';
  }

  if (!data.state || data.state.trim().length === 0) {
    errors.state = 'State is required';
  }

  if (!data.pincode || !/^\d{6}$/.test(data.pincode.trim())) {
    errors.pincode = 'Valid 6-digit Indian PIN code required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
