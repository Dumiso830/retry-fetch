import fetch from 'node-fetch';

export async function retryFetch(url, options = {}) {
  const { retries = 3, backoffFactor = 1000, exponentialBackoff = false, ...fetchOptions } = options;
  let attempt = 1;
  let response;
  let error;
  const retryDelay = async () => {
    await new Promise(resolve => setTimeout(resolve, attempt * backoffFactor));
    attempt++;
  };
  try {
    do {
      response = await fetch(url, fetchOptions);
    } while (!response.ok && attempt <= retries && exponentialBackoff);
    if (!response.ok && attempt > retries) {
      error = new Error(`Exceeded maximum retries, last attempt failed with status: ${response.status}`);
    }
  } catch (err) {
    error = err;
  } finally {
    if (error) {
      throw error;
    }
    return response;
  }
}