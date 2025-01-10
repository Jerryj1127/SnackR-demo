import React, { useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const Coins = ({ coins, scaleAnim }) => { 

  return (
    <Animated.View style={[styles.coinContainer, { transform: [{ scale: scaleAnim }] }]}> 
      <Text style={styles.coinText}>💰 {coins}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  coinContainer: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#ffeb3b',
    padding: 10,
    borderRadius: 20,
  },
  coinText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Coins;