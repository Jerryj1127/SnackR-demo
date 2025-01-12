// coinTracker.js

import { getStorageItem, setStorageItem } from './storageManager';

const COINS_KEY = 'coinCount';
const DEFAULT_COINS = 250 // starting coins for each user

export const getCoinCount = async () => {
  const coins = await getStorageItem(COINS_KEY);
  return coins !== null ? coins : DEFAULT_COINS; 
};

export const incrementCoinCount = async (amount) => {
  const coins = await getCoinCount();
  const newCount = coins + amount;
  await setStorageItem(COINS_KEY, newCount);
  return newCount;
};

export const decrementCoinCount = async (amount) => {
  const coins = await getCoinCount();
  if (amount > coins) {
    throw new Error("Insufficient coins");
    //Handle Insufficient coins
  }
  const newCount = coins - amount; 
  await setStorageItem(COINS_KEY, newCount);
  return newCount;
};