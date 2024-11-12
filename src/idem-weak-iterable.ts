/**
 * An interface representing an idempotent WeakMap with iterable capabilities.
 * @template T - The type of the keys.
 * @template P - The type of the values.
 */
export interface IdemWeakMapIterable<T extends object, P> {
  /**
   * Gets the value associated with the specified key.
   * @param {T} key - The key to retrieve the value for.
   * @returns {P | undefined} The value associated with the key, or undefined if the key does not exist.
   */
  get: (key: T) => P | undefined;

  /**
   * Sets the value for the specified key.
   * @param {T} key - The key to set the value for.
   * @param {P} value - The value to set.
   * @returns {IdemWeakMapIterable<T, P>} The current instance for chaining.
   */
  set: (key: T, value: P) => IdemWeakMapIterable<T, P>;

  /**
   * Deletes the value associated with the specified key.
   * @param {T} key - The key to delete the value for.
   * @returns {boolean} True if the key was deleted, false otherwise.
   */
  delete: (key: T) => boolean;

  /**
   * Checks if the specified key exists.
   * @param {T} key - The key to check for.
   * @returns {boolean} True if the key exists, false otherwise.
   */
  has: (key: T) => boolean;

  /**
   * Gets an array of all keys.
   * @returns {T[]} An array of all keys.
   */
  keys: () => T[];

  /**
   * Gets an array of all values.
   * @returns {P[]} An array of all values.
   */
  values: () => P[];

  /**
   * The string tag for the object.
   * @type {string}
   */
  [Symbol.toStringTag]: string;
}

/**
 * Creates an instance of IdemWeakMapIterable.
 * @template T - The type of the keys.
 * @template P - The type of the values.
 * @returns {IdemWeakMapIterable<T, P>} The created instance.
 */
export default function IdemWeakMapIterable<
  T extends object,
  P,
>(): IdemWeakMapIterable<T, P> {
  const weakMap = new WeakMap<T, P>();
  const arrKeys: T[] = [];
  const arrValues: P[] = [];
  const objectToIndex = new WeakMap<T, number>();

  /**
   * Removes a key and its associated value from the arrays.
   * @param {number} index - The index of the key to remove.
   */
  function removeKeyFromArrays(index: number) {
    arrKeys.splice(index, 1);
    arrValues.splice(index, 1);

    for (let i = index; i < arrKeys.length; i++) {
      objectToIndex.set(arrKeys[i], i);
    }
  }

  /**
   * Cleans up the arrays by removing keys that are no longer in the WeakMap.
   */
  function cleanUpArrays() {
    for (let i = arrKeys.length - 1; i >= 0; i--) {
      if (!weakMap.has(arrKeys[i])) {
        removeKeyFromArrays(i);
        objectToIndex.delete(arrKeys[i]);
      }
    }
  }

  const idemWeakMapIterable = {
    get [Symbol.toStringTag]() {
      return 'IdemWeakMapIterable';
    },

    get(key: T): P | undefined {
      return weakMap.get(key);
    },

    set(key: T, value: P): IdemWeakMapIterable<T, P> {
      const existingValue = weakMap.get(key);
      if (existingValue === value) {
        return idemWeakMapIterable;
      }

      const existingIndex = objectToIndex.get(key);

      if (existingIndex !== undefined) {
        // update existing key-value pair
        arrValues[existingIndex] = value;
      } else {
        // add new key-value pair
        arrKeys.push(key);
        arrValues.push(value);
        objectToIndex.set(key, arrKeys.length - 1);
      }

      weakMap.set(key, value);
      return idemWeakMapIterable;
    },

    delete(key: T): boolean {
      if (!weakMap.has(key)) {
        return false;
      }

      const existingIndex = objectToIndex.get(key);
      if (existingIndex !== undefined) {
        // remove and cleanup
        weakMap.delete(key);
        removeKeyFromArrays(existingIndex);
        objectToIndex.delete(key);
      }

      return true;
    },

    has(key: T): boolean {
      return weakMap.has(key);
    },

    keys(): T[] {
      cleanUpArrays(); //rem gc keys
      return [...arrKeys];
    },

    values(): P[] {
      cleanUpArrays(); // rem gc values
      return [...arrValues];
    },
  };

  return Object.freeze(idemWeakMapIterable);
}
