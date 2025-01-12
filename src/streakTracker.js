// streakTracker.js

import React, { createContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from './storageManager';
const StreakContext = createContext();


const StreakProvider = ({ children }) => {
  const [streak, setStreak] = useState(1); 
  
  const updateStreak = async (newStreak) => {
    try {
      await setStorageItem('streak', newStreak.toString());
      setStreak(newStreak); // Update state after storage is set
    } catch (e) {
      console.error('Failed to save streak: ', e);
    }
  };

  const checkStreakForUpdate = async (currentStreak) => {
    try {
      const today = new Date().toJSON().slice(0,10);
      const lastLogin = await getStorageItem('lastLogin') || 0;

      if (lastLogin === today) {
        return;
      }

      const lastLoginDate = new Date(lastLogin);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate - lastLoginDate) / (1000 * 60 * 60 *24));

      // console.log("diffDays", currentStreak, diffDays, today, lastLogin);

      if (diffDays === 1) {
        const newStreak = currentStreak + 1;
        await updateStreak(newStreak);
      } else if (diffDays > 1) {
        await updateStreak(1);
      } else {
        console.error("Error in system time");
      }

      await setStorageItem('lastLogin', today);
    } catch (e) {
      console.error('Error updating streak:', e);
    }
  };

  useEffect(() => {
    const loadStreak = async () => {
      try {
        const storedStreak = await getStorageItem('streak') || '0';
        const parsedStreak = parseInt(storedStreak);
        setStreak(parsedStreak);
        await checkStreakForUpdate(parsedStreak);
      } catch (e) {
        console.error('Failed to load streak:', e);
      }
    };

    loadStreak();
  }, []);

  return (
    <StreakContext.Provider value={{ streak }}>
      {children}
    </StreakContext.Provider>
  );
};

// to be paired with notification service so that it wont send \
//  notification if the user has already opend the app on that day
export const didUserLoginToday = async () => {
  const today = new Date().toJSON().slice(0,10);
  const lastLogin = await getStorageItem('lastLogin') || 0
  return today === lastLogin
};

export { StreakContext, StreakProvider };

