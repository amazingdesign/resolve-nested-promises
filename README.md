[![Test Coverage](https://api.codeclimate.com/v1/badges/5eaef55eac70f40d5fa2/test_coverage)](https://codeclimate.com/github/amazingdesign/resolve-nested-promises/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/5eaef55eac70f40d5fa2/maintainability)](https://codeclimate.com/github/amazingdesign/resolve-nested-promises/maintainability)

# resolve-nested-promises

## What for? 

To resolve nested promises in object properties, arrays, arrays of object with promises etc.

It is like [Bluebird's](https://github.com/petkaantonov/bluebird) `Promise.props` but with native promises, nested props, and arrays support!

## Installation

Simply install through npm:

```bash
npm i resolve-nested-promises
```

## Usage

From this package only one function is exported as a named export and a default export.

```javascript
import { resolveNestedPromises } from 'resolve-nested-promises'
// or
import resolveNestedPromises from 'resolve-nested-promises'
// or
const resolveNestedPromises = require('resolve-nested-promises')

```

This function takes one parameter of any type, and always returns a `Promise` that resolves to:

1. That param - if it is a primitive
2. Promise resolve value - if it is a promise
3. Array of resolved values - if it is an array of promises (like `Promise.all`)
4. Object with resolved values in place of Promise properties (nested Promise properties too!) and rest of properties preserved.
5. Any mix of nested objects, arrays, arrays with object. All promises resolved!

## Examples

Check `tests` folder for more examples!

```javascript
resolveNestedPromises(null) // resolves to null
```

```javascript
resolveNestedPromises('String value') // resolves to 'String value'
```

```javascript
resolveNestedPromises([Promise.resolve('a'), Promise.resolve('b')]) // resolves to ['a', 'b']
```

```javascript
resolveNestedPromises({ a: Promise.resolve('a'), b: 'b' }) // resolves to { a: 'a', b: 'b' }
```