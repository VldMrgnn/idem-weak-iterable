# Idem Weak Iterable

An idempotent WeakMap with iterable capabilities.

## Installation

You can install the package using npm:

```sh
npm install idem-weak-iterable

Usage
Here is an example of how to use the IdemWeakIterable class in a Node.js or React application.

Node.jsconst { IdemWeakIterable } = require('idem-weak-iterable');

const iterable = new IdemWeakIterable();
const obj1 = {};
const obj2 = {};

iterable.set(obj1, 'value1');
iterable.set(obj2, 'value2');

for (const [key, value] of iterable) {
  console.log(key, value);
}

```
