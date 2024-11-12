import { describe, expect, it } from '@jest/globals';

import IdemWeakMapIterable from './idem-weak-iterable';

describe('IdemWeakMapIterable', () => {
  it('should perform set and get operations', () => {
    const map = IdemWeakMapIterable<object, string>();
    const key = {};
    const value = 'value';

    map.set(key, value);
    expect(map.get(key)).toBe(value); // Use Jest's toBe assertion for strict equality
  });

  it('should handle idempotent set operation', () => {
    const map = IdemWeakMapIterable<object, string>();
    const key = {};
    const value = 'value';

    map.set(key, value);
    map.set(key, value); // Setting the same value again should be idempotent
    expect(map.get(key)).toBe(value); // Expect the same value
  });

  it('should perform delete operation', () => {
    const map = IdemWeakMapIterable<object, string>();
    const key = {};
    const value = 'value';

    map.set(key, value);
    expect(map.delete(key)).toBe(true); // The key should be deleted successfully
    expect(map.get(key)).toBeUndefined(); // The value should be undefined after deletion
  });

  it('should be idempotent for delete operation', () => {
    const map = IdemWeakMapIterable<object, string>();
    const key = {};

    expect(map.delete(key)).toBe(false); // Deleting a non-existent key should return false
  });

  it('should perform has operation', () => {
    const map = IdemWeakMapIterable<object, string>();
    const key = {};
    const value = 'value';

    map.set(key, value);
    expect(map.has(key)).toBe(true); // The map should have the key after setting it
    map.delete(key);
    expect(map.has(key)).toBe(false); // The map should not have the key after deletion
  });

  it('should handle multiple weak references for the same key', () => {
    const map = IdemWeakMapIterable<object, string>();
    const key1 = { [Symbol('1')]: Symbol('1') };

    map.set(key1, 'A');
    map.set(key1, 'B');
    map.set(key1, 'C');

    const values = Array.from(map.values());
    expect(values.length).toBe(1); // There should be only one value for the same key
    expect(values[0]).toBe('C'); // The value should be 'C' after setting the same key again
  });

  it('should ensure everything is in sync after key dereference', () => {
    const map = IdemWeakMapIterable<object, string>();
    const key = {};
    const value = 'value';

    map.set(key, value);

    expect(map.get(key)).toBe(value); // The value should be set and retrievable

    map.delete(key);

    expect(map.get(key)).toBeUndefined(); // The value should be undefined after deletion

    const keys = Array.from(map.keys());
    const values = Array.from(map.values());
    expect(keys.length).toBe(0); // The keys array should be empty after deletion
    expect(values.length).toBe(0); // The values array should be empty after deletion

    expect(map.has(key)).toBe(false); // The WeakMap should not have the key after deletion
  });
});
