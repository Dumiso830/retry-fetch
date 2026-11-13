# retry-fetch
A JavaScript library that makes browser fetch requests retry with exponential backoff.

## Install

```bash
npm install retry-fetch
```

## Example

```javascript
import { retryFetch } from 'retry-fetch';

const response = await retryFetch('https://api.example.com/data', {
  method: 'GET',
  retries: 3,
  backoffFactor: 1000,
  exponentialBackoff: true
});
console.log(response);
```

## Tests

Run tests with:

```bash
npm test
```
