// storageManager.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorageItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving data', error);
    return null;
  }
};

export const setStorageItem = async (key, value) => {
  
  try {
    // console.log(value);
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving data', error);
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data', error);
  }
};