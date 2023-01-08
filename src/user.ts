import fetch from 'node-fetch';
import type { User, Balance } from './types.js';
const apiHost = 'https://api.stability.ai';

export async function getUser(apiKey: string) {
  const url = `${apiHost}/v1alpha/user/account`;

  if (!apiKey) throw new Error('Missing Stability API key.');

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  // Do something with the user...
  const user = (await response.json()) as User;
  return user;
}

export async function getBalance(apiKey: string) {
  const url = `${apiHost}/v1alpha/user/balance`;

  if (!apiKey) throw new Error('Missing Stability API key.');

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`);
  }

  // Do something with the balance...
  const balance = (await response.json()) as Balance;
  return balance;
}
