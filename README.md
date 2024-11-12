# IdemWeakMapIterable

`IdemWeakMapIterable` is a JavaScript utility for creating a WeakMap-like structure that ensures idempotent operations, providing set, get, delete, and has functionality with additional support for weak references and handling multiple values for the same key. This library is perfect for managing collections of weakly referenced objects where changes should not duplicate or modify the state unnecessarily.

## Features

- **Idempotent set operation**: Setting the same value for a key will not alter its state.
- **Efficient key management**: Weak references to the keys are used to ensure memory safety.
- **Delete operation**: Safely deletes keys, ensuring that non-existent keys do not cause errors.
- **Has operation**: Checks if a key exists in the collection.
- **Support for multiple values**: Allows setting multiple values for the same key, retaining only the last value.
- **Iteration support**: Supports iterating over keys and values.

## Installation

You can install the library using npm or yarn:

```bash
npm install idem-weak-map-iterable
```

or

```bash
yarn add idem-weak-map-iterable
```

## Usage

### Create an `IdemWeakMapIterable` instance

```javascript
import IdemWeakMapIterable from 'idem-weak-map-iterable';

// Create a new IdemWeakMapIterable instance
const map = IdemWeakMapIterable();
```

### Set and get operations

```javascript
const key = {};
const value = 'some value';

// Set a key-value pair
map.set(key, value);

// Get the value by key
console.log(map.get(key)); // Output: 'some value'
```

### Idempotent set operation

```javascript
// Setting the same value multiple times doesn't alter the state
map.set(key, 'some value');
map.set(key, 'some value'); // No change

console.log(map.get(key)); // Output: 'some value'
```

### Delete operation

```javascript
// Delete a key-value pair
map.delete(key);
console.log(map.get(key)); // Output: undefined
```

### Has operation

```javascript
// Check if a key exists
console.log(map.has(key)); // Output: false
```

### Iteration

```javascript
// Set multiple values for the same key
map.set(key, 'value1');
map.set(key, 'value2');
map.set(key, 'value3');

// Only the last value will be retained
console.log(map.get(key)); // Output: 'value3'

// Iterating over values
for (const value of map.values()) {
  console.log(value); // Output: 'value3'
}
```

## API

### `IdemWeakMapIterable<K, V>()`

- **Returns**: A new `IdemWeakMapIterable` instance.
- **Parameters**:
  - `K` - Type for the key.
  - `V` - Type for the value.

### `map.set(key: K, value: V)`

- **Sets** the value for the given key.
- **Returns**: The instance itself for chaining.

### `map.get(key: K): V | undefined`

- **Gets** the value for the given key, or `undefined` if the key doesn't exist.

### `map.delete(key: K): boolean`

- **Deletes** the key-value pair.
- **Returns**: `true` if the key was deleted, `false` if the key wasn't found.

### `map.has(key: K): boolean`

- **Checks** if the key exists in the map.
- **Returns**: `true` if the key exists, `false` otherwise.

### `map.keys()`

- **Returns**: An iterable of the keys in the map.

### `map.values()`

- **Returns**: An iterable of the values in the map.

## Testing

We use Jest for testing the functionality of this library. To run the tests, follow these steps:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the tests:
   ```bash
   npm test
   ```

## Contributing

We welcome contributions to `IdemWeakMapIterable`. If you'd like to contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and commit them.
4. Open a pull request with a description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
