import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';


type WaitingProps = {
  isLoading: boolean;
};

export default function Waiting({ isLoading }: WaitingProps) {
  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@img/waitup.gif')} // precisa converter o gif para lottie
        autoPlay
        loop
        style={{ width: 120, height: 120 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  image: {
    width: 100,
    height: 100,
  },
});
