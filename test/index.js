import { retryFetch } from '../index';
import fetch from 'node-fetch';

jest.mock('node-fetch');

describe('retryFetch', () => {
  test('should make fetch request and retry with exponential backoff', async () => {
    fetch.mockRejectedValue(new Error('Network Error'));
    const response = await retryFetch('https://api.example.com/data', {
      retries: 3,
      backoffFactor: 1000,
      exponentialBackoff: true
    });
    expect(response).toBeInstanceOf(fetch);
  });
  test('should not retry when max retries exceeded', async () => {
    fetch.mockRejectedValue(new Error('Network Error'));
    try {
      await retryFetch('https://api.example.com/data', {
        retries: 2,
        backoffFactor: 1000,
        exponentialBackoff: true
      });
      expect(false).toBe(true);
    } catch (error) {
      expect(error.message).toBe('Exceeded maximum retries, last attempt failed with status: 0');
    }
  });
});