import axios from 'axios';
import type { User, Balance } from './types.js';
const apiHost = 'https://api.stability.ai';

export async function getUser(apiKey: string) {
  const url = `${apiHost}/v1alpha/user/account`;

  if (!apiKey) throw new Error('Missing Stability API key.');

  const response = await axios.get(url, {
    headers: {
      Authorization: apiKey,
    },
  });

  if (response.status != 200) {
    throw new Error(`Non-200 response: ${response.statusText}`);
  }

  // Do something with the user...
  const user = response.data as User;
  return user;
}

export async function getBalance(apiKey: string) {
  const url = `${apiHost}/v1alpha/user/balance`;

  if (!apiKey) throw new Error('Missing Stability API key.');

  const response = await axios.get(url, {
    headers: {
      Authorization: apiKey,
    },
  });

  if (response.status != 200) {
    throw new Error(`Non-200 response: ${response.statusText}`);
  }

  // Do something with the balance...
  const balance = response.data as Balance;
  return balance;
}
