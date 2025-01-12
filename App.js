import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Animated } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { StreakContext , StreakProvider} from './src/streakTracker';
import { getCoinCount, incrementCoinCount } from './src/CoinTracker';
import NotificationService from './src/notificationManager';
import { getStorageItem, setStorageItem } from './src/storageManager';
import Coins from './src/UIComponents/Coins';
import PlayButton from './src/UIComponents/PlayButton';
import StreakDisplay from './src/UIComponents/Streak';
import UserOverview from './src/UIComponents/UserOverview';

const App = () => {
  const { streak } = useContext(StreakContext);
  const [coins, setCoins] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const coinScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    NotificationService.initialize().then(() => {
      NotificationService.scheduleDailyNotification();
    });
    
    const fetchCoins = async () => {
      try {
        const coinCount = await getCoinCount();
        setCoins(coinCount);
      } catch (error) {
        console.error("Error fetching coin count:", error);
      }
    };

    fetchCoins();
  }, []);

  useEffect(() => {
    const updateCoins = async () => {
      //ensuring coins are rewarded only once on the 7th day
      const wasRewarded = await getStorageItem("reward") || false;
      
      if (!wasRewarded) {
        // Animation for Coin containcer
        
        Animated.sequence([
          Animated.timing(coinScaleAnim, { toValue: 1.4, duration: 70, useNativeDriver: true }),
          Animated.timing(coinScaleAnim, { toValue: 1.2, duration: 800, useNativeDriver: true }),
          Animated.timing(coinScaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
          Animated.timing(coinScaleAnim, { toValue: 1.2, duration: 100, useNativeDriver: true }),
          Animated.timing(coinScaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();      
        await incrementCoinCount(100);

        const updatedCoins = await getCoinCount();
        setCoins(updatedCoins);
        await setStorageItem("reward", true);
      } };

    const updateRewardCounter = async () => {
      const wasRewarded = await getStorageItem("reward") || false;
      if (wasRewarded) {
        await setStorageItem("reward", false)
      } 
    }


    if (streak === 7) {
      console.log("streak is 7")
      setShowConfetti(true);
      setTimeout(()=>{
      updateCoins();
      },2000);
    }                   // not 1 because its the initial value --> causing a render
    else if (streak>1){ // it doesnt matter when the streak gets reset as long as its  1<streak<7<streak
      console.log("streak is not 7", streak)    
      updateRewardCounter()
    }

    
  }, [streak]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <UserOverview /> 
        <Coins coins={coins} scaleAnim={coinScaleAnim} /> 
      </View>

      <StreakDisplay /> 

      <View style={styles.bottomContainer}>
        <PlayButton onPress={() => { 
        }} />
      </View>


      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: 0, y: 0 }}
          fadeOut
          onAnimationEnd={() => setShowConfetti(false)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  bottomContainer: {
    paddingBottom: 60,
    alignItems: 'center',
  }});

export default () => (
  <StreakProvider>
    <App />
  </StreakProvider>
);