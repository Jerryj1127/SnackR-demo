import React, { useContext }from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { StreakContext } from '../streakTracker';


export const streakMessages = [
  "Is it Time travel ? Aliens ? \n Who knows 🤷\n\n Better check your system clock ",  // 0-> default error
  "Welcome home adventurer! \n You've started your journey \nDay 1 streak unlocked! 🌟",
  "You're on a roll! \n Keep it up—Day 2 streak achieved! 🔥",
  "Three days strong! \nYour dedication is paying off \nDay 3 streak in the bag! 🎉",
  "Day 4 and you're unstoppable! \n The rewards are just getting better! 🚀",
  "Five days straight! \nYou're a streak master \n Day 5 unlocked! 🏆",
  "Six days of awesomeness!\n Your streak is legendary \nDay 6 achieved! 💪",
  "One whole week! You've reached a milestone Day 7 streak complete! 🌈✨  \n\n You are rewarded 100 coins",
  "Good work soldier! \n Continue the streak for more exiciting rewards 🙌"
]


const StreakDisplay = () => {
  const { streak } = useContext(StreakContext);
  let temp;
  // edge cases
  if (0 <= streak && streak <= 8){
    temp = streak;  
  } else if (streak > 8) { 
    temp = 8;
  } else {
    temp = 0 }

  return (
    <View style={styles.streakContainer}>
      <Text style={styles.streakText}>{streakMessages[temp]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  streakContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  streakText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 32,
  },
});

export default StreakDisplay;