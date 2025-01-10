// streakTracker.js

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorageItem, setStorageItem } from './storageManager';
const StreakContext = createContext();


const StreakProvider = ({ children }) => {
  const [streak, setStreak] = useState(1);

  useEffect(() => { 
    
    const loadStreak = async () => {
      try {

        const storedStreak = await getStorageItem('streak') || 1;
        setStreak(parseInt(storedStreak));
        checkStreakForUpdate()
      } catch (e) {
        console.error('Failed to load streak:', e);
      }
    };

    loadStreak();
    
        

    const updateStreak = async () => {
      try {
        await setStorageItem('streak', streak.toString());
        // await setStorageItem('streak', "7");  // for manual override
      } catch (e) {
        console.error('Failed to save streak:', e);
      }
    };

    // updateStreak();
    // console.log("streak updated")

    // Update streak daily (adjust the interval as needed)
    const checkStreakForUpdate = async () => {
      try {
        const today = new Date().toJSON().slice(0,10);; 
        const lastLogin = await getStorageItem('lastLogin') || 0; 

        if (lastLogin === today){ 
          return 
        } else { 
          const lastLoginDate = new Date(lastLogin || 0); 
          const todayDate = new Date(today); 
          const diffDays = Math.floor((todayDate - lastLoginDate) / (1000 * 60 * 60 * 24)); 

          // if (diffDays === 0) {
          //     return
          // } else

           if (diffDays === 1) { 
            // increment 
            setStreak(streak + 1); 
          } else if (diffDays > 1){ 
            // reset the streak
            setStreak(1); 
          } else {
              console.error("Error in system time")
          }

            //updates streak + date by default (excpet case 0)
            updateStreak(); 
            await setStorageItem('lastLogin', today);

        }
        


      } catch (e) {
        console.error('Error updating streak:', e);
      }
    }; 

    // checkStreakForUpdate()
    
  }, []);




  return (
    <StreakContext.Provider value={{ streak }}>
      {children}
    </StreakContext.Provider>
  );
};

export const didUserLoginToday = async () => {
  const today = new Date().toJSON().slice(0,10);
  const lastLogin = await getStorageItem('lastLogin') || 0
  return today === lastLogin
};

export { StreakContext, StreakProvider };

