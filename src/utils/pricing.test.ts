import test from 'node:test';
import assert from 'node:assert/strict';
import { formatINR, calculateSubtotal, calculateTotalItems } from './pricing.ts';

test('formatINR formats currency in Indian Rupees format', () => {
  assert.equal(formatINR(810), '₹810');
  assert.equal(formatINR(1602), '₹1,602');
  assert.equal(formatINR(0), '₹0');
});

test('calculateSubtotal accurately calculates price * quantity', () => {
  const items = [
    { id: '1', price: 810, quantity: 2 }, // 1620
    { id: '2', price: 900, quantity: 1 }, // 900
    { id: '3', price: 170, quantity: 3 }, // 510
  ];
  assert.equal(calculateSubtotal(items), 3030);
});

test('calculateSubtotal handles empty or negative cases gracefully', () => {
  assert.equal(calculateSubtotal([]), 0);
  assert.equal(calculateSubtotal([{ id: '1', price: 800, quantity: -1 }]), 0);
});

test('calculateTotalItems counts sum of quantities', () => {
  const items = [
    { id: '1', price: 810, quantity: 2 },
    { id: '2', price: 900, quantity: 3 },
  ];
  assert.equal(calculateTotalItems(items), 5);
});
