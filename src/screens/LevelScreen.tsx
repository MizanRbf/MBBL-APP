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
import { map } from 'rxjs/operators'; // react-native-sensors এর সাথে এটি অটো ইনস্টল হয়

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.75;

export default function LevelScreen() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    // সেন্সরের আপডেট স্পিড সেট করা (১৬ মিলিসেকেন্ড = ৬০ FPS)
    setUpdateIntervalForType(SensorTypes.accelerometer, 16);

    const subscription = accelerometer
      .pipe(
        map(({ x, y }) => {
          // Accelerometer এর X এবং Y অ্যাক্সিস থেকে কোণ (Angle) বের করার গাণিতিক সূত্র
          let rad = Math.atan2(x, y);
          let deg = rad * (180 / Math.PI);

          // স্ক্রিনের রোটেশন অনুযায়ী অ্যাঙ্গেল অ্যাডজাস্ট করা
          return Math.round(deg);
        }),
      )
      .subscribe(
        calculatedAngle => {
          // কোণটিকে সঠিক ডিরেকশনে রাখার জন্য মাইনাস বা প্লাস অ্যাডজাস্টমেন্ট
          setAngle(calculatedAngle);
        },
        error => {
          console.log('Sensor not available: ', error);
        },
      );

    // স্ক্রিন আনমাউন্ট হলে সেন্সর সাবস্ক্রিপশন বন্ধ করা
    return () => subscription.unsubscribe();
  }, []);

  // অ্যানিমেশন কাপুনি দূর করে মসৃণ (Smooth) করার জন্য Reanimated
  const rotation = useDerivedValue(() => {
    // এখানে angle এর মান অনুযায়ী মিটারটি ঘুরবে
    return withSpring(angle, { damping: 20, stiffness: 90 });
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* মূল লেভেল মিটার বৃত্ত */}
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.rotatingCircle, animatedStyle]}>
          {/* ওপরের সাদা অংশ */}
          <View style={styles.topHalf} />
          {/* নিচের কালো অংশ */}
          <View style={styles.bottomHalf} />
        </Animated.View>

        {/* মাঝখানের স্থির ডটেড লাইন */}
        <View style={styles.dottedLine} />

        {/* মাঝখানের কোণ বা ডিগ্রির টেক্সট */}
        <Text style={styles.angleText}>{Math.abs(angle)}°</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // কুচকুচে কালো ব্যাকগ্রাউন্ড
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden', // যাতে ভেতরের সাদা-কালো শেপ বৃত্তের বাইরে না যায়
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  rotatingCircle: {
    width: CIRCLE_SIZE * 2, // ডাবল সাইজ রাখা হয়েছে যাতে ঘোরার সময় কোণা ফেটে না যায়
    height: CIRCLE_SIZE * 2,
    position: 'absolute',
  },
  topHalf: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: '#000000',
  },
  dottedLine: {
    position: 'absolute',
    width: '100%',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    opacity: 0.4,
  },
  angleText: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 54,
    fontWeight: '300',
    // টেক্সট যেন সাদা অংশে গেলে কালো আর কালো অংশে গেলে সাদা দেখায় তার ট্রিক
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
