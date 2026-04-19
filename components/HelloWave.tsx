import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';

export function HelloWave() {
  const rotationAnimation = useSharedValue(0);

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 180 }), // Slightly slower for a more premium feel
        withTiming(0, { duration: 180 })
      ),
      4 // Run the animation 4 times
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: 4 }, // Slight adjustment for optical centering
      { rotate: `${rotationAnimation.value}deg` },
      { translateY: -4 }
    ],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={styles.text}>👋</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32, // Increased for better visibility in headers
    lineHeight: 36,
    marginTop: -4,
    // Add a slight shadow to make it pop off the themed background
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
