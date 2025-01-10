import React, { useRef, useState } from 'react';
import { View, Text, Image, Animated, TouchableOpacity, StyleSheet } from 'react-native';

const UserOverview = () => {
  const [showGif, setShowGif] = useState(false);
  const imageScale = useRef(new Animated.Value(1)).current;

  const handleImagePress = () => {
    // setShowGif(true);
    setShowGif(!showGif);

    Animated.sequence([
      Animated.timing(imageScale, { toValue: 1.2, duration: 150, useNativeDriver: true }),
      Animated.timing(imageScale, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(imageScale, { toValue: 1, duration: 150, useNativeDriver: true }),
      // Animated.timing(imageScale, { toValue: 1.5, duration: 150, useNativeDriver: true }),
    ]).start();

    
    // DISABLING AUTO CHANGE, requires manual touch to change back 
    // setTimeout(() => {
    //   setShowGif(false); //to be adjusted manually based on the gifs length
    // }, 3000); 
  };

  return (
    <TouchableOpacity onPress={handleImagePress}>
      <View style={styles.userContainer}>
        <View style={styles.userIconContainer}>
          <Animated.Image 
            // disabling gif preview for now as it requires additional libs and make the project more big
            source={showGif ? require('../assets/user_icon_gif.gif') : require('../assets/user_icon70.png')} 
            style={[styles.userIcon, { borderRadius: 50, transform: [{ scale: imageScale }] }]} 
          />
        </View>
        <Text style={styles.userText}>Dragon-Warrior</Text>
      </View>
    </TouchableOpacity>
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