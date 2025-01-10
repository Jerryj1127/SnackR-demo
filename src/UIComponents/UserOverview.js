import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserOverview = () => {
  return (
    <View style={styles.userContainer}>
      <View style={styles.userIconContainer}>
        <Image 
          source={require('../assets/user_icon70.png')} 
          style={[styles.userIcon, { borderRadius: 50 }]}
        />
      </View>
      <Text style={styles.userText}>Dragon-Warrior</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    alignItems: 'center',
    top: 40,
    height: 100,
  },
  userIconContainer: {
    alignItems: 'left',
    marginBottom: 2,
    borderRadius: 100,
    borderWidth: 1,
  },
  userIcon: {
    width: 70,
    height: 70,
  },
  userText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default UserOverview;