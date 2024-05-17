import React, { useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import IconLoading from '../../assets/svg/loading.svg';

const LoadingIcon = () => {
  const spinAnim = new Animated.Value(0);
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <IconLoading width={60} height={60} />
    </Animated.View>
  );
};

export default LoadingIcon;
