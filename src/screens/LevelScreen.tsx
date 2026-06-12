import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, Dimensions } from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { map } from 'rxjs/operators';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.75;

export default function LevelScreen() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 16);

    const subscription = accelerometer
      .pipe(
        map(({ x, y }) => {
          let rad = Math.atan2(x, y);
          let deg = rad * (180 / Math.PI);
          return Math.round(deg);
        }),
      )
      .subscribe(calculatedAngle => {
        setAngle(calculatedAngle);
      });

    return () => subscription.unsubscribe();
  }, []);

  const rotation = useDerivedValue(() => {
    return withSpring(angle, { damping: 20, stiffness: 90 });
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const getStatus = () => {
    if (angle > 2) return 'Tilt Right';
    if (angle < -2) return 'Tilt Left';
    return 'Perfect Level';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* 🔥 HEADER */}
      <Text style={styles.header}>Level Meter</Text>

      {/* CIRCLE */}
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.rotatingCircle, animatedStyle]}>
          <View style={styles.topHalf} />
          <View style={styles.bottomHalf} />
        </Animated.View>

        <View style={styles.dottedLine} />

        {/* CENTER ANGLE */}
        <Text style={styles.angleText}>{Math.abs(angle)}°</Text>
      </View>

      {/* 🔽 2 LINES BELOW CIRCLE */}
      <Text style={styles.levelText}>{getStatus()}</Text>

      <Text style={styles.subText}>
        Keep your phone steady for accurate measurement
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  header: {
    position: 'absolute',
    top: 80,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },

  circleContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  rotatingCircle: {
    width: CIRCLE_SIZE * 2,
    height: CIRCLE_SIZE * 2,
    position: 'absolute',
  },

  topHalf: {
    flex: 1,
    backgroundColor: '#fff',
  },

  bottomHalf: {
    flex: 1,
    backgroundColor: '#000',
  },

  dottedLine: {
    position: 'absolute',
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#fff',
    opacity: 0.3,
  },

  angleText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 54,
    fontWeight: '300',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  levelText: {
    marginTop: 25,
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },

  subText: {
    marginTop: 8,
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
});
