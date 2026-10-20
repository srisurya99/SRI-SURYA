export interface CartItemLike {
  id: string;
  price: number;
  quantity: number;
}

/**
 * Format currency in Indian Rupees (INR)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate total price for cart items
 */
export function calculateSubtotal(items: CartItemLike[]): number {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => {
    const qty = Math.max(0, item.quantity || 0);
    const price = Math.max(0, item.price || 0);
    return sum + price * qty;
  }, 0);
}

/**
 * Calculate total quantity of items in cart
 */
export function calculateTotalItems(items: CartItemLike[]): number {
  if (!Array.isArray(items)) return 0;
  return items.reduce((sum, item) => sum + Math.max(0, item.quantity || 0), 0);
}
