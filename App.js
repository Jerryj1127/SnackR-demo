import React, { useEffect, useState, useRef, useContext } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, Animated, TouchableOpacity } from 'react-native';
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

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

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

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScaleAnim, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(buttonScaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => {
    const updateCoins = async () => {
      const wasRewarded = await getStorageItem("reward") || false;
      
      if (!wasRewarded) {
        await incrementCoinCount(100);
        const updatedCoins = await getCoinCount();
        setCoins(updatedCoins);
        await setStorageItem("reward", true);
      }
    };

    if (streak === 7) {
      setShowConfetti(true);
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.5, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 0.8, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1.2, duration: 150, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
      
      updateCoins();
    }

    
  }, [streak]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <UserOverview /> 
        <Coins coins={coins} /> 
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