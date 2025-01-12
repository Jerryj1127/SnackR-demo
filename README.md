<p align="center">
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/icons/snackr.png" alt="Icon"  />
  <h1 style="text-align: center;">SnackR Feature Demo</h1>
</p>

****

---

## **Overview**

SnackR demo app to implement the user streak functionality

---

## **Table of Contents**

1. [Overview](#overview)  
2. [Features implemented](#features)  
3. [Assumptions made](#assumptions)  
4. [Approach taken](#approach)  
5. [Local Installation](#installation)  
6. [Screenshots](#screenshots)  
7. [Recordings](#recordings)   

---

## **Features**

- Streak Counter - automatically increases the user's login streak for the day when they opens the app.

- Local Notification system - reminds the user to login to preserve their streak.

- Coin Management - Tracks the users coins and adds a reward when the user hits a targeted streak.

- Basic UI - a minimal UI for simpler user experience.

---

##  **Assumptions**
- The streak is automatically changed when the user opens the for the first time on a day and there is no manual intervention required. x
If the last login day was the previous day, the streak increases by one. In case a user missed a day(s), the streak resets back to 1. 

- The streak is calculated for each calender day and not aganist a 24 hour timeframe. For example if the user logins on 05/12 11:55 PM and re-login after 6 minutes (06/12 12:01 AM), it counts as logins for two consecutive days, that is the streak will be incremented twice.

- The app has a life of less than 24 hours in the system's ram. The app will not live indefeneltly in the system memory and have to relauch once a day

- The starting streak score is 1 and not 0. the streak will be one when the user logins for the first time

- The system time is always correct and no tampering will be made to the system clock.

- A total of 100 coins is rewarded on the 7th day and no further reward is granted even if the user continues the streak.

##  **Approach**
 The App uses `AsyncStorage` to persist data to the disk. This data includes the current `streak score`, `coin count`, `last login date` and the `status of reward`.

It uses context and state management to monitor the state of streak and to pass data between components. 

**Basic workflow for the feature**:

1. Current Streak score is read from the disk, 0 if it doesn't exist.

2.  Current date is collected from the system clock each time a user opens the app. The previous login date is also fetched from the local storage. 

3. If the current date is same as the one read from the disk (previous login), it returns as it's the same day.

4. Difference of the two days are taken, 

     4.1 Difference = 1 --> the user is logging in on the next day. The streak increases by one and both the current streak and recent login date is written to the disk.

     4.2 Difference > 1 --> The user missed a day in between. The streak is reset back to one. Streak and recent login date is written to the disk.

     4.3 Difference < 0 --> Indicates incorrect date configration on the user's system.

     4.4 Difference = 0 --> logging in on the same day. (This is not considered as the dates are checked for uniqueness in step 3)

5. A custom message is displayed on the UI based on the streak score.

6. Checks wether the streak is 7. If yes, reads the status of reward from the disk.

    6.1 If not already rewarded, User is granted 100 coins. Status of the coin and reward are written to the disk. A confetti shower and few other animations are shown on the screen.

## **Installation**

To install this project, follow these steps:

Make sure git, node and npm are installed
Verify those by 
```
node -v 
npm -v 
git --version
```

Installation steps:
```bash
# Clone the repository
git clone https://github.com/Jerryj1127/SnackR-demo.git 

cd SnackR-demo/ 

# Install the Expo CLI globally
npm install -g expo-cli 

# Install the dependencies
npm install

# Run the expo server
npx expo start

```

For testing: 
* Full test coverage
```
npm test
```
* For specific modules
```
npm test <module name>
```
* To supress errors and log messages
```
npm test -- --silent
```
## **Screenshots**

> Notification System:
<p align="center">
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/noficationPermisson.jpg" alt="notification Permission" width="300" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/notification.jpg" alt="Notification" width="300" /><br>
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/notificationBar.jpg" alt="Notification" width="600" />
</p>

---
>Screenshots of UI:
<p align="center">
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day1.jpg" alt="Screenshot 1" width="200" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day2.jpg" alt="Screenshot 2" width="200" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day3.jpg" alt="Screenshot 3" width="200" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day4.jpg" alt="Screenshot 4" width="200" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day5.jpg" alt="Screenshot 5" width="200" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day6.jpg" alt="Screenshot 6" width="200" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day7.jpg" alt="Screenshot 7" width="200" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day8.jpg" alt="Screenshot 8" width="200" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day0.jpg" alt="Screenshot Error" width="200" />
</p>


## **Recordings**

<p align="center">
<video src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/videos/Day7.mp4" controls height="600" >
</video>
</p>

you can view the video on [YouTube](https://youtube.com/shorts/HiwicF9Zkz4?feature=share) in case the video refuses to play on Github.

## **Tests**
A total of 24 test cases were written to cover various scenarios and ensure the app functions correctly across different use cases.

<p align="center">
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/testsMain.png" alt="Screenshot 7" width="400" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/tests1.png" alt="Screenshot 8" width="400" /> <br>
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/tests2.png" alt="Screenshot Error" width="400" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/tests3.png" style="text-align: center; vertical-align: top;" alt="Screenshot Error" width="400" />

</p>

## **Notes**
### **The testing journey**
 The testing journey 
While the coding itself was relatively straightforward, the subsequent inspection and testing phases presented significant challenges.

After researching testing frameworks I decided to go with jest and babel for testing this app. Initially I found it very difficult to set up the testing evniroment from scratch. After hours of reading documentations and tweaking configration files I found a sweet spot for the jest configration that allowed me to run tests locally.  

nitially, I couldn't install `@testing-library/react-native` due to dependency conflicts. Upon closer inspection, I found that npm was attempting to install the latest version of `react-test-renderer`. However, the `react-test-renderer` documentation specifically states that you should use the same version as your React version (`18.3.1` in my case), not the latest version (`19.0.0`)."

At first babel was unable to find the node modules but was fixed by specifying `transformIgnorePatterns` in babel config.

While testing simultaneous day logins, I mocked the global `Date` variable to set a specific date and used a custom date mocked to be retrieved from disk storage

```
const mockDate = new Date(2025, 0, 12); 
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
....
....
// sending the previous day's date while trying to read it from the disk
getStorageItem.mockResolvedValueOnce('2025-01-11');
```

With this approch, I was pretty confident that I could simulate daily login but javascript had other plans for me. The test failed and a particular particular line in the error regarding `act()` message caught my eye something similar to [this stackoverflow question](https://stackoverflow.com/questions/72003409/the-current-testing-environment-is-not-configured-to-support-act-testing]). With further reading, analysis and debugging I figured out that since act() waits for all asynchronous operations to complete before proceeding, the issue might not be act() but something breaking the codeflow while waiting for the calls to finish. After hours of work I found out that the issue is caused by the `jest.spyOn` and the `Date` class. I had this line in my code:

```
const lastLoginDate = new Date(lastLogin); 
```
`lastLogin` date was mocked to `2025-01-11` and with that the `lastLoginDate` should be set to `2025-01-11` in UTC format ... and guess what? I didn't. It turns out mocking the `Date()` with `jest.spyOn` globally caused every instance of Date class to return the date passed initally to the `Date()` irrespective of the paramters specified while calling the constructor (In this case `Date()` returned `2025-01-12T18:30:00.000Z` on every single call)

Fixed that issue by mocking system time using `jest.setSystemTime()`


The next pause to the testing journey was when I encoundered this timeout error
>thrown: "Exceeded timeout of 5000 ms for a test. <br>
>Add a timeout value to this test to increase the timeout, if this is a long-running test. See https://jestjs.io/docs/api#testname-fn-timeout."

I changed the timeout to 10, 20 and 60 seconds to see if the issue persists and yes .. it did!. On further debugging of the code flow, found the error to be on this particular line 

```
if (diffDays===1) setStreak(streak+1);
```

Initially, I believed that using `useState` was delaying the rendering process, leading to timeouts and causing the flow to break. However, resolved this issue by switching from manually updating the state to using React's built-in functional updates.

```
if (diffDays === 1) setStreak(prevStreak => prevStreak + 1); 
```

Even after switching to React's functional updates, I was still encountering timeouts. However, this time the error messages pointed to a problem within the React Native library itself.

> SyntaxError: /Users/jerry/Code/banzan/snackR/node_modules/react-native/Libraries/vendor/emitter/EventEmitter.js: Unexpected token, expected "]" (39:5) <br>

      37 |
      38 | type Registry<TEventToArgsMap: {...}> = {
    > 39 |   [K in keyof TEventToArgsMap]: Set<Registration<TEventToArgsMap[K]>>,
         |      ^
      40 | };
      41 |
      42 | /**

After extensive troubleshooting, I discovered that the timeout issue was caused by a known bug within the `React Native` library (version `0.76.4` and later, including the latest `0.76.6`). This bug was first reported on September 6, 2024.

Additional information can be found on this [React native github issue page](https://github.com/facebook/react-native/issues/46355)

With that I was dead set on somehow running my tests. I dared not to fix the entire react native libray as it would be like throwing darts in the dark, which even the library's developers and active maintainers failed to fix. After trying a few things on my own and scouring the internet for a possible fix, I discovered that the issue stemmed from babel uses its own parser. So a few documentions further I changed babel's default parser to `hermes parser` with the `babel-plugin-syntax-hermes-parser` plugin. Finally, I made some adjustments to my code, particularly how it handles asynchronous operations, and the tests started running successfully and ... voila

>**Test Suites:**  <span style="color:green;">3 passed</span>, 3 total  
**Tests:**        <span style="color:green;">24 passed</span>, 24 total  
**Snapshots:**    0 total  
**Time:**         1.265 s