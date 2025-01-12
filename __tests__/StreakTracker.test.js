import React from 'react';
import { render, act } from '@testing-library/react-native';
import { StreakProvider, StreakContext, didUserLoginToday } from '../src/streakTracker';
import { getStorageItem, setStorageItem } from '../src/storageManager';

import { Text } from 'react-native'; 

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('../src/storageManager', () => ({
  getStorageItem: jest.fn(),
  setStorageItem: jest.fn(),
}));



// Makig a wrapper for reuse
const findByTextWrapper = async (streakValue) => {

    const { findByText } = render(
      <StreakProvider>
        <StreakContext.Consumer>
          {({ streak }) => <Text>{streak}</Text>}
        </StreakContext.Consumer>
      </StreakProvider>
    );
      
    // Act -> " act() waits for all asynchronous operations to complete before proceeding "
    await act(async () => {
      await Promise.resolve(); // Flushing all pending promises
      // jest.runAllTimers(); 
    });
    return findByText;

  };


 
describe('StreakTracker', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });


  it('should load the streak from storage', async () => {
    //try loading previous streak from disk
    getStorageItem.mockResolvedValueOnce('5');
    
    const findByText = await findByTextWrapper()

    const streakText = findByText('5');
    expect(streakText).toBeTruthy();
  });
  // same for date

  describe('StreakAndDateTester', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(()=>{
      jest.useRealTimers();
    });


  it('should set the streak 1 when the user logins for the first time', async () => {
    //mocking initial login

    
    jest.setSystemTime(new Date('2025-01-12T00:00:00.000Z')); 

    getStorageItem.mockResolvedValueOnce();    // Initial values are null 
    getStorageItem.mockResolvedValueOnce();    // as it isnt available on storage

    const findByText = await findByTextWrapper()

    const streakText = findByText('1');
    expect(streakText).toBeTruthy(); 

    expect(setStorageItem).toHaveBeenCalledWith('streak', '1');
    expect(setStorageItem).toHaveBeenCalledWith('lastLogin', '2025-01-12');

  });

  it('should set the streak to 2 if the user logs in on the 2nd day', async () => {

    //https://github.com/facebook/react-native/issues/46355  -> switching to Hermes parser

    //spyOn -> causes EVERY Date() to return the set value, even Date(1-1-1970)
    // const mockDate = new Date(2025, 0, 13);  // month :: Jan -> 0
    // jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    //This test is to get the initial/default streak value and try incrementing it the next day

    jest.setSystemTime(new Date('2025-01-12T00:00:00.000Z'));  //  midnight _> avoid UTc timezone issues
    
    // mock date and streak
    getStorageItem.mockResolvedValueOnce('1');          // Initial streak  is 1
    getStorageItem.mockResolvedValueOnce('2025-01-11');  // Last login set to this date

    const findByText = await findByTextWrapper()

    const streakText = await findByText('2');
    expect(streakText).toBeTruthy();
    
    expect(setStorageItem).toHaveBeenCalledWith('streak', '2');
    expect(setStorageItem).toHaveBeenCalledWith('lastLogin', '2025-01-12');
  
  }, 5000);

  
  it('should increment the streak by 2 if the user logins for two days consecutively', async () => {


    // Day 1 - streak day  3
    jest.setSystemTime(new Date('2025-01-12T00:00:00.000Z'));  
    
    // mock date and streak
    getStorageItem.mockResolvedValueOnce('2');          
    getStorageItem.mockResolvedValueOnce('2025-01-11');  

    const findByText1 = await findByTextWrapper()

    const streakText1 = await findByText1('3');
    expect(streakText1).toBeTruthy();
    
    expect(setStorageItem).toHaveBeenCalledWith('streak', '3');
    expect(setStorageItem).toHaveBeenCalledWith('lastLogin', '2025-01-12');


    // Day 2 - streak day 4
    jest.setSystemTime(new Date('2025-01-13T00:00:00.000Z'));

    getStorageItem.mockResolvedValueOnce('3');   
    getStorageItem.mockResolvedValueOnce('2025-01-12'); 

    const findByText2 = await findByTextWrapper()

    const streakText2 = await findByText2('4');
    expect(streakText2).toBeTruthy();
    
    expect(setStorageItem).toHaveBeenCalledWith('streak', '4');
    expect(setStorageItem).toHaveBeenCalledWith('lastLogin', '2025-01-13');
  
  }, 5000);



  it('should not change streak if user relogins the same day', async () => {
    // Mocking a skipped day

    jest.setSystemTime(new Date('2025-01-12T00:00:00.000Z')); 

    getStorageItem.mockResolvedValueOnce('3');           // Initial streak is 3
    getStorageItem.mockResolvedValueOnce('2025-01-12');  // Last login was before yesterday

    const findByText = await findByTextWrapper()

    const streakText = findByText('3');
    expect(streakText).toBeTruthy(); 

    // making sure the Storage call was not called , and the flow returned way before that
    expect(setStorageItem).not.toHaveBeenCalledWith('streak', '3');
    expect(setStorageItem).not.toHaveBeenCalledWith('lastLogin', '2025-01-12');

  });


  it('should reset the streak if the user skips a day', async () => {
    // Mocking a skipped day

    jest.setSystemTime(new Date('2025-01-12T00:00:00.000Z')); 

    getStorageItem.mockResolvedValueOnce('3');           // Initial streak is 3
    getStorageItem.mockResolvedValueOnce('2024-03-12');  // Last login was before yesterday

    const findByText = await findByTextWrapper()

    // Streak should reset from 3 --> 1
    const streakText = findByText('1');
    expect(streakText).toBeTruthy(); 

    // making sure setStorageItem was called to reset the streak
    expect(setStorageItem).toHaveBeenCalledWith('streak', '1');

  });
});

  // #region  errors checks

  describe('StreakErrorTester', () => {
    beforeEach(() => {
      jest.clearAllMocks(); 
    });
  it('should handle errors gracefully in loadStreak', async () => {
    // Simulating an error in loading the streak
    getStorageItem.mockRejectedValueOnce(new Error('AsyncStorage error'));

    const findByText = await findByTextWrapper()

    const streakText = await findByText('1'); // default sreak is 1 , even in case of an error
    expect(streakText).toBeTruthy();
  });

  it('should handle errors gracefully in updateStreak', async () => {
    // Simulating an error in loading the streak
    setStorageItem.mockRejectedValueOnce(new Error('AsyncStorage error'));

    const findByText = await findByTextWrapper()

    const streakText = await findByText('0'); // default streak is 0 , in case of an error
    expect(streakText).toBeTruthy();
  });
});

  // #region didUserLoginToday() ?

  it('should correctly check if the user logged in today', async () => {
    //aditional test to test the didUserLoginToday() method
    // this function was written to be paired with the notification system 
    const today = new Date().toJSON().slice(0, 10);

    getStorageItem.mockResolvedValueOnce(today);   //with todays date
    const result = await didUserLoginToday();
    expect(result).toBe(true);  


    getStorageItem.mockResolvedValueOnce('1999-11-31');  // with a random date
    const result2 = await didUserLoginToday();
    expect(result2).toBe(false); 
  });

  
});
