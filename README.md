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

1. Current Streak score is read from the disk, 1 if it doesn't exist.

2.  Login Date is collected from the system clock each time a user opens the app. The previous login date is also fetched fro the local storage. 

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

# Merge remote changes into your local 'main' branch
cd SnackR-demo/ 

# Install the Expo CLI globally
npm install -g expo-cli 

# Install the dependencies
npm install

# Run the expo server
npx expo start

```
## **Screenshots**

> Notification System:
<p align="center">
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/noficationPermisson.jpg" alt="notification Permission" width="300" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/notification.jpg" alt="Notification" width="300" />
</p>

---
>Screenshots of UI:
<p align="center">
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day1.jpg" alt="Screenshot 1" width="300" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day2.jpg" alt="Screenshot 2" width="300" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day3.jpg" alt="Screenshot 3" width="300" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day4.jpg" alt="Screenshot 4" width="300" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day5.jpg" alt="Screenshot 5" width="300" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day6.jpg" alt="Screenshot 6" width="300" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day7.jpg" alt="Screenshot 7" width="300" />
  <img src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/images/Day8.jpg" alt="Screenshot 8" width="300" />
</p>


## **recordings**

<p align="center">
<video src="https://raw.githubusercontent.com/Jerryj1127/SnackR-demo/main/docs/videos/Day7.mp4" controls height="600" align="center">
</video>
</p>